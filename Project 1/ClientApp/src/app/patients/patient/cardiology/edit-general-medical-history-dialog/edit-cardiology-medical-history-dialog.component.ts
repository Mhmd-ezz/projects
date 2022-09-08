import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Logger } from '@nsalaun/ng-logger';
import { ConfirmDialogComponent } from 'app/blocks/components/confirm-dialog/confirm-dialog-component';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { LookupsByGroupsGQL, PatientGQL, UpdateCardiologyMedicalHistoryGQL } from 'app/blocks/graphql/generated/gqlServices';
import { AppUtils } from 'app/blocks/utils';
import { empty, Subject } from 'rxjs';
import { catchError, takeUntil, tap, filter } from 'rxjs/operators';
import groupBy from 'lodash/groupBy';
import { SurgicalHistoryBase, PatientBase } from 'app/blocks/graphql/generated/bases';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { SurgeryTableAdvancedComponent } from 'app/blocks/components/surgery-table-advanced/surgery-table-advanced.component';
import { MdcLookupInputAdvancedComponent } from 'app/blocks/components/mdc-lookup-input-advanced/mdc-lookup-input-advnaced.component';

@Component({
    selector: 'edit-cardiology-medical-history-dialog',
    templateUrl: './edit-cardiology-medical-history-dialog.component.html',
    styleUrls: ['./edit-cardiology-medical-history-dialog.component.scss']
})
export class EditCardiologyMedicalHistoryDialogComponent implements OnInit {

    @ViewChild('form', { static: true}) public form: NgForm;
    @ViewChild('focus', { static: false }) public focus: string;


    @ViewChild('surgeryWhatInput', { static: false }) public surgeryWhatInput: SurgeryTableAdvancedComponent;
    @ViewChild('inputAllergies', { static: false }) public inputAllergies: MdcLookupInputAdvancedComponent;
    @ViewChild('inputFamilyHistory', { static: false }) public inputFamilyHistory: MdcLookupInputAdvancedComponent;
    @ViewChild('inputMedicalIssues', { static: false }) public inputMedicalIssues: MdcLookupInputAdvancedComponent;


    // Private
    private _unsubscribeAll: Subject<any>;
    private onPatientChange: Subject<any>;
    private timeOut = 1000;

    public surgery: SurgicalHistoryBase = new SurgicalHistoryBase();
    public lookups: any = {};
    public patient = new PatientBase();
    public isDirty = false;

    public surgeryDisplayedColumns: string[] = ['index', 'what', 'when', 'note', 'action'];
    public surgeryAgo: number;
    public dataSource = new MatTableDataSource();


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
    public focusTo = '';

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _updateCardiologyMedicalHistoryGQL: UpdateCardiologyMedicalHistoryGQL,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _patientGQL: PatientGQL,
        private snackBar: MatSnackBar,
        private _logger: Logger,
        private _store: Store<fromRoot.AppState>,        
        private _formUtilsService: FormUtilsService,        
        private dialog: MatDialog,
    ) {
        // @ Private
        this._unsubscribeAll = new Subject();
        this.onPatientChange = new Subject();
        // this._store.dispatch(fromActions.loadPatient({id: this.data.id}))

    }

    ngAfterContentInit(): void {

        // @ automaticaly focus on input
        setTimeout(() => {

            // @ data.focus on will provide the which input to focus on
            const focusOn = this.data.focusOn;
            if (focusOn === '') {
                return;
            }

            if (focusOn === 'allergies') {
                this.inputAllergies.input.nativeElement.focus();
                this.focusTo = focusOn;
            }
            else if (focusOn === 'medicalIssues') {
                this.inputMedicalIssues.input.nativeElement.focus();
                this.focusTo = focusOn;
            }
            else if (focusOn === 'familyHistory') {
                this.inputFamilyHistory.input.nativeElement.focus();
                this.focusTo = focusOn;
            }
            else if (focusOn === 'surgicalHistory') {
                this.surgeryWhatInput.surgeryWhatInput.input.nativeElement.focus();
                this.focusTo = focusOn;
            }
            else if (focusOn === 'pastMedication') {
                this.focusTo = focusOn;
            }
            else if (focusOn === 'presentMedication') {
                this.focusTo = focusOn;
            }

        }, 500);

    }


    ngOnInit() {

        // this._patientGQL
        //     .watch({ id: this.data.id })
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((response) => {
        //         if (response.data && response.data.patient) {
        //             this.patient = AppUtils.mergeForForms(this.patient, response.data.patient);
        //             this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data);

        //         }
        //     })
         
        this._store.select(fromSelectors.selectedPatientSelector)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
           if (response && response.data) {
               this.patient = AppUtils.mergeForForms(this.patient, response.data);    
              
               this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data);

           }

             }); 

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

            this._store.select(fromSelectors.patientSavedLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
             
            )
            .subscribe(_ => {
            
                this._formUtilsService.formSavedLocally();
                this._formUtilsService.popup('No internet access, Saved locally');
                // this._store.dispatch(fromActions.loadPatient({id: this.data.id}))
                this.isDirty = false;
                this.dialogRef.close();     
          });
          this._store.select(fromSelectors.error)
          .pipe(
              takeUntil(this._unsubscribeAll),
              filter(data => !!data)
          )
          .subscribe((errors) => {
              {
                  this._formUtilsService.formError();
                  this._formUtilsService.popup('An error Occurred' + errors);
                  this._logger.error(errors);
              }
          }

          );

        this.onPatientChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
               // tap((_) => {
                    // @ if offline close dialog
                    // if (navigator.onLine === false) {
                    //     this.dialogRef.close();
                    //     // @ we are offline do something
                    //     this.snackBar.open("No internet access, Saved locally", 'CLOSE', {
                    //         panelClass: "m-24",
                    //         duration: 2000,
                    //     });
                    // }
                // })
            // )
            // .pipe(
            //     switchMap(x => {
                tap(() => {
                    const isValid = AppUtils.validateForm(this.form, false);
                    if (isValid) {
                        if (this.patient.id) {

                            const patient = Object.assign({}, this.patient);
                            this._store.dispatch(fromActions.updateCardiologyMedicalHistory(
                                {patientId: patient.id, medicalHistory: patient.patientInfo.specialities.cardiology.medicalHistory as any}));
                                
                            // return this._updateCardiologyMedicalHistoryGQL.mutate(
                            //     { patientId: patient.id, medicalHistory: patient.patientInfo.specialities.cardiology.medicalHistory },
                            //     {
                            //         optimisticResponse: updateCardiologyMedicalHistoryGqlCallback.optimisticResponse(patient.patientInfo.specialities.cardiology.medicalHistory),
                            //         update: (proxy, ev) => updateCardiologyMedicalHistoryGqlCallback.update(proxy, ev, patient.id)
                            //     }
                            // );

                            // @ TODO : DELETE, no more needed
                            // let patient = Object.assign({}, this.patient);
                            // return this._updatePatientGQL.mutate(
                            //     { patient: patient },
                            //     {
                            //         optimisticResponse: updatePatientGqlCallback.optimisticResponse(patient),
                            //         update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
                            //     }
                            // );

                        } else {
                            this._logger.error('[ERROR]: Couldn\'t find patient id.');
                        }
                    }
                    else {
                        // @ invalid form take an action..
                        return empty();
                    }
                }),
                catchError((err, source) => {
                    this._logger.error('[ CATCH ERROR ]: ', err);
                    this._formUtilsService.popup('An error Occurred');
                    // @ Important to return source to avoid observable completion
                    return source;
                }),
                // timeout(this.timeOut),
                // catchError(error => {
                //     console.log("timeout")
                //     this.dialogRef.close();
                //     return empty();
                // })
            )
            .subscribe(
                (response) => {

                    this._store.select(fromSelectors.UpdateCardiologyMedicalHistory)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(data => {
      
                       
                        if (data) {                          
                          this._formUtilsService.popup('Medical History updated');
                            AppUtils.SetFormPrestine(this.form);
                            const patient = Object.assign({}, this.patient);
      
                       const medicalHistory = AppUtils.mergeForForms(patient.patientInfo.specialities.cardiology.medicalHistory, data);                       
                        this.patient.patientInfo.specialities.cardiology.medicalHistory = medicalHistory;                        
                       
                        this.isDirty = false;
                        this.dialogRef.close();                        
        
                          
                        }
                    });
        
                    // if (response['dataPresent']) {

                    //     this.snackBar.open("No internet access, Saved locally", 'CLOSE', {
                    //         panelClass: "m-24",
                    //         duration: 4000,
                    //     });
                    //     return
                    // }

                    // if (response.errors) {
                    //     // this.onFormStatusChanged('error')

                    //     this.snackBar.open("An error Occurred", 'CLOSE', {
                    //         panelClass: "m-24",
                    //         duration: 4000,
                    //     });

                    //     return;
                    // }
                    // if (response.data && response.data.updateCardiologyMedicalHistory) {
                    //     this.snackBar.open("Medical History updated", 'CLOSE', {
                    //         panelClass: "m-24",
                    //         duration: 2000,
                    //     });
                    //     // @ Set form as prestine to avoid update conflicts
                    //     AppUtils.SetFormPrestine(this.form);
                    //     let patient = Object.assign({}, this.patient)

                    //     let medicalHistory = AppUtils.mergeForForms(patient.patientInfo.specialities.cardiology.medicalHistory, response.data.updateCardiologyMedicalHistory);
                    //     this.patient.patientInfo.specialities.cardiology.medicalHistory = medicalHistory;
                    //     this.isDirty = false;
                    //     this.dialogRef.close();
                    // }
                },
                (err) => {
                    this._logger.error('[Error]: ', err);
                });


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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // @ Handle Multi input data from mdc-input-component
    lookupNotifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            this.patient.patientInfo.specialities.cardiology.medicalHistory[eventData.modelName].data = eventData.data;
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any) {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.patient.patientInfo.specialities.cardiology.medicalHistory[eventData.modelName].data = eventData.data;
        }
    }
    notifySurgeryHandler(eventData: outputDataEvent) {
        const surgery = eventData.data;
        
        if (surgery){
            this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data = eventData.data;
            this.onPatientChange.next(this.patient);
        }
       
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        // this.dialogRef.close();
        this.saveChanges();
    }

    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {

            this.onPatientChange.next(this.patient);
            // if (this.patient.id) {
             
            //      //console.log('patinet',this.patient)
            //    this._store.dispatch(fromActions.updatePatient({patient:this.patient}));
          
    
            // }
            // let net$ = of(this._internetConnectionService.isConnected).pipe()


            // let patient = Object.assign({}, this.patient);
            // this._updatePatientGQL
            //     .mutate(
            //         { patient: patient },
            //         {
            //             optimisticResponse: updatePatientGqlCallback.optimisticResponse(patient),
            //             update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
            //         })
            //     .pipe(
            //         tap((_) => {
            //             this._internetConnectionService
            //                 .isConnected()
            //                 .subscribe((isConnected) => {
            //                     if (isConnected === false)
            //                         this.dialogRef.close();
            //                 })
            //         }),
            //         timeout(this.timeOut),
            //         catchError(error => {
            //             this.dialogRef.close();
            //             return empty();
            //         })
            //     )
            //     .subscribe(
            //         (response) => {
            //             if (response.data.updatePatient) {
            //                 this.snackBar.open("Medical History updated", 'CLOSE', {
            //                     panelClass: "m-24",
            //                     duration: 2000,
            //                 });
            //                 // @ Set form as prestine to avoid update conflicts
            //                 AppUtils.SetFormPrestine(this.form);
            //                 let patient = Object.assign({}, this.patient)
            //                 this.patient = AppUtils.mergeForForms(patient, response.data.updatePatient);
            //                 this.isDirty = false;
            //                 this.dialogRef.close();
            //             }
            //         },
            //         (err) => {
            //             this._logger.error("[Error]: ", err)
            //         });
        }

    }

    // onRemoveSurgery(index) {
    //     this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data.splice(index, 1)
    //     this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data)
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
    //             this.surgery = new SurgicalHistoryBase();
    //             this.surgeryAgo = null;
    //             this.onSurgeryFocus()
    //         }
    //     })

    // return dialogRef;
      
    // }
    // onAddSurgery() {
    //     let isEmptySurgery = true;

    //     for (var i in this.surgery) {
    //         if (this.surgery[i] != null) {
    //             isEmptySurgery = false;
    //             break;
    //         }
    //     }

    //     if (!isEmptySurgery) {
    //         this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data.push(this.surgery);
    //         this.dataSource = new MatTableDataSource(this.patient.patientInfo.specialities.cardiology.medicalHistory.surgicalHistory.data)
    //         this.surgery = new SurgicalHistoryBase();
    //         this.surgeryAgo = null;
    //         this.onSurgeryFocus()
    //     }
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
