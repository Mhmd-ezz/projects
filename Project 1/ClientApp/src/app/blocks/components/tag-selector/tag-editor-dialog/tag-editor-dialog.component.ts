import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-tag-editor-dialog',
    templateUrl: './tag-editor-dialog.component.html',
    styleUrls: ['./tag-editor-dialog.component.scss']
})
export class TagEditorDialogComponent implements OnInit {
    @ViewChild('input', { static: false }) input: ElementRef;
    
    value: string;

    constructor(
        public dialogRef: MatDialogRef<TagEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data.data)
            this.value = data.data
    }

    ngOnInit() {
       
    }
    
    

    onSaveClick() {
        this.dialogRef.close(this.input.nativeElement.value)
    }

    onCancelClick() {
        this.dialogRef.close();
    }


}
