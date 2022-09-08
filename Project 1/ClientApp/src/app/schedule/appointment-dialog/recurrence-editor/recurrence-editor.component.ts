import { RecurrenceEditorDialogComponent } from './recurrence-editor-dialog/recurrence-editor-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-recurrence-editor',
    templateUrl: './recurrence-editor.component.html',
    styleUrls: ['./recurrence-editor.component.scss']
})
export class RecurrenceEditorComponent implements OnInit {

    value: string;

    @Input() set data(value) {
        this.value = value;
    }

    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
    }

    onEditClick() {

        const dialogRef = this._dialog.open(RecurrenceEditorDialogComponent, {
            disableClose: true,
            // height: "90vh",
            minHeight: '300px',
            minWidth: '300px',
            data: { data: this.value },
        });

        dialogRef
            .afterClosed()
            .subscribe((rrule: string) => {
                // @ If dialog was canceled
                if (typeof rrule === 'undefined') {
                    return;
                }

                this.value = rrule;
                this.change.emit(this.value);
            });
    }
}
