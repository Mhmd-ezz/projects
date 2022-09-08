import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TagEditorDialogComponent } from './tag-editor-dialog/tag-editor-dialog.component';

@Component({
    selector: 'app-tag-selector',
    templateUrl: './tag-selector.component.html',
    styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit {

    value: string;

    @Input() set data(value) {
        this.value = value;
    }

    // @ Is tag dialog enabled 
    @Input() isEditable = true;
    
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
    }

    onEditClick() {

        if (!this.isEditable) { return; }

        const dialogRef = this._dialog.open(TagEditorDialogComponent, {
            disableClose: true,
           
           // height: "90vh",
           // height: "100px",
          // width: "500px",
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
