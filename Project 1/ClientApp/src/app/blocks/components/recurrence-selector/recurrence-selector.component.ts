import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecurrenceEditorDialogComponent } from './recurrence-editor-dialog/recurrence-editor-dialog.component';

@Component({
    selector: 'app-recurrence-selector',
    templateUrl: './recurrence-selector.component.html',
    styleUrls: ['./recurrence-selector.component.scss']
})
export class RecurrenceSelectorComponent implements OnInit {

    value: string;

    @Input() set data(value) {
        this.value = value;
    }

    // @ Is recurrence dialog enabled 
    @Input() isEditable = true;
    
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
    }

    onEditClick() {

        if (!this.isEditable) { return; }

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
