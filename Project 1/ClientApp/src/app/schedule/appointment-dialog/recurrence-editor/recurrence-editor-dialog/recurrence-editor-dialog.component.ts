import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-recurrence-editor-dialog',
    templateUrl: './recurrence-editor-dialog.component.html',
    styleUrls: ['./recurrence-editor-dialog.component.scss']
})
export class RecurrenceEditorDialogComponent implements OnInit {

    value: string;

    constructor(
        public dialogRef: MatDialogRef<RecurrenceEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data.data)
            this.value = data.data
    }

    ngOnInit() {
    }

    onRecurrenceChange(event: any) {
        this.value = event.value
    }

    onSaveClick() {
        this.dialogRef.close(this.value)
    }

    onCancelClick() {
        this.dialogRef.close();
    }


}
