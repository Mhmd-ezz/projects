import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


@Component({
    selector: 'settings-sidebar',
    templateUrl: './settings-sidebar.component.html',
    styleUrls: ['./settings-sidebar.component.scss']
})
export class SettingsSidebarComponent {
    /**
     * Constructor
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,

    ) {

    }

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
