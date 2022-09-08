import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';

@Component({
    selector: 'app-confirm-action-sheet',
    templateUrl: './confirm-action-sheet.component.html',
    styleUrls: ['./confirm-action-sheet.component.scss'],
})
export class ConfirmActionSheetComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<ConfirmActionSheetComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: ConfirmActionSheetArgs
    ) { }

    ngOnInit() {
    }


    yes(): void {
        this.bottomSheetRef.dismiss(true);
        event.preventDefault();
    }

    no(): void {
        this.bottomSheetRef.dismiss(false);
        event.preventDefault();
    }
}
