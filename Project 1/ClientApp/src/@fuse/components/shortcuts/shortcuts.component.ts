import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Tenant } from 'app/blocks/common/tenant.model';
import { TenantsService } from 'app/blocks/services/tenants.service';

import * as fromSelectors from '@appStore/selectors';
import { AppState } from '@appStore/reducers';
import { Store } from '@ngrx/store';

@Component({
    selector: 'fuse-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss']
})
export class FuseShortcutsComponent implements OnInit, AfterViewInit, OnDestroy {
    shortcutItems: any[];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching: boolean;
    mobileShortcutsPanelActive: boolean;
    public tenant: Tenant;
    url: string;
    @Input()
    navigation: any;

    @ViewChild('searchInput', { static: false })
    searchInputField;

    @ViewChild('shortcuts', { static: false })
    shortcutsEl: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(
        private _cookieService: CookieService,
        private _fuseMatchMediaService: FuseMatchMediaService,
        private _fuseNavigationService: FuseNavigationService,
        private _mediaObserver: MediaObserver,
        private _renderer: Renderer2,
        private _tenantsService: TenantsService,
        private _store: Store<AppState>,
    ) {
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;

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

        this._store.select(fromSelectors.getTenant)
        // this._tenantsService.currentTenant$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (tenant) => {
                
                if(tenant == null) return;

                this.tenant = Object.assign({}, tenant)
                if (this.tenant.speciality.key == 'general')
                    this.url = '/patients/new-patient'
                else
                    if (this.tenant.speciality.key == 'cardiology')
                        this.url = '/patients/new-patient-cardiology'

                // Get the navigation items and flatten them
                this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);

                if (this._cookieService.check('FUSE2.shortcuts')) {
                    this.shortcutItems = JSON.parse(this._cookieService.get('FUSE2.shortcuts'));
                }
                else {
                    // User's shortcut items
                    this.shortcutItems = [
                        {
                            'title': 'New Patient',
                            'type': 'item',
                            'icon': 'person_add',
                            'url': this.url
                        }
                    ];
                }
            },
        )

      
    }

    ngAfterViewInit(): void {
        // Subscribe to media changes
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if (this._mediaObserver.isActive('gt-sm')) {
                    this.hideMobileShortcutsPanel();
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

    /**
     * Search
     *
     * @param event
     */
    search(event): void {
        const value = event.target.value.toLowerCase();

        if (value === '') {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    toggleShortcut(event, itemToToggle): void {
        event.stopPropagation();

        for (let i = 0; i < this.shortcutItems.length; i++) {
            if (this.shortcutItems[i].url === itemToToggle.url) {
                this.shortcutItems.splice(i, 1);

                // Save to the cookies
                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));

                return;
            }
        }

        this.shortcutItems.push(itemToToggle);

        // Save to the cookies
        this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
    }

    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    isInShortcuts(navigationItem): any {
        return this.shortcutItems.find(item => {
            return item.url === navigationItem.url;
        });
    }

    /**
     * On menu open
     */
    onMenuOpen(): void {
        setTimeout(() => {
            this.searchInputField.nativeElement.focus();
        });
    }

    /**
     * Show mobile shortcuts
     */
    showMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    /**
     * Hide mobile shortcuts
     */
    hideMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
}
