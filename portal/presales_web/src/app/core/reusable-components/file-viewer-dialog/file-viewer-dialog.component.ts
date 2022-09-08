import { IFile } from './../../interface/file.interface';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-viewer-dialog',
  templateUrl: './file-viewer-dialog.component.html',
  styleUrls: ['./file-viewer-dialog.component.scss']
})
export class FileViewerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FileViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFile,
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
