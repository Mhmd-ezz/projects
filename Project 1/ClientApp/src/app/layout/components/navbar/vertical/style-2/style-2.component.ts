import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { delay, filter, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Store } from '@ngrx/store';

import { AuthService } from 'app/blocks/auth/auth.service';
import * as fromRoot from '../../../../../store/reducers';
import { Tenant } from 'app/blocks/common/tenant.model';
@Component({
    selector: 'navbar-vertical-style-2',
    templateUrl: './style-2.component.html',
    styleUrls: ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;
    tenantName: string;
    currentTenant$: Observable<Tenant>;
    foldedChanged: EventEmitter<boolean> ;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private _authService: AuthService,
        private _store: Store<fromRoot.AppState>
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.currentTenant$ = _store.select(fromRoot.getCurrentTenant);
        this.currentTenant$.pipe(
            filter(tenant => tenant != null)
        )
            .subscribe(tenant => {
                this.tenantName = tenant.name;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, { static: false })
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                    if (activeNavItem) {
                        const activeItemOffsetTop = activeNavItem.offsetTop,
                            activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                            scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                        this._fusePerfectScrollbar.scrollToTop(scrollDistance);
                    }
                });
            }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._fuseSidebarService.getSidebar('navbar')) {
                    this._fuseSidebarService.getSidebar('navbar').close();
                }
            }
            );

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });

         this.foldedChanged = this._fuseSidebarService.getSidebar('navbar').foldedChanged;
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

    sidebarOpen() {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
