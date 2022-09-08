import { CreateClientModalModule } from './create-client-modal.module';
import { CreateClientModalComponent } from './create-client-modal.component';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: CreateClientModalModule
})
export class CreateClientModalService {

  constructor(public dialog: MatDialog) { }

  openDialog(): MatDialogRef<CreateClientModalComponent, any> {
    const dialogRef = this.dialog.open(CreateClientModalComponent, {
      // height: '400px',
      width: '600px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
    return dialogRef;
  }

}
