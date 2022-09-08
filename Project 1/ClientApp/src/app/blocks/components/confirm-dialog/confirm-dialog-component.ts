import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    styles: [`
        .body{
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .message{
            font-size: 15px;
            font-weight: 700;
        }
        .mat-dialog-content{
            min-height :190px;
        }
    `],
    template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div clas="mat-dialog-content" mat-dialog-content>

    <div class="body">
        <mat-icon class="s-120"style="color: #02699b;">help</mat-icon>
        <div class="message">Are you sure ?</div>
    </div>
        
    </div>
    <div mat-dialog-actions>
        <button mat-raised-button [mat-dialog-close]="false">No Thanks</button>
        <button mat-raised-button color="accent" [mat-dialog-close]="true" cdkFocusInitial>Primary</button>
    </div>
`,
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
