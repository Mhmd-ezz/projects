import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConstantsService } from 'app/blocks/common/constants.service';
import { DrugViewBase } from 'app/blocks/graphql/generated/bases';
import { AppUtils } from 'app/blocks/utils';

@Component({
    selector: 'mdc-drug-input-dialog',
    templateUrl: './mdc-drug-input-dialog.component.html',
    styleUrls: ['./mdc-drug-input-dialog.component.scss']
})
export class MdcDrugInputDialogComponent implements OnInit {
    @ViewChild('form', { static: true}) public form: NgForm;
    public drugForms: string[] = [];
    public drugRoutes: string[] = [];
    // public drug = new DrugViewBase();
    public drug = {
        id: null,
        name: null,
        dosage: null,
        route: null,
        form: null
    };
    constructor(
        public dialogRef: MatDialogRef<MdcDrugInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public drugModel: DrugViewBase,
        private _constantsService: ConstantsService
    ) {
        // @ set defaults
        this.drugForms = _constantsService.drugForms;
        this.drugRoutes = _constantsService.drugRoutes;
        this.drug = Object.assign(this.drug, drugModel);
        // @ Generate drug id if null
        if (!this.drug.id) { 
            this.drug.id = AppUtils.GenerateObjectId(); 
        }
    }

    ngOnInit(): void {}

    onNoClick(): void {
        this.dialogRef.close();
    }
    onOkClick(): void {
        const isValid = AppUtils.validateForm(this.form, true);
        if (isValid) { this.dialogRef.close(this.drug); }
    }

    onKeyPress(event): void {
        if (event.keyCode === 13) {
            const isValid = AppUtils.validateForm(this.form, true);
            if (isValid) { this.dialogRef.close(this.drug); }
        }
    }
}
