import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService, OAuthStorage, OAuthEvent } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { environment } from '../../../environments/environment';
import { User } from '../interface/user.model';
import * as fromRoot from '../../store/reducers';
import { LoadCurrentTenant } from '../../store/actions/tenant.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {

    idleState = '';
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
    public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

    public tenantId$ = new BehaviorSubject<string>(null);
    public user$ = new BehaviorSubject<User>(null);


    /**
     * Publishes `true` if and only if (a) all the asynchronous initial
     * login calls have completed or errorred, and (b) the user ended up
     * being authenticated.
     *
     * In essence, it combines:
     *
     * - the latest known state of whether the user is authorized
     * - whether the ajax calls for initial log in have all been done
     */
    public canActivateProtectedRoutes$: Observable<boolean> = combineLatest(
        this.isAuthenticated$,
        this.isDoneLoading$
    ).pipe(map(values => values.every(b => b)));

    private navigateToLoginPage(): void {
        // TODO: Remember current URL
        this.router.navigateByUrl('/login');
    }

    constructor(
        private oauthService: OAuthService,
        private oauthStorage: OAuthStorage,
        private router: Router,
        private idle: Idle,
        private keepalive: Keepalive,
        private _store: Store<fromRoot.AppState>,
    ) {
        this.firstTenantIdBroadcast();
        this.firstUserProfileBroadcast();

        // Useful for debugging:
        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                console.error(event);
            } else {
                // console.warn(event);+
            }
        });

        // This is tricky, as it might cause race conditions (where access_token is set in another
        // tab before everything is said and done there.
        // TODO: Improve this setup.
        window.addEventListener('storage', (event) => {

            // The `key` is `null` if the event was caused by `.clear()`
            if (event.key !== 'access_token' && event.key !== null) {
                return;
            }

            console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
            if (!this.oauthService.hasValidAccessToken()) {
                this.navigateToLoginPage();
            }
        });

        this.oauthService.events
            .subscribe(event => {
                this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
                if (event.type == "user_profile_loaded") {
                    this.broadcastUserProfile();
                    const tenantId = this.identityClaims["tenantId"];
                    this.tenantId$.next(tenantId)
                    // this._store.dispatch(new LoadCurrentTenant());
                }
            });

        this.oauthService.events
            .pipe(filter(e => ['token_received'].includes(e.type)))
            .subscribe(e => {
                this.oauthService.loadUserProfile()
            });

        this.oauthService.events
            .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
            .subscribe(e => {
                console.warn('Your session has been terminated!');
                this.navigateToLoginPage();
            });

        this.oauthService.setupAutomaticSilentRefresh();
        // this.oauthService.setStorage(localStorage);
    }

    // -------------------------------------------------
    public runInitialLoginSequence(): Promise<void> {
        if (location.hash) {
            console.log('Encountered hash fragment, plotting as table...');
            console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
        }

        // 0. LOAD CONFIG:
        // First we have to check to see how the IdServer is
        // currently configured:
        return this.oauthService.loadDiscoveryDocument()

            // For demo purposes, we pretend the previous call was very slow
            // .then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))

            // 1. HASH LOGIN:
            // Try to log in via hash fragment after redirect back
            // from IdServer from initImplicitFlow:
            .then(() => this.oauthService.tryLogin())

            .then(() => {
                if (this.oauthService.hasValidAccessToken()) {
                    return Promise.resolve();
                }

                // 2. SILENT LOGIN:
                // Try to log in via silent refresh because the IdServer
                // might have a cookie to remember the user, so we can
                // prevent doing a redirect:
                return this.oauthService.silentRefresh()
                    .then(() => Promise.resolve())
                    .catch(result => {

                        // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
                        // Only the ones where it's reasonably sure that sending the
                        // user to the IdServer will help.
                        const errorResponsesRequiringUserInteraction = [
                            'interaction_required',
                            'login_required',
                            'account_selection_required',
                            'consent_required',
                        ];

                        if (result
                            && result.reason
                            && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

                            // 3. ASK FOR LOGIN:
                            // At this point we know for sure that we have to ask the
                            // user to log in, so we redirect them to the IdServer to
                            // enter credentials.
                            //
                            // Enable this to ALWAYS force a user to login.
                            // this.oauthService.initImplicitFlow();
                            //
                            // Instead, we'll now do this:
                            console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                            return Promise.resolve();
                        }

                        // We can't handle the truth, just pass on the problem to the
                        // next handler.
                        return Promise.reject(result);
                    });
            })

            .then(() => {
                this.isDoneLoadingSubject$.next(true);

                // Check for the strings 'undefined' and 'null' just to be sure. Our current
                // login(...) should never have this, but in case someone ever calls
                // initImplicitFlow(undefined | null) this could happen.
                if (this.oauthService.state &&
                    this.oauthService.state !== 'undefined' &&
                    this.oauthService.state !== 'null') {
                    console.log('There was state, so we are sending you to: ' + this.oauthService.state);
                    this.router.navigateByUrl(this.oauthService.state);
                }
            })
            .catch(() => this.isDoneLoadingSubject$.next(true));

    }
    // -------------------------------------------------

    public login(targetUrl?: string): void {
        this.oauthService.initImplicitFlow(encodeURIComponent(targetUrl || this.router.url));
    }

    public logout(redirectToLogoutUrl: boolean = false): void {
        this.oauthService.logOut(redirectToLogoutUrl);
    }
    public refresh(): void {
        this.oauthService.silentRefresh();
    }
    public hasValidToken(): boolean {
        return this.oauthService.hasValidAccessToken();
    }
    public refreshToken(): Promise<OAuthEvent> {
        return this.oauthService.silentRefresh();
    }
    public getAccessTokenExpiration(): number {
        return this.oauthService.getAccessTokenExpiration();
    }
    public getIdTokenExpiration(): number {
        return this.oauthService.getIdTokenExpiration();
    }
    public getaccessToken(): string {
        return this.oauthService.getAccessToken();
    }

    /**
     *  Checks if there is access_token and id_token in storage
     * @memberOf AuthService
     */
    public isStatelessSession(): boolean {
        if (this.oauthStorage.getItem('access_token') &&
            this.oauthStorage.getItem('id_token') &&
            this.oauthStorage.getItem('expires_at')) {
            return true;
        }

        return false;
    }

    // These normally won't be exposed from a service like this, but
    // for debugging it makes sense.
    public loadDiscoveryDocument() { this.oauthService.loadDiscoveryDocument(); }
    public get accessToken(): string { return this.oauthService.getAccessToken(); }
    public get identityClaims(): object { return this.oauthService.getIdentityClaims(); }
    public get idToken(): string { return this.oauthService.getIdToken(); }
    public get logoutUrl(): string { return this.oauthService.logoutUrl; }

    validateConnection(): void {
        this.oauthService.silentRefresh()
            .then((result) => {
                if (!result) {
                    this.finalizeSession();
                }
                console.log('refresh ok', result);
            })
            .catch((err) => {
                console.error('refresh error', err);
                this.finalizeSession();
            });
    }

    private finalizeSession(): void {
        this.oauthService.logOut();
        window.location.href = window.location.href;
    }

    private firstTenantIdBroadcast() {
        const tenantId = this.identityClaims && this.identityClaims["tenantId"] ? this.identityClaims["tenantId"] : null;
        this.tenantId$.next(tenantId)
    }

    private firstUserProfileBroadcast() {
        if (!this.identityClaims || !this.identityClaims["tenantId"])
            return;

        this.broadcastUserProfile();
    }

    private broadcastUserProfile() {

        let user: User = {
            email: this.identityClaims["email"] || null,
            tenantId: this.identityClaims["tenantId"] || null,
            firstName: this.identityClaims["firstname"] || null,
            lastName: this.identityClaims["lastname"] || null,
            roles: this.identityClaims["roles"] || null,
        };

        this.user$.next(user)
    }

    private setIdleTimeout(): void {
        this.idleState = environment.timeout.init_idle_state;

        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(environment.timeout.idle_timeout);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(environment.timeout.idle_timeout_countdown);
        // sets the default intsderrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = environment.timeout.reset_idle_state;
        });

        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.logout(true);
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!';
            this.idleState = environment.timeout.reset_idle_state;
        });

        this.idle.onTimeoutWarning.subscribe(
            (countdown) =>
                this.idleState = 'You will time out in ' + countdown + ' seconds!');

        // sets the ping interval to 15 seconds
        this.keepalive.interval(environment.timeout.keepalive_interval);

        this.keepalive.onPing.subscribe(() => {
            // this.lastPing = new Date();
            this.validateConnection();
        });

        this.idle.watch();
        this.idleState = environment.timeout.reset_idle_state;
    }

}
