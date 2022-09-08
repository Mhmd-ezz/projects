import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { PdfViewerComponent } from './pdf-viewer.component';

@Injectable({
    providedIn: 'root'
})
export class PdfViewerService {

    public open: Subject<any>;
    constructor(
        public dialog: MatDialog,
        private snackBar: MatSnackBar,


    ) {
        this.open = new Subject();
    }

    openPdf(file) {

        if (!file) {
            this.snackBar.open('An error occurred. Unable to open file.', 'OK', {
                panelClass: 'm-24',
                duration: 4000,
            });
            return;
        }

        const url = file.url || file.filePath || file.path || null;

        if (!url) { return; }

        const dialogRef = this.dialog.open(PdfViewerComponent, {
            disableClose: false,
            autoFocus: false,
            height: '90vh',
            minWidth: '80vw',
            data: { url },
        });
    }
}
