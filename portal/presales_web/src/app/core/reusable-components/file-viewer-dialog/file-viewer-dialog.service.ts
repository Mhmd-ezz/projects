import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileViewerDialogComponent } from './file-viewer-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FileViewerDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(file): void {
    const dialogRef = this.dialog.open(FileViewerDialogComponent, {
      width: '100vw',
      height: '90vh',
      data: file,
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

}
