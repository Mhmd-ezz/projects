import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

/**
 * @title Bottom Sheet Overview
 */
@Component({
    selector: 'delete-location-sheet',
    template: `
    <mat-nav-list>
        <a href="" mat-list-item (click)="onDeleteLocation($event)">
            <span mat-line class="red-400-fg" style="font-weight: 500;">Yes</span>
            <span mat-line>Delete this location</span>
        </a>
        <a href="" mat-list-item (click)="onCancel($event)">
            <span mat-line class="blue-600-fg" style="font-weight: 500;">No</span>
            <span mat-line>Keep this location</span>
        </a>
    </mat-nav-list>
    `,
    styles: [``],
})
export class DeleteLocationSheetComponent {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<DeleteLocationSheetComponent>,
    ) { }

    onDeleteLocation(event: MouseEvent): void {
        this.bottomSheetRef.dismiss({ deleteConfirmed: true });
        event.preventDefault();
    }

    onCancel(event: MouseEvent): void {
        this.bottomSheetRef.dismiss({ deleteConfirmed: false });
        event.preventDefault();
    }


}
