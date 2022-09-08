import { MedicationFormDialogComponent } from './medication-form-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef,  } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from '../confirm-action-sheet/confirm-action-sheet.component';

@Injectable({
    providedIn: 'root'
  })
export class MedicationFormDialogService {

    constructor(
        public dialog: MatDialog,
        private _bottomSheet: MatBottomSheet,

    ) { }

    openDialog(data: any, ) {
        const dialogRef = this.dialog.open(MedicationFormDialogComponent, {
            disableClose: true,
            autoFocus: false,
            height: '90vh',
            // minWidth: '320px',
            data: data,
        });

        // @ Exit On escape keydown
        dialogRef.keydownEvents().subscribe((keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent && keyboardEvent.which === 27) {
                this.confirmDialogClose(dialogRef);
            }
        });

        return dialogRef;
    }

    /**
    * @Description Confirm if dialog can be closed
    * 
    * @private
    * @param {MatDialogRef<any, any>} dialog 
    * 
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
