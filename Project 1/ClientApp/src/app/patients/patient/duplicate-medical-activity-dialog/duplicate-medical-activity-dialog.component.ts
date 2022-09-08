import { remarkDuplicateActivityGqlCallback } from '../../../blocks/graphql/callback/remarkDuplicateActivityGqlCallback';
import { RemarkDuplicateActivityGQL } from '../../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IsMedicalActivityDuplicated } from 'app/blocks/interface/is-medical-activity-duplicated';
import { Apollo } from 'apollo-angular';
import { filter } from 'rxjs/operators';
import { AppUtils } from 'app/blocks/utils';

@Component({
    selector: 'app-duplicate-dialog',
    templateUrl: './duplicate-medical-activity-dialog.component.html',
    styleUrls: ['./duplicate-medical-activity-dialog.component.scss']
})
export class DuplicateMedicalActivityDialogComponent implements OnInit {

    isDuplicate = true;
    model: IsMedicalActivityDuplicated = {};
    errors: any[] = [];

    constructor(
        private _apollo: Apollo,
        private _remarkDuplicateActivityGQL: RemarkDuplicateActivityGQL,
        public dialogRef: MatDialogRef<DuplicateMedicalActivityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IsMedicalActivityDuplicated,
        private snackBar: MatSnackBar,

    ) { }

    ngOnInit() {

        if (this.data) {
            this.model = Object.assign({}, this.data);
            this.model.isDuplicate = this.model.isDuplicate ? this.model.isDuplicate : false;

        } else {
            this.model.isDuplicate = false;
        }
    }

    // ----------------------------------------------------------------------------
    //  Public Methods
    // ----------------------------------------------------------------------------
    onSave() {
        this.sendToBackend(this.model);
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    sendToBackend(data: IsMedicalActivityDuplicated) {

        const variables = {
            patientId: data.patientId,
            speciality: data.speciality,
            conditionId: data.conditionId,
            activityType: data.activityType,
            activityId: data.activityId,
            isDuplicate: data.isDuplicate,
        };

        this._remarkDuplicateActivityGQL
            .mutate(
                variables,
                {
                    optimisticResponse: remarkDuplicateActivityGqlCallback.optimisticResponse(data),
                    update: (proxy, ev) => remarkDuplicateActivityGqlCallback.update(this._apollo.client, ev, data)
                }
            )
            .pipe(
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {

                        this.snackBar.open('No internet access, Saved locally', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }
                    // @ Always pass through
                    return true;
                }),

                // @ Catch validation errors
                filter((response) => {

                    // @ errors exists
                    if (response.errors !== undefined && response.errors.length) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors);
                    }

                    // @ found Validation errors
                    if (this.errors.length) {

                        this.snackBar.open('An error Occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }

                    // @ if errors 
                    return response.errors !== undefined && response.errors.length ? false : true;
                })
            )
            .subscribe((data) => {
                this.dialogRef.close(this.model);
            });
    }
}
