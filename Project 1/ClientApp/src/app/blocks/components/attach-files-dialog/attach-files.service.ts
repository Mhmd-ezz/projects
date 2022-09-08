import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttachFilesDialogComponent } from './attach-files-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AttachFilesService {

    public onTriggerDialog: Subject<any>

    constructor(
        private dialog: MatDialog,
    ) {
        this.onTriggerDialog = new Subject();
        this.onTriggerDialog.subscribe(x => {
            console.log("server subscribe", x)
        })
    }

    open(selectedFiles: any[]): MatDialogRef<any, any> {
        console.log(selectedFiles)

        const dialogRef = this.dialog.open(AttachFilesDialogComponent, {
            panelClass: "default-dialog",
            minHeight: "300px",
            minWidth: "300px",
            data: { files: selectedFiles }
        });

        return dialogRef;
    }





}
