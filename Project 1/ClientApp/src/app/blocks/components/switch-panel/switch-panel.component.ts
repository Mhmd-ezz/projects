import { Component, OnInit, Input, ChangeDetectionStrategy, Pipe, OnDestroy } from '@angular/core';

@Component({
    selector: 'switch-panel',
    templateUrl: './switch-panel.component.html',
    styleUrls: ['./switch-panel.component.scss'],
})
export class SwitchPanelComponent implements OnInit, OnDestroy {

    showBack = false;
    @Input('toggle') public isExpanded: boolean = true;

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle source view
     */
    toggleSourceView(): void {
        this.showBack = !this.showBack;
    }

}
