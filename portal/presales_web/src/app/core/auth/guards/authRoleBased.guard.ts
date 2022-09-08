import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthRoleBasedGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService,
        private _userService: UserService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // console.log('canActivate', state);
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, state);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        // console.log('canActivateChild', state);
        return this._check(redirectUrl, state);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        // console.log('canLoad', route, segments);
        return this._check('/');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string, state: RouterStateSnapshot = null): Observable<boolean> {

        // Check the authentication status
        return this._userService.getLocalInfo()
            .pipe(
                switchMap((user) => {
                    // console.log(user);

                    // If the user is not authenticated...
                    if (!user) {
                        // Redirect to the sign-in page
                        this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                        // Prevent the access
                        return of(false);
                    }

                    //state.url || user.menu_permissions.length
                    if (state.url && user.menu_permissions.length) {
                        // @ TODO
                        // console.log(state);

                        const canAccess = user.menu_permissions.some(f => state.url.startsWith(`/${f}`));
                        if (canAccess) {
                            return of(true);
                        } else {
                            this._router.navigate(['error401']);
                            return of(false);
                        }
                    }
                    else {
                        // @ when accessing unauthorized page
                        this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                        return of(false);
                    }

                    // Allow the access
                    return of(true);
                })
            );
    }
}
