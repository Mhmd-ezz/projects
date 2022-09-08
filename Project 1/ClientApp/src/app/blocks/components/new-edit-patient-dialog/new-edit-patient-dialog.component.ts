import { ContactBase } from './../../graphql/generated/bases';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientBase } from 'app/blocks/graphql/generated/bases';
import { AppUtils } from 'app/blocks/utils';

@Component({
    selector: 'app-new-edit-patient-dialog',
    templateUrl: './new-edit-patient-dialog.component.html',
    styleUrls: ['./new-edit-patient-dialog.component.scss']
})
export class NewEditPatientDialogComponent implements OnInit {

    contact = new ContactBase();

    constructor(
        public dialogRef: MatDialogRef<NewEditPatientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSave() {

        // @ Send XHR request
        // ...
        if (!this.contact.id)
            this.contact.id = AppUtils.GenerateObjectId()

        this.dialogRef.close(this.contact);

    }

}
