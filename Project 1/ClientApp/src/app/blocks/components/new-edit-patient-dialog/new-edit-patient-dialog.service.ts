import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewEditPatientDialogModule } from './new-edit-patient-dialog.module';
import { NewEditPatientDialogComponent } from './new-edit-patient-dialog.component';

@Injectable({
    providedIn:NewEditPatientDialogModule
})
export class NewEditPatientDialogService {

    constructor(
        public dialog: MatDialog
      ) { }
    
      openDialog(data = {}) {
        const dialogRef = this.dialog.open(NewEditPatientDialogComponent, {
          width: '800px',
          disableClose: true,
          // minWidth: '320px',
          data: data,
        });
    
        return dialogRef.afterClosed()
      }

}
