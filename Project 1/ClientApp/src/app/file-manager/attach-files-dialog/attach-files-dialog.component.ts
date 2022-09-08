import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Patient, PatientGQL } from '../../blocks/graphql/generated/gqlServices';
import { GeneralCondition } from './../../blocks/graphql/generated/gqlServices';

@Component({
    selector: 'attach-files-dialog',
    templateUrl: './attach-files-dialog.component.html',
    styleUrls: ['./attach-files-dialog.component.scss']
})

// @ todo : switch to blocks/components/attact-files and remove this component
export class AttachFilesDialogComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    onCurrentPatientChanged: Subject<any>;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: string[] = [
        'knee pain'
    ];

    condition: any;
    speciality;
    patientId;
    patient: Patient;
    conditionsList;
    activitiesList;

    selectedSpeciality;
    selectedConditionId;
    selectedFollowupId;
    selectedOperationId;

    constructor(
        public dialogRef: MatDialogRef<AttachFilesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _patientGql: PatientGQL,
    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();

        this.onCurrentPatientChanged = new Subject();

    }

    ngOnInit() {

        this.onCurrentPatientChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((patient) => {
            });
    }

    /**
       * On destroy
       */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    // ------------------------------------------------------------------
    //  @ Public Methods
    // ------------------------------------------------------------------

    onPatientChanged(patientId) {
        this.getPatientById(patientId);
    }

    /**
      * Get Patient by id
      *
      * @returns {void}
      */
    getPatientById(id): void {
        this._patientGql.watch({ id: id })
            .valueChanges
            .subscribe((response) => {
                if (response.data && response.data.patient) {
                    this.patient = Object.assign({}, response.data.patient);
                }

                this.onCurrentPatientChanged.next(this.patient);
            });
    }

    format(patient: Patient) {
        patient.patientInfo.specialities.general.conditions;
    }

    onSpecialityChanged(event) {
        const speciality = event.value;
        if (speciality != null || speciality !== '') {
            this.conditionsList = this.patient.patientInfo.specialities[speciality].conditions;
        }
    }

    onConditionChanged(event) {
        // @ Create activities list for mat-select

        const condition = event.value;
        if (condition != null) {

            // @ General Speciality then group followups and operations 
            if (this.selectedSpeciality === 'general') {
                const _condition: GeneralCondition = condition;

                // @ update activities list
                this.activitiesList = [
                    {
                        name: 'Followups',
                        list: _condition.activities.followups
                    },
                    {
                        name: 'Operations',
                        list: _condition.activities.operations
                    }
                ];
                console.log(this.activitiesList);
            }

        }
    }



    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.tags.push(value);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(value: any): void {
        const index = this.tags.indexOf(value);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

}
