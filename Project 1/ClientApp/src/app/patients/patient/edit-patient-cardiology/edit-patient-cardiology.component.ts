import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { ConstantsService } from 'app/blocks/common/constants.service';
import { ConfirmDialogComponent } from 'app/blocks/components/confirm-dialog/confirm-dialog-component';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { AppUtils } from 'app/blocks/utils';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap, filter } from 'rxjs/operators';

import groupBy from 'lodash/groupBy';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import uniqBy from 'lodash/uniqBy';
import { Grantor, Tag, LookupsByGroupsGQL, UpdatePatientGQL, GrantorsGQL, PatientGQL } from 'app/blocks/graphql/generated/gqlServices';

import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { PatientBase, SurgicalHistoryBase, PatientInfoBase } from 'app/blocks/graphql/generated/bases';

@Component({
    selector: 'app-edit-patient-cardiology',
    templateUrl: './edit-patient-cardiology.component.html',
    styleUrls: ['./edit-patient-cardiology.component.scss']
})
export class EditPatientCardiologyComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild('surgeryWhatInput', { static: false }) public surgeryWhatInput: ElementRef;
    @ViewChild('what', { static: false }) public what: NgModel;

    // Private
    private _unsubscribeAll: Subject<any>;
    private onPatientChange: Subject<any>;
    private savingDelay = 3000;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    public grantors: Array<Grantor> = [];
    public tags: Array<Tag> = [];
    public lookups: any = {};
    public patient = new PatientBase();
    public formStatus: string = null;
    public surgery: SurgicalHistoryBase = new SurgicalHistoryBase();
    public isDirty = false;
    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public referralChipsVisible = true;
    public referralChipssSlectable = true;
    public referralChipsRemovable = true;
    public referralChipsAddOnBlur = true;

    // @ Controls
    public allergiesControl = new FormControl('');
    public familyHistoryControl = new FormControl('');
    public medicalIssuesControl = new FormControl('');
    public cardiovascularControl = new FormControl('');
    public giControl = new FormControl('');
    public endocrinologyControl = new FormControl('');
    public lungDiseasesControl = new FormControl('');
    public neurologyControl = new FormControl('');
    public physiomaticDisorderControl = new FormControl('');


    // public grantorList: string[] = [];
    public surgeryDisplayedColumns: string[] = ['index', 'what', 'when', 'note', 'action'];
    public surgeryAgo: number;
    public dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data);

    constructor(
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _updatePatientGQL: UpdatePatientGQL,
        private _constantsService: ConstantsService,
        private _grantorsGQL: GrantorsGQL,
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private _logger: Logger,
        private _router: Router,
        private _patientGQL: PatientGQL,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onPatientChange = new Subject();
        // this._route.parent.params
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe(params => {
        //     this._store.dispatch(fromActions.loadPatient({id:params["id"]}))
        // } );
        // this.grantorList = this._constantsService.grantors;
    }


    ngOnInit() {

        // @ Get grantors       
        this._store.select(fromSelectors.Grantors)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.grantors = data;
                }
            });
             // @ Get tags       
        this._store.select(fromSelectors.Tags)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
            if (data) {
                this.tags = data;
            }
        });

        // @ Extract patient id from URL
        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data && data.data) {
                    AppUtils.SetFormPrestine(this.form);
                    this.patient = Object.assign({}, AppUtils.DeepClone(data.data)) as PatientBase;
                    // BUG FIXES
                    // @ In case contact the model doesn't contain patientInfo
                    // console.log(this.patient)
                    
                    if (this.patient && this.patient.patientInfo == null) {
                        this.patient.patientInfo = new PatientInfoBase();
                        if (!this.patient.patientInfo.entryDate) { this.patient.patientInfo.entryDate = new Date(); }
                    }

                    this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data);
                }
            });
            this._store.select(fromSelectors.updatePatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data ) {
                    this.errors = [];                  
                    this._formUtilsService.formSaved();
                    // AppUtils.SetFormPrestine(this.form);
                    const patientMedicalHistory = this.patient.patientInfo.specialities.cardiology.medicalHistory;

                    patientMedicalHistory.pastMedication.data = uniqBy(
                        patientMedicalHistory.pastMedication.data
                            .concat((data as PatientBase).patientInfo.specialities.cardiology.medicalHistory.pastMedication.data),
                            (obj: any) => (obj.drug.name as string).toLowerCase());
                            // 'drug.name');

                    patientMedicalHistory.presentMedication.data = uniqBy(
                        patientMedicalHistory.presentMedication.data
                            .concat((data as PatientBase).patientInfo.specialities.cardiology.medicalHistory.presentMedication.data),
                            (obj: any) => (obj.drug.name as string).toLowerCase());
                            // 'drug.name');
                        this.patient = AppUtils.mergeForForms(this.patient, data);
                    this.patient.patientInfo.specialities.cardiology.medicalHistory = patientMedicalHistory;
                    AppUtils.SetFormPrestine(this.form);
                    // this.patient = AppUtils.mergeForForms(patient, response.data.updatePatient);
                    this.isDirty = false;
                }

            });

        // @ On Patient Load failure
        this._store.select(fromSelectors.error)
        .pipe(
            takeUntil(this._unsubscribeAll),
            filter(data => !!data)
        )
        .subscribe((errors) => 
        {
            {
                this._formUtilsService.formError();
                this._logger.error(errors);
            }
        }
        
        );

         // @ Catch when saved locally
         this._store.select(fromSelectors.patientSavedLocallySelector)
         .pipe(
             takeUntil(this._unsubscribeAll),
             filter(data => !!data)
          
         )
         .subscribe(_ => {
         
            this._formUtilsService.formSavedLocally();
            this._formUtilsService.popup('No internet access, Saved locally');
       });

        
        this.loadGrantors();
        this.loadTags();
        this.watchFormChangesProcessor();
        this.watchPatientChangesProcessor();
        
        // // @ Extract patient id from URL
        // this._route.parent.params
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(params => {
                
        //         let id = params["id"];

        //         // @ Load patient 
        //         if (id)
        //             this._patientGQL
        //                 .watch({ id: id })
        //                 .valueChanges
        //                 .pipe(takeUntil(this._unsubscribeAll))
        //                 .subscribe(response => {
        //                     if (response.data && response.data.patient) {                               
        //                         AppUtils.SetFormPrestine(this.form);
        //                         // this.patient = AppUtils.mergeForForms(this.patient, response.data.patient)

        //                         this.patient = Object.assign({}, AppUtils.DeepClone(response.data.patient)) as PatientBase
        //                         // BUG FIXES

        //                         // @ In case contact the model doesn't contain patientInfo
        //                         if (this.patient && this.patient.patientInfo == null) {
        //                             this.patient.patientInfo = new PatientInfoBase()
        //                             if(!this.patient.patientInfo.entryDate) this.patient.patientInfo.entryDate = new Date()
        //                         }

        //                         this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.general.medicalHistory.surgicalHistory.data);
        //                     }
        //                 }, (error) => {
        //                     this.onFormStatusChanged(this.formStatusEnum.error);
        //                     this._logger.error(error);
        //                 });
        //     });

        // @ Load lookups
        this._lookupsByGroupsGQL
            .watch({ groups: ['allergies', 'family_history', 'medical_issues'] })
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    if (response.data && response.data.lookupsByGroups) {
                        this.lookups = groupBy(response.data.lookupsByGroups, 'groupKey');
                    }
                },
                (error) => {
                    this._logger.error('[error]: ', error);
                }
            );


        // @ Subscribe for form changes
        // this.form.valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data => {
        //         setTimeout(() => {
        //             if (this.form.dirty)
        //                 this.onPatientChange.next(this.patient)
        //         }, 0);
        //     });


        // // @ SEND REQUEST 
        // this.onPatientChange
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .pipe(
        //         // @ validate the form and skip if invalid
        //         filter(() => {

        //             let isValid = AppUtils.validateForm(this.form, false)

        //             if (!isValid)
        //                 this.onFormStatusChanged(this.formStatusEnum.invalid)

        //             return isValid
        //         }),
        //         tap(ev => {
        //             this.onFormStatusChanged(this.formStatusEnum.pending);
        //             this.isDirty = true;
        //         }),
        //         debounceTime(this.savingDelay),
        //     )

        //     .pipe(
        //         switchMap(x => {
        //             if (this.patient.id) {

        //                 this.onFormStatusChanged(this.formStatusEnum.saving)

        //                 let patient = Object.assign({}, this.patient);
        //                 return this._updatePatientGQL.mutate(
        //                     { patient: patient },
        //                     {
        //                         optimisticResponse: updatePatientGqlCallback.optimisticResponse(patient),
        //                         update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
        //                     }
        //                 );

        //             } else {
        //                 this._logger.error("[ERROR]: Couldn't find patient id.")
        //             }

        //         }),
        //         catchError((err, source) => {
        //             this.onFormStatusChanged(this.formStatusEnum.error);
        //             this._logger.error("[ CATCH ERROR ]: ", err)
        //             this.snackBar.open("An error Occurred", 'CLOSE', {
        //                 panelClass: "m-24",
        //                 duration: 4000,
        //             });
        //             // @ Important to return source to avoid observable completion
        //             return source;
        //         })
        //     )
        //     .pipe(
        //         // @ Catch when saved locally
        //         filter((response) => {

        //             if (response['dataPresent']) {
        //                 this.onFormStatusChanged(this.formStatusEnum.savedLocally)

        //                 this.snackBar.open("No internet access, Saved locally", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 4000,
        //                 });
        //                 return false
        //             }

        //             return true
        //         }),
        //         // @ Catch validation errors
        //         filter((response) => {

        //             // @ errors exists
        //             if (response.errors != undefined && response.errors.length)
        //                 this.errors = AppUtils.handleValidationGqlErrors(response.errors)

        //             // @ found Validation errors
        //             if (this.errors.length) {
        //                 this.onFormStatusChanged(this.formStatusEnum.validationError)

        //                 this.snackBar.open("An error Occurred", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 4000,
        //                 });
        //             }
        //             else if (response.errors)
        //                 // @ Unknown error
        //                 this.onFormStatusChanged(this.formStatusEnum.error)

        //             // @ if errors 
        //             return response.errors != undefined && response.errors.length ? false : true;
        //         })
        //     )
        //     .subscribe(
        //         (response) => {

        //             this.onFormStatusChanged(this.formStatusEnum.saved);


        //             if (response.data && response.data.updatePatient) {
        //                 this.errors = [];

        //                 // this.snackBar.open("Patient updated", 'CLOSE', {
        //                 //     panelClass: "m-24",
        //                 //     duration: 2000,
        //                 // });

        //                 // @ Set form as prestine to avoid update conflicts
        //                 AppUtils.SetFormPrestine(this.form);
        //                 let patient = Object.assign({}, this.patient)

        //                 let patientMedicalHistory = this.patient.patientInfo.specialities.general.medicalHistory

        //                 patientMedicalHistory.pastMedication.data = uniqBy(
        //                     patientMedicalHistory.pastMedication.data
        //                         .concat((response.data.updatePatient as PatientBase).patientInfo.specialities.general.medicalHistory.pastMedication.data),
        //                     'drug.name');

        //                 patientMedicalHistory.presentMedication.data = uniqBy(
        //                     patientMedicalHistory.presentMedication.data
        //                         .concat((response.data.updatePatient as PatientBase).patientInfo.specialities.general.medicalHistory.presentMedication.data),
        //                     'drug.name');

        //                 this.patient.patientInfo.specialities.general.medicalHistory = patientMedicalHistory;

        //                 // this.patient = AppUtils.mergeForForms(patient, response.data.updatePatient);
        //                 this.isDirty = false;
        //             }
        //         },
        //         (err) => {
        //             this._logger.error("[Error]: ", err)
        //         });
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
        this.patient = null;
    }

// -------------------------------------------------------
    // Private methods
    // -------------------------------------------------------
    private loadGrantors() {

        // @ Get grantors
        this._store.dispatch(fromActions.loadGrantors());
       
    }
    private loadTags() {

        // @ Get tags
        this._store.dispatch(fromActions.loadTags({group: 'patient'}));
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
    save() {
        setTimeout(() => {
            if (this.form.dirty) {
                this.onPatientChange.next(this.patient);
            }
        }, 0);
    }
    private watchPatientChangesProcessor() {   
        
        // @ SEND REQUEST 
        this.onPatientChange           
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid                
                filter(() => {
                const isValid = AppUtils.validateForm(this.form, false);

                if (!isValid) {
                this._formUtilsService.formInvalid();
                }

                return isValid; }),
                tap(_ => {
                    this._formUtilsService.formPending();
                    this.isDirty = true;
                }),
               
                debounceTime(this.savingDelay),            
            tap(() => {
                this.sendXhrProcessor();
            })
            )
            .subscribe();
                // () => {
                    // this._formUtilsService.formSaved()
                    // if (response.data && response.data.updatePatient) {
                    //     this.errors = [];

                    //     // this.snackBar.open("Patient updated", 'CLOSE', {
                    //     //     panelClass: "m-24",
                    //     //     duration: 2000,
                    //     // });

                    //     // @ Set form as prestine to avoid update conflicts
                    //     AppUtils.SetFormPrestine(this.form);
                    //     let patient = Object.assign({}, this.patient)

                    //     let patientMedicalHistory = this.patient.patientInfo.specialities.cardiology.medicalHistory

                    //     patientMedicalHistory.pastMedication.data = uniqBy(
                    //         patientMedicalHistory.pastMedication.data
                    //             .concat((response.data.updatePatient as PatientBase).patientInfo.specialities.cardiology.medicalHistory.pastMedication.data),
                    //         'drug.name');

                    //     patientMedicalHistory.presentMedication.data = uniqBy(
                    //         patientMedicalHistory.presentMedication.data
                    //             .concat((response.data.updatePatient as PatientBase).patientInfo.specialities.cardiology.medicalHistory.presentMedication.data),
                    //         'drug.name');

                    //     this.patient.patientInfo.specialities.cardiology.medicalHistory = patientMedicalHistory;

                    //     // this.patient = AppUtils.mergeForForms(patient, response.data.updatePatient);
                    //     this.isDirty = false;
                    // }
                // },
                // (err) => {
                //     this._logger.error("[Error]: ", err)
                 // }
                // );
    }

    
    private sendXhrProcessor() {
        
        if (this.patient.id) {
            this._formUtilsService.formSaving();

            this._store.dispatch(fromActions.updatePatient({patient: this.patient}));
      

        } else { 
        this._logger.error('[ERROR]: Couldn\'t find patient id.');
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    notifySurgeryHandler(eventData: outputDataEvent) {
        const surgery = eventData.data;
        
        if (surgery){
            this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data = eventData.data;
            this.onPatientChange.next(this.patient);
        }
       
    }
    // @ Handle Multi input data from mdc-input-component
    lookupNotifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            this.patient.patientInfo.specialities.cardiology.medicalHistory[eventData.modelName].data = eventData.data;
            this.onPatientChange.next(this.patient);
        }
    }

    lookupNotifyHandlerRisk(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) { 
            this.patient.patientInfo.specialities.cardiology.medicalHistory.riskFactors.data = eventData.data;
            this.onPatientChange.next(this.patient);
        }        
    }

    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any) {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.patient.patientInfo.specialities.cardiology.medicalHistory[eventData.modelName].data = eventData.data;
            // @ fire observable to send server request
            this.onPatientChange.next(this.patient);
        }
    }
    notifyTelephoneHandler(eventData: any) {
               
        if (eventData) {
            // @ modelName is required to specify which object property is updated 
            console.log('contactNumbers', eventData);
           // this.patient.contactNumbers = eventData;
            // @ fire observable to send server request
            this.onPatientChange.next(this.patient);
        }
    }
     // @ Handle Multi input data from tag-component
  notifyTagHandler(eventData: any) {            
    if (eventData) {
        // @ modelName is required to specify which object property is updated         
        this.patient.patientInfo.tags = eventData.data;
        // @ fire observable to send server request
        this.onPatientChange.next(this.patient);
    }
}
    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {
            this.onPatientChange.next(this.patient);
        }
    }

    onNewClick() {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: '350px',
            data: { isDirty: this.isDirty, }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.patient = new PatientBase();
                this.form.reset(this.patient);
                this.formStatus = '';
            }
        });
    }

    onDone() {

        this._router.navigate(['/patients', this.patient.id, 'cardiology']);

        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (this.patient.id && result)
        //         this._router.navigate(['/patients', this.patient.id, 'general']);

        //     // if (result) {
        //     //     this._router.navigate(['/patients'])
        //     // }
        // });
    }

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

    onProfileClick() {
        if (this.patient.id) {
            this._router.navigate(['/patients', this.patient.id, 'cardiology']);
        }
    }

  

    addReferral(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.patient.patientInfo.referral.push(value.trim());
            this.onPatientChange.next(this.patient);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeReferral(name: any): void {
        const index = this.patient.patientInfo.referral.indexOf(name);

        if (index >= 0) {
            this.patient.patientInfo.referral.splice(index, 1);
            this.onPatientChange.next(this.patient);
        }
    }

    // onRemoveSurgery(index) {
    //     this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data.splice(index, 1)
    //     this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data)
    //     this.onPatientChange.next(this.patient)
    // }
    // onEditSurgery(index)
    // {
    //     const dialogRef = this.dialog.open(EditSurgeryDialogComponent, {
    //         minWidth: '80px',
    //         data: {
    //             surgery: this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data[index],
    //         }
    //     });

    //     dialogRef.afterClosed()
    //     .subscribe(data => {
    //         if (typeof data !== "undefined" && data != null && data) {
    //             this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data[index] = data.surgery;
    //             this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data)
    //             this.onPatientChange.next(this.patient)
    //             this.surgery = new SurgicalHistoryBase();
    //             this.surgeryAgo = null;
    //             this.onSurgeryFocus()
    //         }
    //     }) 
    //     return dialogRef;  
      
    // }
    // onAddSurgery() {

    //     // @ is empty 
    //     if (this.surgery.what === null && this.surgery.when === null && this.surgery.note === null)
    //         return

    //     this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data.push(this.surgery);
    //     this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data)
    //     this.onPatientChange.next(this.patient)
    //     this.surgery = new SurgicalHistoryBase();
    //     this.surgeryAgo = null;
    //     this.onSurgeryFocus()
    // }

    // onSurgeryDateChange(value) {
    //     let _value = value.target ? value.target.value : value;


    //     if (moment(_value).isValid() === true) {
    //         const date = moment(_value).format("MM-DD-YYYY")
    //         const now = moment().format("MM-DD-YYYY")
    //         const df = AppUtils.dateDifferenceOptimized(date, now);
    //         if (df.years > 0)
    //             this.surgeryAgo = +df.years
    //     }

    // }

    // onSurgeryAgoChange(value: number) {
    //     const date = moment().subtract(value, 'years')
    //     this.surgery.when = date["_d"]
    // }

    // onSurgeryFocus() {
    //     setTimeout(() => {
    //         this.surgeryWhatInput.nativeElement.focus();
    //     }, 100);
    // }

}
