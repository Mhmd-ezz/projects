import { TenantsService } from './../../../blocks/services/tenants.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthService } from 'app/blocks/auth/auth.service';
import * as fromRoot from '../../../store/reducers';
import { Tenant } from 'app/blocks/common/tenant.model';
import { AppointmentDialogService } from 'app/blocks/components/appointment-dialog/appointment-dialog.service';
import { AppointmentBase } from 'app/blocks/graphql/generated/bases';
import { EventActionModel } from 'app/blocks/interface/event-action-model';
import * as localforage from 'localforage';
import { Store as idb_store, clear } from 'idb-keyval';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    userName: string;
    tenantName: string;
    isOnline$: Observable<boolean>;
    currentTenant$: Observable<Tenant>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        // private _translateService: TranslateService,
        private _appointmentDialogService: AppointmentDialogService,
        private _authService: AuthService,
        private _store: Store<fromRoot.AppState>,
        private _snackBar: MatSnackBar,
        private _tenantsService: TenantsService,

    ) {

        this.isOnline$ = _store.select(fromRoot.getIsOnline);
        this.currentTenant$ = _store.select(fromRoot.getCurrentTenant);

        this.currentTenant$.pipe(
            filter(tenant => tenant != null)
        )
            .subscribe(tenant => {
                this.tenantName = tenant.name;
            });
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

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
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        // this.selectedLanguage = find(this.languages, { 'id': this._translateService.currentLang });
        this._authService.isAuthenticated$
            .pipe(
                filter(_ => !!this._authService.identityClaims['firstname']),
                distinctUntilChanged(),
            )
            .subscribe(x => {
                const claims = this._authService.identityClaims;
                this.userName = this._authService.identityClaims ? `${claims['firstname']} ${claims['lastname']}` : '';
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

    newAppointment() {
        const AppointmentDialogRef = this._appointmentDialogService.openDialog({} as AppointmentBase);

        AppointmentDialogRef
            .afterClosed()
            .subscribe((result: EventActionModel) => {
                if (result && typeof result !== 'undefined') {
                }
            });
    }
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        // console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        // this.selectedLanguage = lang;

        // Use the selected language for translations
        // this._translateService.use(lang.id);
    }

    logout(): void {
        // this.cleanLocalData();
        // @ Only clear the stored tenant details locally 
       // debugger;
        this._tenantsService.clearTenantLocally();
        this._authService.logout();
    }

    private cleanLocalData() {

        // @ Clear persisted Graphql data
        window.GraphQlCachePersistor.purge();

        // @ Clear settings and other data
        localforage.dropInstance({
            name: LocalDbInstances.MedciliaData,
        });

        // @ Clear media
        const medciliaMediaStore = new idb_store(LocalDbInstances.MedciliaMedia, 'filesQueue');
        clear(medciliaMediaStore);
    }
}
