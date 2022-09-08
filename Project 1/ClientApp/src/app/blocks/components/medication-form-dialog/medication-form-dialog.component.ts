import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPrescriptionBottleAlt, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { AppUtils } from 'app/blocks/utils';
import { FuseUtils } from '@fuse/utils';
import { Logger } from '@nsalaun/ng-logger';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map, tap, filter, takeUntil } from 'rxjs/operators';
import * as automapper from 'automapper-ts';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { CreateDrugGQL, DrugInput, DrugsGQL } from '../../graphql/generated/gqlServices';
import { MdcDrugInputDialogComponent } from '../mdc-drug-input-dialog/mdc-drug-input-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {

    PatientMedicationsHistoryInputBase,
    PatientMedicationsInputBase,
    DrugViewInputBase,
    DrugInputBase
} from '../../graphql/generated/bases';

import * as moment from 'moment';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';

import * as fromPatientsActions from '@appStore/actions';
import { DrugsSearchParams } from '@appStore/model/drugs-search-params';
@Component({
    selector: 'app-medication-form-dialog',
    templateUrl: './medication-form-dialog.component.html',
    styleUrls: ['./medication-form-dialog.component.scss']
})

export class MedicationFormDialogComponent implements OnInit {
    // Private
    private _unsubscribeAll: Subject<any>;
    @ViewChild('form', { static: true }) public form: NgForm;
    faPrescriptionBottleAlt = faPrescriptionBottleAlt;
    faQuoteRight = faQuoteRight;
    action = 'new'; // [new, repalace, renew, stop]
    public oldMedications: any;
    // public History= { 
    //     duration:null,
    //     frequency:null,
    //     status:null,
    //     startDate:null,
    //     stopDate:null,
    //     note:null};


    // public CancelHistory= { 
    //     duration:null,
    //     frequency:null,
    //     status:null,
    //     startDate:null,
    //     stopDate:null,
    //     note:null};

    public History: PatientMedicationsHistoryInputBase;
    public CancelHistory: PatientMedicationsHistoryInputBase;
    public medication: PatientMedicationsInputBase;
    public drug: DrugViewInputBase;
    public newMedication: PatientMedicationsInputBase;
    public drugNameInput = new FormControl('');
    public startDate = new FormControl('');
    public interval = new FormControl('');
    public intervalType = new FormControl('');

    public stopDate = new FormControl('');
    public drugs: any;
    filteredDrugs: Observable<any>;
    newDrugValue: any;
    public handledValue;
    today: Date;
    canChange = true;
    intervalTypes = [
        { value: 'Day' },
        { value: 'Week' },
        { value: 'Month' },
        { value: 'Year' },
    ];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<MedicationFormDialogComponent>,
        private _store: Store<fromRoot.AppState>,
        private dialog: MatDialog,
        private _createDrugGQL: CreateDrugGQL,
        private snackBar: MatSnackBar,
        private _drugsGQL: DrugsGQL,
        private _logger: Logger,
        private _formUtilsService: FormUtilsService,
    ) {
        this._unsubscribeAll = new Subject();
        this.action = data.action || 'new';
        this.medication = new PatientMedicationsInputBase();
        this.History = new PatientMedicationsHistoryInputBase();
        this.CancelHistory = new PatientMedicationsHistoryInputBase();
        this.drugs = new DrugInputBase();
        this.newMedication = new PatientMedicationsInputBase();
        this.today = new Date();

        this.newDrugValue = null;
        if (this.action === 'new') {
            this.medication.patientId = data.patientId;
            this.medication.conditionId = data.conditionId;
            this.medication.followupId = data.followupId;
        }
        else {
            this.medication = Object.assign({}, AppUtils.DeepClone(data.medication)) as PatientMedicationsInputBase;

            if (this.action === 'replace') {
                this.drugNameInput.setValue(null);
            }
            else {
                this.drugNameInput.setValue(this.medication.drug.name);
            }
        }
        // this._store.dispatch(fromActions.loadDrugs());

        // if (this.medication.patientId && this.medication.id)
        //     this._store.dispatch(fromActions.loadMedication(
        //                 {  medicationId: this.medication.id, patientId:this.patient.id }));
    }

    ngOnInit(): void {
        // @ Get medications 
        this._store.select(fromSelectors.medications)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.oldMedications = data;
                }

            });

        // if (this.action != 'new') {                 
        //     this._store.select(fromSelectors.selectedMedication)
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data => {
        //         if (data && data.data) 
        //            this.medication = Object.assign({}, AppUtils.DeepClone(data.data)) as MedicationBase
        //     })

        this.drugNameInput.valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    console.log(value);
                    if (value !== '') {
                        const variables: DrugsSearchParams = {
                            filter: this.drugNameInput.value,
                            page: 1,
                            size: 20
                        };
                        this._store.dispatch(fromPatientsActions.loadDrugsSearch({ variables: variables }));

                    }
                })
            )
            .subscribe();

        // @ Get drugs 
        this._store.select(fromSelectors.drugs)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.drugs = data;
                    this.filteredDrugs = this.drugNameInput.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => this._filterDrugs(value))
                        );
                    if (this.newDrugValue) {
                        this.drugNameInput.setValue(this.newDrugValue.name);
                    }
                }
            });




        // @ On save locally
        this._store.select(fromSelectors.drugSavedLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)

            )
            .subscribe(_ => {
                this._formUtilsService.formSavedLocally();
                this._formUtilsService.popup('No internet access, Saved locally');
                if (this.newDrugValue) {
                    this.drugNameInput.setValue(this.newDrugValue.name);
                }
            });

        //  this._drugsGQL
        //     .watch()
        //     .valueChanges.pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(
        //         response => {
        //             if (response.data && response.data.drugs) {

        //                 this.drugs = response.data.drugs;
        //                 console.log('drug',this.drugs)
        //                 this.filteredDrugs = this.drugNameInput.valueChanges
        //                 .pipe(
        //                   startWith(''),
        //                   map(value2 => typeof value2 === 'string' ? value2 : value2.name),                          
        //          map(name => name ? this._filterDrugs(name) : this.drugs.slice())
        //                 );
        //             }

        //         },
        //         error => {
        //             this._logger.error('[Error]: ', error);
        //         }
        //     );  



    }

    ngAfterViewInit(): void {

        // this.startDate
        //     .valueChanges
        //     .pipe(
        //         debounceTime(500),
        //         distinctUntilChanged(),
        //         tap((value: any) => {
        //            this.getDuration();

        //         })).subscribe();


    }
    getDuration() {
        if (this.startDate.value && this.stopDate.value) {
            this.canChange = false;
            // this.interval.disable();
            // this.intervalType.disable();
            this.interval.setValue(null);
            this.intervalType.setValue(null);
            this.History.duration = null;
            const stopDate = new Date(this.stopDate.value);

            const startDate = new Date(this.startDate.value);

            let days = Math.floor((stopDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);

            const months = Math.floor(days / 30);

            let stillmonths = months;

            const years = Math.floor(months / 12);
            if (years > 0) {
                stillmonths = months - years * 12;
            }

            if (stillmonths > 0) {
                days = days - months * 30;
            }

            if (years > 0) {
                this.History.duration = years + ' year (s) - ';
                this.interval.setValue(years);
                this.intervalType.setValue(this.intervalTypes[3].value);
            }
            if (stillmonths > 0) {
                this.History.duration = this.History.duration + stillmonths + ' month (s) -';
                if (!this.interval.value) {
                    this.interval.setValue(stillmonths);
                }
                if (!this.intervalType.value) {
                    this.intervalType.setValue(this.intervalTypes[2].value);
                }
            }
            if (days > 0) {
                const week = Math.floor(days / 7);
                const day = days - week * 7;
                if (week > 0) {
                    this.History.duration = this.History.duration + week + ' week (s) -';

                    if (day > 0) {
                        this.History.duration = this.History.duration + day + ' day (s)';
                    }
                    if (!this.interval.value) {
                        this.interval.setValue(week);
                    }
                    if (!this.intervalType.value) {
                        this.intervalType.setValue(this.intervalTypes[1].value);
                    }
                }
                else {
                    this.History.duration = this.History.duration + days + ' day (s)';
                    if (!this.interval.value) {
                        this.interval.setValue(days);
                    }
                    if (!this.intervalType.value) {
                        this.intervalType.setValue(this.intervalTypes[0].value);
                    }
                }
            }


        }

        this.canChange = true;
    }

    intervalChanged(value) {
        if (value) {
            if (!this.startDate.value) {
                this.startDate.setValue(new Date(Date.now()));
            }
            if (this.intervalType.value && this.canChange) {
                this.addDate();
            }
        }

    }
    intervalTypeChanged(value) {
        if (value) {
            if (!this.startDate.value) {
                this.startDate.setValue(new Date(Date.now()));
            }
            if (this.interval.value && this.canChange) {
                this.addDate();
            }
        }
    }
    addDate() {
        const new_date = moment(this.startDate.value, 'DD/MM/YYYY');
        if (this.intervalType.value === 'week') {
            const interval = this.interval.value * 7;
            const intervalType = 'day';
            const add_date = new_date.add(interval, intervalType).format('YYYY-MM-DD');
            const end_date = new Date(add_date);
            this.stopDate.setValue(end_date);

        }
        else {
            const add_date = new_date.add(this.interval.value, this.intervalType.value).format('YYYY-MM-DD');
            const end_date = new Date(add_date);
            this.stopDate.setValue(end_date);
        }
    }
    startDateChanged(value) {
        if (value) {
            if (this.stopDate.value) {
                this.getDuration();
            }
        }
    }

    stopDateChanged(value) {
        if (value) {
            if (this.startDate.value) {
                this.getDuration();
            }
        }
    }

    private _filterDrugs(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.drugs.filter(drug => drug.name.toLowerCase().includes(filterValue));
    }
    displayFn(id) {
        console.log('id', id);
        if (!id) { return ''; }
        if (id === '0') { return ''; }
        const index = this.drugs.findIndex(option => option.name === id);
        console.log('index', index);
        return this.drugs[index].name;
    }
    /**
        * On destroy
        */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // --------------------------------------------------------------------
    //  Public methods
    // --------------------------------------------------------------------   
    saveNewMedication(): void {
        this.History.status = 'New Medication Added';
        this.History.startDate = this.startDate.value;
        this.History.endDate = this.stopDate.value;
        this.medication.history = [this.History];
        // this.medication.history.push(this.History)           
        const medication = Object.assign({}, this.medication);
        this._store.dispatch(fromActions.newMedication(
            { medication: medication }));
    }
    replaceMedication(): void {
        this.medication.isActive = false;
        this.CancelHistory.endDate = new Date();
         this.CancelHistory.startDate= new Date();
        this.CancelHistory.status = 'Medication Replaced by ' + this.drugNameInput.value;
        this.medication.history.push(this.CancelHistory);
        const medication = Object.assign({}, this.medication);
        this._store.dispatch(fromActions.stopMedication(
            { medication: medication }));

        this.History.status = 'New Medication Added';
        this.History.startDate = this.startDate.value;
        this.History.endDate = this.stopDate.value;
        this.newMedication.history = [this.History];
        const newMedication = Object.assign({}, this.newMedication);
        this._store.dispatch(fromActions.newMedication(
            { medication: newMedication }));
    }

    onSave(): void {
        const isValid = AppUtils.validateForm(this.form, false);
        if (isValid) {
            if (this.medication.patientId) {
                if (this.action === 'new') {
                    this.medication = new PatientMedicationsInputBase();
                    this.medication.patientId = this.data.patientId;
                    this.medication.conditionId = this.data.conditionId;
                    this.medication.followupId = this.data.followupId;
                    this.medication.medicationId = FuseUtils.generateGUID();
                    this.medication.isActive = true;
                    // this.medication.drug.name = this.drugNameInput.value;
                    const drugId = this.drugs.find(i => i.name === this.drugNameInput.value);

                    this.medication.drug.name = drugId.name;
                    this.medication.drug.id = drugId.id;
                    const oldMedication = this.oldMedications.find(i => i.drug.name === this.medication.drug.name);

                    if (oldMedication !== undefined) {
                        if (oldMedication.isActive) {
                            this._formUtilsService.popup('drug already exists');
                        }
                        else {
                            this.saveNewMedication();
                        }

                    }
                    else {
                        this.saveNewMedication();
                    }
                }
                if (this.action === 'stop') {
                    this.medication.isActive = false;
                    this.History.endDate = new Date();
                    this.History.status = 'Medication Stopped';
                    this.medication.history.push(this.History);
                    const medication = Object.assign({}, this.medication);
                    this._store.dispatch(fromActions.stopMedication(
                        { medication: medication }));
                }
                if (this.action === 'renew') {
                    this.History.status = 'Medication Renewal';
                    this.History.startDate = this.startDate.value;
                    this.History.endDate = this.stopDate.value;
                    const medication = Object.assign({}, this.medication);
                    medication.conditionId = this.data.conditionId;
                    medication.followupId = this.data.followupId;
                    medication.isActive = true;
                    medication.history.push(this.History);
                    this._store.dispatch(fromActions.renewMedication(
                        { medication: medication }));
                }
                if (this.action === 'replace') {


                    // this.newMedication =Object.assign({}, AppUtils.DeepClone(this.medication)) as PatientMedicationsInputBase
                    this.newMedication = new PatientMedicationsInputBase();
                    this.newMedication.patientId = this.data.medication.patientId;
                    this.newMedication.conditionId = this.data.conditionId;
                    this.newMedication.followupId = this.data.followupId;
                    this.newMedication.medicationId = FuseUtils.generateGUID();
                    this.newMedication.isActive = true;
                    // this.medication.drug.name = this.drugNameInput.value;
                    const drugId = this.drugs.find(i => i.name === this.drugNameInput.value);
                    this.newMedication.drug.name = drugId.name;
                    this.newMedication.drug.id = drugId.id;
                    const oldMedication = this.oldMedications.find(i => i.drug.name === this.newMedication.drug.name);

                    if (oldMedication !== undefined) {
                        if (oldMedication.isActive) {
                            this._formUtilsService.popup('drug already exists');
                        }
                        else {
                            this.replaceMedication();
                        }

                    }
                    else {
                        this.replaceMedication();
                    }
                }
                this.dialogRef.close();

            }

        }

    }

    onCancelClick(): void {
        this.dialogRef.close();
    }



    /**
      * @DEPRICATED
      * 
      * 
      *
      */
    openNewDrugDialog(): void {
        const dialogRef = this.dialog.open(MdcDrugInputDialogComponent, {
            data: this.medication.drug,
            height: '500px',
            width: '600px'
        });

        // dialogRef.afterClosed().subscribe((result: DrugView) => {
        dialogRef.afterClosed().subscribe((result: any) => {
            result['__typename'] = 'DrugView';
            this.medication.drug = result;
            this.handledValue = result;
            // @ Update local drug name input in ui
            // console.log(result)
            // this.drugNameInput.setValue(result.name);                             
            // @ returned drug of type drugView and server expects drugInput then map the drug
            const mappedDrugInput: DrugInput = automapper.map(
                'DrugView',
                'DrugInputBase',
                result
            );
            this.newDrugValue = mappedDrugInput;
            // @ send request and update store
            this._store.dispatch(fromActions.newDrug({ drug: mappedDrugInput }));

            // return this._createDrugGQL.mutate(
            //     { drug: mappedDrugInput },
            //     {
            //         optimisticResponse: createDrugGqlCallback.optimisticResponse(
            //             mappedDrugInput
            //         ),
            //         update: (proxy, ev) =>
            //             createDrugGqlCallback.update(proxy, ev)
            //     }
            // );

        });
    }


}
