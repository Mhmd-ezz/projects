import { SubscriptionsService } from './blocks/services/subscriptions.service';
import { TenantsService } from './blocks/services/tenants.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
// import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MappingProfileService } from './blocks/mapping/mapping-profile.service';
import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { SyncOfflineMutation } from './blocks/graphql/SyncOfflineMutation';
import { CookieService } from 'ngx-cookie-service';

import { Store } from '@ngrx/store';
import { StartOnlineOfflineCheck } from './store/actions/network.action';
import * as fromRoot from './store/reducers';
import { LoadClaims } from './store/actions/claims.action';

import capitalize from 'lodash/capitalize';
import LogRocket from 'logrocket';
import { AuthService } from './blocks/auth/auth.service';
import { environment } from 'environments/environment';

// @ load custom prototype
require('./blocks/utils/prototpe');

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Creates an instance of AppComponent.
     * @param {*} document 
     * @param {FuseConfigService} _fuseConfigService 
     * @param {FuseNavigationService} _fuseNavigationService 
     * @param {FuseSidebarService} _fuseSidebarService 
     * @param {FuseSplashScreenService} _fuseSplashScreenService 
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService 
    //  * @param {TranslateService} _translateService 
     * @param {Platform} _platform 
     * @param {Title} _titleService 
     * @param {BreadcrumbService} _breadcrumbService 
     * @param {MappingProfileService} _mappingProfileService 
     * 
     * @memberOf AppComponent
     */
    constructor(

        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        // private _translateService: TranslateService,
        private _platform: Platform,
        private _titleService: Title,
        private _breadcrumbService: BreadcrumbService,
        private _mappingProfileService: MappingProfileService,
        private SyncOfflineMutation: SyncOfflineMutation,
        private _cookieService: CookieService,
        private _store: Store<fromRoot.AppState>,
        private _tenantsService: TenantsService,
        private _authService: AuthService,
        private _subscriptionsService: SubscriptionsService
    ) {

        // @ move this to app module resolver
        _subscriptionsService.init()

        setTimeout(() => {
            // @ Get tenant data and save the metadata in localstorage
            // this.resolveTenantData();
        }, 0);

        // LogRocket.init('wsygro/medcilia');

        // // This is an example script - don't forget to change it!
        // LogRocket.identify('Hasan1', {
        //     name: 'Hasan1 rifaii',
        //     email: 'hasan1@example.com',


        //     // Add your own custom user variables here, ie:
        //     subscriptionType: 'pro'
        // });


        _store.dispatch(new StartOnlineOfflineCheck());
        _store.dispatch(new LoadClaims());

        // @ Create maps (Automapper)
        _mappingProfileService.init();

        // @ if there are any queued mutations needs sync in storage  
        // SyncOfflineMutation.init();
        // SyncOfflineMutation.sync();

        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        // this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        // this._translateService.setDefaultLang('en');

        // Set the navigation translations
        // this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        // this._translateService.use('en');


        /**
         * ------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ------------------------------------------------------------------
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ------------------------------------------------------------------
         * ngxTranslate Fix End
         * ------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (environment.production) {
            // @ temporarly use timeout, we need to init logrocket when user details is loaded 
            setTimeout(() => {
                this.setLogRocket()
            }, 5000);
        }

        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });


        this._breadcrumbService.breadcrumbChanged.subscribe((crumbs: any[]) => {
            console.log(crumbs)
            if (crumbs.length && crumbs[1]?.displayName == "patient") {
                // ...
            } else {
                this._titleService.setTitle(this.createTitle(crumbs));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    shortcutsInit() {
        const defaultShortcuts = [
            {
                'title': 'New Patient',
                'type': 'item',
                'icon': 'person_add',
                'url': '/patients/new-patient'
            }
        ];

        // @ if shortcuts exists in cookies and empty
        if (this._cookieService.check('FUSE2.shortcuts')) {

            const shortcuts: any[] = JSON.parse(this._cookieService.get('FUSE2.shortcuts'));
            if (!shortcuts.length) {

                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(defaultShortcuts));
            }

        } else { // @ shortcuts dosen't exist in cookies
            this._cookieService.set('FUSE2.shortcuts', JSON.stringify(defaultShortcuts));
        }
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    private createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Medcilia';
        const titles = routesCollection.filter((route) => route.displayName);

        if (!titles.length) { return title; }

        const routeTitle = capitalize(this.titlesToString(titles));

        return `${routeTitle} ${title}`;
    }

    private titlesToString(titles) {
        return titles.reduce((prev, curr) => {
            return `${curr.displayName} - ${prev}`;
        }, '');
    }

    private setLogRocket() {

        this._authService.user$
            .subscribe(user => {

                LogRocket.init('wsygro/medcilia');

                // This is an example script - don't forget to change it!
                LogRocket.identify(user.email, {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,

                    // Add your own custom user variables here, ie:
                    subscriptionType: 'pro'
                });
            });
    }
}
