import { Component, OnDestroy } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';


@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;


    /**
     * Creates an instance of SettingsComponent.
     * @param {FuseSidebarService} _fuseSidebarService 
     * 
     * @memberOf SettingsComponent
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) {
         // Set the private defaults
         this._unsubscribeAll = new Subject();
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
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
