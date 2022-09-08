import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RotaFormDialogComponent } from '../../rota-form-dialog/rota-form-dialog.component';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';

@Component({
    selector: 'app-rota-add-recurrence',
    templateUrl: './rota-add-recurrence.component.html',
    styleUrls: ['./rota-add-recurrence.component.scss']
})
export class RotaAddRecurrenceComponent implements OnInit {

    constructor(
        public _dialog: MatDialog,
        private _bottomSheet: MatBottomSheet,
    ) { }

    ngOnInit() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    add() {

        const dialogRef = this._dialog.open(RotaFormDialogComponent, {
            disableClose: true,
            height: '90vh',
            // minWidth: '320px',
            data: null,
        });

        // @ Exit On escape keydown
        dialogRef.keydownEvents().subscribe((keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent && keyboardEvent.which === 27) {
                this.confirmDialogClose(dialogRef);
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------


    /**
      * @Description Confirm if appointment dialog should be closed
      * 
      * @private
      * @param {MatDialogRef<any, any>} dialog 
      * 
      * @memberOf AppScheduleComponent
      */
    private confirmDialogClose(dialog: MatDialogRef<any, any>) {

        const args: ConfirmActionSheetArgs = {
            yes: 'Exit and discard changes',
            no: 'Don\'t exit'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                dialog.close(null);
            }
        });
    }

}
