import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

/**
 * @title Bottom Sheet Overview
 */
@Component({
    selector: 'contact-selection-navigator',
    template: `
    <mat-nav-list>
        <a href="" mat-list-item (click)="onContactSelection($event)">
            <span mat-line class="teal-600-fg" style="font-weight: 500;">Create a contact</span>
            <!-- <span mat-line>Create Contact.</span> -->
        </a>
        <a href="" mat-list-item (click)="onPatientSelection($event)">
        <span mat-line class="teal-600-fg" style="font-weight: 500;">Create a patient</span>
        <!-- <span mat-line>Create patient and contact.</span> -->
    </a>
        <a href="" mat-list-item (click)="onCancel($event)">
            <span mat-line class="deep-orange-500-fg" style="font-weight: 500;">Cancel</span>
            <!-- <span mat-line>Keep this location.</span> -->
        </a>
    </mat-nav-list>
    `,
    styles: [``],
})
export class SelectionNavigatorSheetComponent {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<SelectionNavigatorSheetComponent>,
    ) { }

    onContactSelection(event: MouseEvent): void {
        this.bottomSheetRef.dismiss({ navigateTo: 'contact' });
        event.preventDefault();
    }

    onPatientSelection(event: MouseEvent): void {
        this.bottomSheetRef.dismiss({ navigateTo: 'patient' });
        event.preventDefault();
    }

    onCancel(event: MouseEvent): void {
        this.bottomSheetRef.dismiss({ navigateTo: '' });
        event.preventDefault();
    }


}
