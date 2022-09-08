import { ConditionSelectorArgs } from '../../interface/condition-selector-args';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient, PatientGQL } from 'app/blocks/graphql/generated/gqlServices';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import omit from 'lodash/omit';
import { MatSelectChange } from '@angular/material/select';
import { MedicalUtils } from 'app/blocks/utils/medical-utils';

@Component({
    selector: 'app-condition-selector',
    templateUrl: './condition-selector.component.html',
    styleUrls: ['./condition-selector.component.scss']
})
export class ConditionSelectorComponent implements OnInit {

    @Output() change: EventEmitter<ConditionSelectorArgs> = new EventEmitter<ConditionSelectorArgs>();

    @Input() selectorArgs: ConditionSelectorArgs;

    @Input() set patientId(value: string) {
        if (value) {
            this.getPatientById(value);
        }
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    patient: Patient;
    grouped: any[];
    selection;

    constructor(
        private _patientGql: PatientGQL,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSelectionChanged(event: MatSelectChange) {
        if (typeof event.value === 'undefined') {
            this.change.emit(null);
        } else {
            this.change.emit(event.value);
        }
    }

    compareCategoryObjects(object1: any, object2: any) {
        return object1 && object2 && object1.id === object2.id;
    }

    // ----------------------------------------------------------------
    //  Private methods
    // ----------------------------------------------------------------

    private getPatientById(id): void {

        this._patientGql
            .watch({ id })
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ data, loading }) => {
                if (data && data.patient) {

                    this.patient = Object.assign({}, data.patient);

                    if (this.patient.patientInfo) {

                        this.buildViewModel(this.patient);
                    }
                }
            });
    }

    private buildViewModel(patient: Patient): void {

        const specialities = omit(patient.patientInfo.specialities, '__typename');

        this.grouped = Object.keys(specialities).map(function (key, index) {

            return {
                name: key,
                value: specialities[key].conditions.map(condition => {

                    const diagnosis = MedicalUtils.extractConditionDiagnosis(condition);

                    return { id: condition.id, name: condition.name, diagnosis: diagnosis ? diagnosis.text[0].text : '' };
                })
            };
        });
    }
}
