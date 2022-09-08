import { TenantsService } from './../../../blocks/services/tenants.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Logger } from '@nsalaun/ng-logger';
import { ConstantsService } from 'app/blocks/common/constants.service';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { PatientBase, SurgicalHistoryBase } from 'app/blocks/graphql/generated/bases';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { AppUtils } from 'app/blocks/utils';
import uniqBy from 'lodash/uniqBy';
import * as moment from 'moment';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { CreatePatientGQL, LookupsByGroupsGQL, UpdatePatientGQL } from '../../../blocks/graphql/generated/gqlServices';
import { Grantor, GrantorsGQL, Tag } from './../../../blocks/graphql/generated/gqlServices';
import { FuzzySearchService } from './../../../blocks/pipes/fuzzy-search.service';
import { Tenant } from 'app/blocks/common/tenant.model';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';

@Component({
    selector: 'new-patient',
    templateUrl: './new-patient.component.html',
    styleUrls: ['./new-patient.component.scss'],
    animations: fuseAnimations
})
export class NewPatientComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild('dupChecker', { static: true }) public dupChecker;
    @ViewChild('surgeryWhatInput', { static: false }) surgeryWhatInput: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;
    private onPatientChange: Subject<any>;
    private savingDelay = 3000;
    private searchOptions: ISearchOptions = {
        keys: ['name'],
        extractOriginalItem: false,
        outputLimit: 30
    };

    public grantors: Array<Grantor> = [];
    public tags: Array<Tag> = [];
    public lookups: any = {};
    public contact = new PatientBase();
    public formStatus: string = null;
    public surgery: SurgicalHistoryBase = new SurgicalHistoryBase();
    public isDirty = false;
    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public referralChipsVisible = true;
    public referralChipssSlectable = true;
    public referralChipsRemovable = true;
    public referralChipsAddOnBlur = true;


    // @ Handle all possible matching duplicate patients 
    public isDuplicateClean$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // @ Controls
    public allergiesControl = new FormControl('');
    public familyHistoryControl = new FormControl('');
    public medicalIssuesControl = new FormControl('');

    // public grantorList: string[] = [];

    public surgeryDisplayedColumns: string[] = ['index', 'what', 'when', 'note', 'action'];
    public CardiologySurgeryDisplayedColumns: string[] = ['index', 'type', 'what', 'when', 'note', 'action'];
    public dataSource = new MatTableDataSource(this.contact.patientInfo.specialities.general.medicalHistory.surgicalHistory.data);
    public dataSourceCardiology = new MatTableDataSource(this.contact.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data);
    public surgeryAgo: number;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public SpecialityEnum: typeof SpecialityEnum = SpecialityEnum;

    public tenant: Tenant;

    //////
    op_type = '';

    constructor(
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _createPatientGQL: CreatePatientGQL,
        private _updatePatientGQL: UpdatePatientGQL,
        private _constantsService: ConstantsService,
        private _grantorsGQL: GrantorsGQL,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private _logger: Logger,
        private _router: Router,
        private _fuzzySearchService: FuzzySearchService,
        
        private _tenantsService: TenantsService,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onPatientChange = new Subject();
        // this.grantorList = this._constantsService.grantors;
        this.contact.patientInfo.entryDate = new Date();

    }

    ngOnInit(): void {

        this._store.select(fromSelectors.Grantors)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.grantors = data;
                }

            });
        this._store.select(fromSelectors.Tags)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.tags = data;
                }
            });

        // @ On save locally
        this._store.select(fromSelectors.patientSavedLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)

            )
            .subscribe(_ => {
                this._formUtilsService.formSavedLocally();
                this._formUtilsService.popup('No internet access, Saved locally');
            });


        // @ On create Patient failure
        this._store.select(fromSelectors.error)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((errors) => this._formUtilsService.handleErrors(errors));


        // @ On update
        this._store.select(fromSelectors.updatePatientSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.contact.id) {
                    this.onUpdateContactCallback(data);
                }
            });

        // @ On create patient success
        this._store.select(fromSelectors.createPatientSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.contact.id) {
                    this.onCreateContactCallback(data);
                }

            });

        this.loadTenantData();
        this.loadGrantors();
        this.loadTags();
        this.watchFormChangesProcessor();
        this.watchPatientChangesProcessor();





    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.onPatientChange.next();
        this.onPatientChange.complete();
        this.contact = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // @ Handle Multi input data from mdc-input-component
    lookupNotifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            this.contact.patientInfo.specialities.general.medicalHistory[eventData.modelName].data = eventData.data;
            this.onPatientChange.next(this.contact);
        }
    }
    // @ Handle Multi input data from phone-component
    notifyTelephoneHandler(eventData: any) {
        if (eventData) {
            // @ modelName is required to specify which object property is updated 

            // this.contact.contactNumbers = eventData;
            // @ fire observable to send server request
            this.onPatientChange.next(this.contact);
        }
    }
    // @ Handle Multi input data from tag-component
    notifyTagHandler(eventData: any) {
        if (eventData) {
            // @ modelName is required to specify which object property is updated         
            this.contact.patientInfo.tags = eventData.data;
            // @ fire observable to send server request
            this.onPatientChange.next(this.contact);
        }
    }
    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any) {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.contact.patientInfo.specialities.general.medicalHistory[eventData.modelName].data = eventData.data;
            // @ fire observable to send server request
            this.onPatientChange.next(this.contact);
        }
    }

    onDuplicateIdentityCheckerChanged(event) {
        this.isDuplicateClean$.next(event);
        if (this.isDuplicateClean$.value === true) {
            this.save();
        }
    }

    save() {
        setTimeout(() => {
            if (this.form.dirty) {
                this.onPatientChange.next(this.contact);
            }
        }, 0);
    }

    onDone() {

        if (this.contact.id) {
            this._router.navigate(['/patients', this.contact.id, 'general']);
        }
        else {
            this._router.navigate(['/patients']);
        }


        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         // @ if patient is created navigate to profile
        //         if (this.patient.id)
        //             this._router.navigate(['/patients', this.patient.id, 'general']);
        //         else
        //             this._router.navigate(['/patients'])
        //     }
        // });
    }

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

    // onNewPatientClick() {

    //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //         minWidth: '350px',
    //         data: { isDirty: this.isDirty, }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.contact = new PatientBase();
    //             this.form.reset(this.contact);
    //             this.formStatus = '';
    //         }
    //     });
    // }

    // onFormStatusChanged(status: string) {
    //     this.formStatus = status;
    // }

    addReferral(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.contact.patientInfo.referral.push(value.trim());
            this.onPatientChange.next(this.contact);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeReferral(name: any): void {
        const index = this.contact.patientInfo.referral.indexOf(name);

        if (index >= 0) {
            this.contact.patientInfo.referral.splice(index, 1);
            this.onPatientChange.next(this.contact);
        }
    }

    onRemoveSurgery(index) {
        this.contact.patientInfo.specialities.general.medicalHistory.surgicalHistory.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.contact.patientInfo.specialities.general.medicalHistory.surgicalHistory.data);
        this.onPatientChange.next(this.contact);

    }

    onAddSurgery() {

        // is empty
        if (this.surgery.what === null && this.surgery.when === null && this.surgery.note === null) {
            return;
        }

        this.contact.patientInfo.specialities.general.medicalHistory.surgicalHistory.data.push(this.surgery);
        this.dataSource = new MatTableDataSource(this.contact.patientInfo.specialities.general.medicalHistory.surgicalHistory.data);
        this.onPatientChange.next(this.contact);
        this.surgery = new SurgicalHistoryBase();
        this.surgeryAgo = null;
        this.onSurgeryFocus();
    }
    onSurgeryDateChange(value) {
        const _value = value.target ? value.target.value : value;

        if (moment(_value).isValid() === true) {
            const date = moment(_value).format('MM-DD-YYYY');
            const now = moment().format('MM-DD-YYYY');
            const df = AppUtils.dateDifferenceOptimized(date, now);
            if (df.years > 0) {
                this.surgeryAgo = +df.years;
            }
        }

    }

    onSurgeryAgoChange(value: number) {
        const date = moment().subtract(value, 'years');
        this.surgery.when = date['_d'];
    }

    onSurgeryFocus() {
        setTimeout(() => {
            this.surgeryWhatInput.nativeElement.focus();
        }, 100);
    }

    // -------------------------------------------------------
    // Private methods
    // -------------------------------------------------------

    private loadTenantData() {

        this._store.select(fromSelectors.getTenant)
        // this._tenantsService.currentTenant$
            .pipe(
                takeUntil(this._unsubscribeAll))
            .subscribe(
                (tenant) => {
                    if (tenant === null) { return; }

                    this.tenant = Object.assign({}, tenant);
                },
                (error) => {
                    console.error('[ERROR]:', error);
                });
    }

    private loadGrantors() {

        // @ Get grantors
        this._store.dispatch(fromActions.loadGrantors());

    }

    private loadTags() {

        // @ Get grantors
        this._store.dispatch(fromActions.loadTags({ group: 'patient' }));

    }

    private watchFormChangesProcessor() {

        // @ Subscribe for form changes
        this.form
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.save();
            });
    }

    private sendXhrProcessor() {
        this._formUtilsService.formSaving();

        if (this.contact.id) {

            this._store.dispatch(fromActions.updatePatient({ patient: this.contact }));

        } else {

            // @ bug fixes
            this.contact.createdOn = new Date();

            this.contact.id = AppUtils.GenerateObjectId();
            const patient = Object.assign({}, this.contact);
            this._store.dispatch(fromActions.createPatient({ patient: patient }));
        }
    }



    private duplicateCheckerProcessor() {
        if (this.isDuplicateClean$.value === false) {
            this.dupChecker.checkDuplicate(this.contact);
        }
    }

    private formPendingProcessor() {

        this._formUtilsService.formPending();
        this.isDirty = true;
    }

    private onCreateContactCallback(response) {

        this.errors = [];
        this._formUtilsService.formSaved();
        AppUtils.SetFormPrestine(this.form);
        this._formUtilsService.popup('Patient created.');


        // @ Set form as prestine to avoid update conflicts
        // AppUtils.SetFormPrestine(this.form);

        const patientMedicalHistory = this.contact.patientInfo.specialities.general.medicalHistory;
        let patientTags = this.contact.patientInfo.tags;

        patientTags = uniqBy(
            patientTags
                .concat((response as PatientBase).patientInfo.tags),
            (obj: any) => (obj.name as string).toLowerCase());

        patientMedicalHistory.pastMedication.data = uniqBy(
            patientMedicalHistory.pastMedication.data
                .concat((response as PatientBase).patientInfo.specialities.general.medicalHistory.pastMedication.data),
            (obj: any) => (obj.drug.name as string).toLowerCase());
        // 'drug.name');

        patientMedicalHistory.presentMedication.data = uniqBy(
            patientMedicalHistory.presentMedication.data
                .concat((response as PatientBase).patientInfo.specialities.general.medicalHistory.presentMedication.data),
            (obj: any) => (obj.drug.name as string).toLowerCase());
        // 'drug.name');

        this.contact = AppUtils.mergeForForms(this.contact, response);
        this.contact.patientInfo.specialities.general.medicalHistory = patientMedicalHistory;
        this.contact.patientInfo.tags = patientTags;
    }

    private onUpdateContactCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        AppUtils.SetFormPrestine(this.form);
        const patientMedicalHistory = this.contact.patientInfo.specialities.general.medicalHistory;
        let patientTags = this.contact.patientInfo.tags;

        patientTags = uniqBy(
            patientTags
                .concat((response as PatientBase).patientInfo.tags),
            (obj: any) => (obj.name as string).toLowerCase());

        patientMedicalHistory.pastMedication.data = uniqBy(
            patientMedicalHistory.pastMedication.data
                .concat((response as PatientBase).patientInfo.specialities.general.medicalHistory.pastMedication.data),
            (obj: any) => (obj.drug.name as string).toLowerCase());
        // 'drug.name');

        patientMedicalHistory.presentMedication.data = uniqBy(
            patientMedicalHistory.presentMedication.data
                .concat((response as PatientBase).patientInfo.specialities.general.medicalHistory.presentMedication.data),
            (obj: any) => (obj.drug.name as string).toLowerCase());
        // 'drug.name');


        this.contact = AppUtils.mergeForForms(this.contact, response);
        this.contact.patientInfo.specialities.general.medicalHistory = patientMedicalHistory;
        this.contact.patientInfo.tags = patientTags;
        // @ Set form as prestine to avoid update conflicts
        AppUtils.SetFormPrestine(this.form);
    }

    private watchPatientChangesProcessor() {
        // @ SEND REQUEST 
        this.onPatientChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid                
                filter(() => this._formUtilsService.isValid(this.form)),
                // @ if patient is not checked if duplcate exists
                tap(_ => this.duplicateCheckerProcessor()),
                // @ skip until isDuplicateClean is true
                filter(() => this.isDuplicateClean$.value),
                tap(_ => this.formPendingProcessor()),
                debounceTime(this.savingDelay),
                tap(() => {
                    this.sendXhrProcessor();
                })
            )
            .subscribe();
    }


}
