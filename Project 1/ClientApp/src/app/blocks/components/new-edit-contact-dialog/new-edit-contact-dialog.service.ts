import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewEditContactDialogComponent } from './new-edit-contact-dialog.component';
import { NewEditContactDialogModule } from './new-edit-contact-dialog.module';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';


@Injectable({
    providedIn: NewEditContactDialogModule
})
export class NewEditContactDialogService {

    constructor(
        public dialog: MatDialog,
        
    ) { }

    openDialog(data: Contact = {}) {
        const dialogRef = this.dialog.open(NewEditContactDialogComponent, {
            disableClose: true,
            // height: "90vh",
            // minWidth: '320px',
            data: data,
        });

        return dialogRef.afterClosed()
    }

}
