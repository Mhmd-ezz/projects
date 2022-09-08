import { deleteMedicalActivityGqlCallback } from './../../../../blocks/graphql/callback/deleteMedicalActivityGqlCallback';
import { remarkDuplicateActivityGqlCallback } from './../../../../blocks/graphql/callback/remarkDuplicateActivityGqlCallback';
import { DeleteMedicalActivityGQL } from 'app/blocks/graphql/generated/gqlServices';
import { IsMedicalActivityDuplicated } from './../../../../blocks/interface/is-medical-activity-duplicated';
import { DuplicateMedicalActivityDialogComponent } from '../../duplicate-medical-activity-dialog/duplicate-medical-activity-dialog.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { Logger } from '@nsalaun/ng-logger';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { AuthService } from 'app/blocks/auth/auth.service';
import { PatientService } from 'app/patients/patient.service';
import { environment } from 'environments/environment';
import cloneDeepWith from 'lodash/cloneDeepWith';
import findIndex from 'lodash/findIndex';
import flatten from 'lodash/fp/flatten';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import map from 'lodash/fp/map';
import reverse from 'lodash/fp/reverse';
import sortBy from 'lodash/fp/sortBy';
import take from 'lodash/fp/take';
import values from 'lodash/fp/values';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { CardiologyActivityMediaFiles } from '../cardiologyActivityMediaFiles';
import { MediaFile, Patient, PatientMediaFilesGQL } from './../../../../blocks/graphql/generated/gqlServices';
import { AppUtils } from './../../../../blocks/utils/index';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { MedicalActivityArgs } from 'app/blocks/interface/medical-activity-args';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';

@Component({
    selector: 'cardiology-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.scss', './carousel.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardiologyConditionsComponent implements OnInit, OnDestroy, AfterViewInit {

    // Private
    private _unsubscribeAll: Subject<any>;


    public patient: Patient = {};
    public mediaFiles: Array<MediaFile> = [];
    panelOpenState = {};
    conditions: any;
    conditionsStates = {};
    conditionsFilter = {
        conditions: true,
        followups: true,
        operations: true,
        activityDetails: true,
        media: {
            physicalExam: true,
            radio: true,
            laboratory: true,
            other: true
        },
        status: {
            active: true,
            inActive: false
        }
    };
    visits: any;
    visitsStates = {};
    visitsFilter = {
        conditions: true,
        followups: true,
        operations: true,
        activityDetails: true,
        media: {
            physicalExam: true,
            radio: true,
            laboratory: true,
            other: true
        }
    };
    groupedFiles: any[];
    mediaEndpoint: any;
    tenantId: any;
     medications:any;
     medicationsByFollowup:any;
     TabIndex:any;
     showPanel =false;
     ShowAllHidden=false;
    /**
     * Constructor
     *
     * @param {Logger} _logger
     * @param {PatientService} _patientsService
     */
    constructor(
        private _deleteMedicalActivityGQL: DeleteMedicalActivityGQL,
        private _logger: Logger,
        private _patientsService: PatientService,
        private ref: ChangeDetectorRef,
        private _patientMediaFilesGQL: PatientMediaFilesGQL,
        private _authService: AuthService,
        private _mediaObserver: MediaObserver,
        public dialog: MatDialog,
        private _bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar, 
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
        private _route: ActivatedRoute,
    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.visitsStates = {};
        this.conditionsStates = {};
        this.panelOpenState = {};

        this.mediaEndpoint = environment.mediaEndpoint;
        this.tenantId = this._authService.identityClaims['tenantId'];
        // this._route.parent.parent.params
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe(params => {
        //     this._store.dispatch(fromActions.loadPatient({id:params["id"]}))
        // } );
        // this._store.dispatch(fromActions.getCurrentPatient())
    }

    ngAfterViewInit(): void {

        setTimeout(() => {
            const isSm = this._mediaObserver.isActive('xs');
            if (isSm) {
                const element: HTMLElement = document.getElementById('tabs');
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }

    ngOnInit(): void {

        // this.patient = this._patientsService.getCurrentPatient();

        // this._patientsService.onCurrentPatientChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {
        //         if (response.data && response.data.patient) {
        //             this.patient = Object.assign({}, response.data.patient);
        //             this.prepareUIProcessor();
        //         }
        //     });
        this._store.select(fromSelectors.selectedPatientSelector)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
           if (response && response.data) {
            
               this.patient = Object.assign({}, response.data);   
               // this._store.dispatch(fromActions.loadMedications({ patientId: this.patient.id }));
               this.prepareUIProcessor();  

           }

             }); 

             
                  

        this._store.select(fromSelectors.medicationsByCondition)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if(response) {
                    this.medications = response;
                }     

             }); 
     this._store.select(fromSelectors.medicationsByFollowup)
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(response => {
                 if (response) { 
                     this.medicationsByFollowup = response;
                 }     
 
              }); 
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.patient = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    prepareUIProcessor(reloadMedia = true) {
        const _conditions = this.ConditionsReformat(this.patient);

        // this.conditions = [..._conditions.conditions]
        // this.visits = [..._conditions.visits]
        // this.conditions = Object.assign([],_conditions.conditions)
        // this.visits =  Object.assign([],_conditions.visits)

        // this.conditions = Array.of(_conditions.conditions)[0]
        // this.visits = Array.of(_conditions.visits)[0]

        this.conditions = AppUtils.cloneArray(_conditions.conditions);
        this.visits = AppUtils.cloneArray(_conditions.visits);
        console.log(this.visits);
        this.visits.forEach(element => {
            if(element.type === 'Followup' || element.type === 'Operation'){
                const id =element.conditionId;                
                const conditionId = this.visits.find(i => i.id === id);
                
                if (conditionId) {
                element.conditionName = conditionId.name;
                }
                }
        });    
        // @ open latest visit by default in latest condition
        // if (this.conditions[0] && this.conditions[0].conditionsList[0])
        //     this.openThisCondition(this.conditions[0].conditionsList[0].id);

        // @ open latest visit by default
        if (this.visits[0]) {
            this.openThisVisit(this.visits[0].id);
        }

        if (reloadMedia) {
            this.loadPatientMediaFiles();
        }
    }

    loadPatientMediaFiles(): void {
        if (this.patient) {
            this._patientMediaFilesGQL
                .watch({
                    patientId: this.patient.id
                })
                .valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                    if (response.data && response.data.patientMediaFiles) {
                        const mediaFiles = response.data.patientMediaFiles;
                        this.mediaFiles = mediaFiles;

                        const groupedFiles: any[] = [];
                        mediaFiles.forEach((file: MediaFile) => {
                            const activityFiles = <CardiologyActivityMediaFiles>{
                                other: [],
                                physicalExam: [],
                                radio: [],
                                laboratory: []
                            };

                            if (!file.activityId && file.conditionId) {
                                if (!groupedFiles[file.conditionId]) {
                                    groupedFiles[file.conditionId] = activityFiles;
                                }

                                if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1
                                ) {
                                    groupedFiles[file.conditionId].physicalExam.push(file);
                                } else if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1
                                ) {
                                    groupedFiles[file.conditionId].radio.push(file);
                                } else if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1
                                ) {
                                    groupedFiles[file.conditionId].laboratory.push(file);
                                } else {
                                    groupedFiles[file.conditionId].other.push(file);
                                }

                                // groupedFiles[file.conditionId].push(file)
                            } else if (file.activityId && file.conditionId) {
                                if (!groupedFiles[file.activityId]) {
                                    groupedFiles[file.activityId] = activityFiles;
                                }

                                if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1
                                ) {
                                    groupedFiles[file.activityId].physicalExam.push(file);
                                } else if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1
                                ) {
                                    groupedFiles[file.activityId].radio.push(file);
                                } else if (
                                    file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1
                                ) {
                                    groupedFiles[file.activityId].laboratory.push(file);
                                } else {
                                    groupedFiles[file.activityId].other.push(file);
                                }

                                // groupedFiles[file.activityId].push(file)
                            }
                        });

                        this.groupedFiles = AppUtils.cloneArray(groupedFiles);
                    }
                });
        }
    }

    trackId(index, item) {
        return item.id ? item.id : undefined;
    }

    trackText(index, item) {
        return item.text ? item.text : undefined;
    }

    toggleThisVisit(i) {
        this.visitsStates[i] = !this.visitsStates[i];
    }

    openThisVisit(i) {
        this.visitsStates[i] = true;
    }

    collapseAllVisits() {
        this.visits.map(o => {
            this.visitsStates[o.id] = false;
        });
    }

    expandAllVisits() {
        this.visits.map(o => {
            this.visitsStates[o.id] = true;
        });
    }

    toggleThisCondition(i, type) {
        this.conditionsStates[i] = !this.conditionsStates[i];
        if ((type === 'Condition') && (this.conditionsStates[i])) {
            this._store.dispatch(fromActions.loadMedicationsByCondition({ patientId: this.patient.id, conditionId: i }));
        }

        if ((type === 'Followup') && (this.conditionsStates[i])) {
            this._store.dispatch(fromActions.loadMedicationsByFollowup({ patientId: this.patient.id, followupId: i }));
        }

    }

    openThisCondition(i) {
        this.conditionsStates[i] = true;
    }

    collapseAllConditions(id) {
        const index = findIndex(this.conditions, function (o: any) {
            return o.id === id;
        });
        this.conditions[index].conditionsList.map(o => {
            this.conditionsStates[o.id] = false;
        });
    }

    expandAllConditions(id) {
        const index = findIndex(this.conditions, function (o: any) {
            return o.id === id;
        });
        this.conditions[index].conditionsList.map(o => {
            this.conditionsStates[o.id] = true;
        });
    }
    openThisConditionId(i, id, type) {
        
        this.panelOpenState = {};
        this.collapseAllConditions(i);
        this.toggleThisCondition(id, type);
        this.panelOpenState[i] = true;
      if (this.panelOpenState === {}) {
      this.showPanel = false;
      }
      else {
      this.showPanel = true;
      }
      this.TabIndex = 0;
    }

    ShowOrHideThisCondition(id,status)
    {
        
        let conditions: any[] = cloneDeepWith(this.patient.patientInfo.specialities.cardiology.conditions);
       
        let index = findIndex(conditions, function (o: any) {
            return o.id === id;
        });
        
        const condition = Object.assign({}, conditions[index]);
        if(status)
        condition.isHidden=true;
        else
        condition.isHidden=false;
        this._store.dispatch(fromActions.updateCardiologyCondition({ patientId: this.patient.id, condition: condition }));
       // this.sendXhrProcessor(condition);

    }
    ShowOrHideThisVisit(idCondition,status,id)
    {
        
        let conditions: any[] = cloneDeepWith(this.patient.patientInfo.specialities.cardiology.conditions);
       
        let index = findIndex(conditions, function (o: any) {
            return o.id === idCondition;
        });

        const condition = Object.assign({}, conditions[index]);     
        let indexVisit = findIndex(condition.activities.followups, function (o: any) {
            return o.id === id;
        });
        const visit = Object.assign({}, condition.activities.followups[indexVisit]);       
        if(status)
        visit.isHidden=true;
        else
        visit.isHidden=false;
        this._store.dispatch(fromActions.updateCardiologyFollowup({ patientId: this.patient.id, conditionId: idCondition,replacedConditionId:undefined,followup:visit }));
        //this.sendXhrProcessor(visit);

    }
    

    // private sendXhrProcessor(updatedCondition) {
   

    //         if (this.patient.id) {

    //             this._formUtilsService.formSaving();

    //             //const condition = Object.assign({}, updatedCondition);
    //             console.log('updatedCondition', updatedCondition);
    //             this._store.dispatch(fromActions.updateCardiologyCondition({ patientId: this.patient.id, condition: updatedCondition }));


    //         } else {
    //             console.error('[ERROR]:Couldn\'t find patient id.');
    //             this._formUtilsService.popup('An internal error occurred while updating.');

    //         }

         
    // }
    /**
     * ConditionsReformat
     *
     * @param {*} patient
     * @returns {*}
     * @memberof CardiologyConditionsComponent
     */
    ConditionsReformat(patient: Patient): any {
        let conditions: any[] = cloneDeepWith(patient.patientInfo.specialities.cardiology.conditions);

        let visits: Array<any> = [];

        flow(
            values,
            map(cnd => {
                // @ declare summary
                cnd.summary = {
                    followup: 0,
                    condition: 0,
                    operation: 0
                };

                // @ omit __typename if exist to avoid conflicts
                const obj = omit(cnd.activities, '__typename');

                cnd.conditionsList = flow(
                    map((activities: any[]) => {
                        // @ group activities by type
                        const summary = flow(
                            values,
                            groupBy('type')
                        )(activities);

                        // @ how many followups are found in this condition
                        if (summary.Followup) {
                            cnd.summary.followup = summary.Followup.length;
                        }

                        // @ how many operations are found in this condition
                        if (summary.Operation) {
                            cnd.summary.operation = summary.Operation.length;
                        }

                        //  if(summary.Condition)
                        //  o.summary.condition = summary.Condition.length

                        // @ For visits tab, we need conditionId for each activity
                        // @ if activities exist then push condition id to activity
                        if (activities.length) {
                            activities.map((activity, index) => {
                                activity['conditionId'] = cnd.id;

                                activities[index] = Object.assign(
                                    { conditionId: cnd.id },
                                    activity
                                );
                            });
                        }

                        return activities;
                    }),
                    flatten,
                    sortBy(['opened']),
                    reverse
                )(obj);

                // @ after combining all activities and current condition in conditionsList
                // @ push all these activities to visits
                // @ then, remove activities and conditionsList they are no more needed
                visits.push(...cnd.conditionsList, omit(cnd, ['activities', 'conditionsList']));

                // @ push the condition it self to list
                cnd.conditionsList.push(omit(cnd, ['activities', 'conditionsList']));
            })
        )(conditions);


        // @ Loop through conditions to calculate activities summary and sort by opened date
        // chain(conditions)
        //     .map(cnd => {
        //         // @ declare summary
        //         cnd.summary = {
        //             followup: 0,
        //             condition: 0,
        //             operation: 0
        //         };

        //         // @ omit __typename if exist to avoid conflicts
        //         let obj = omit(cnd.activities, "__typename");

        //         cnd.conditionsList = chain(obj)
        //             .map((activities: any[]) => {
        //                 // @ group activities by type
        //                 const summary = chain(activities)
        //                     .groupBy("type")
        //                     .value();

        //                 // @ how many followups are found in this condition
        //                 if (summary.Followup) {
        //                     cnd.summary.followup = summary.Followup.length;
        //                 }

        //                 // @ how many operations are found in this condition
        //                 if (summary.Operation) {
        //                     cnd.summary.operation = summary.Operation.length;
        //                 }

        //                 //  if(summary.Condition)
        //                 //  o.summary.condition = summary.Condition.length

        //                 // @ For visits tab, we need conditionId for each activity
        //                 // @ if activities exist then push condition id to activity
        //                 if (activities.length) {
        //                     activities.map((activity, index) => {
        //                         activity["conditionId"] = cnd.id;

        //                         activities[index] = Object.assign(
        //                             { conditionId: cnd.id },
        //                             activity
        //                         );
        //                     });
        //                 }

        //                 return activities;
        //             })
        //             .flatten()
        //             .sortBy(["opened"])
        //             .reverse()
        //             .value();

        //         // @ after combining all activities and current condition in conditionsList
        //         // @ push all these activities to visits
        //         // @ then, remove activities and conditionsList they are no more needed
        //         visits.push(...cnd.conditionsList, omit(cnd, ["activities", "conditionsList"]));

        //         // @ push the condition it self to list
        //         cnd.conditionsList.push(omit(cnd, ["activities", "conditionsList"]));
        //     })
        //     .value();

        // @ Visits were created before
        // visits = chain(visits)
        // .map(b => b)
        // .flatten()
        // .sortBy(["opened"])
        // .reverse()
        // .take(9)
        // .value();

        visits = flow(
            map(b => b),
            flatten,
            sortBy(['opened']),
            reverse,
            take(9),
        )(visits);

        // this._logger.log("Reformated Conditions > ", conditions);
        // this._logger.log("Reformated Visits > ", visits);

        // @ order conditions by latest activity
        conditions = orderBy(
            conditions,
            function (item) {
                const Dates = orderBy(item.conditionsList);

                // @ return latest activity to order condition by with
                return Dates[0].opened;
            },
            'desc'
        );

        return {
            conditions: conditions,
            visits: visits
        };
    }


    openDuplicateDialog(isDuplicate: boolean, patientId: string, speciality: string, activityType: string, conditionId: string, activityId?: string) {

        const data: IsMedicalActivityDuplicated = {
            patientId,
            speciality,
            activityType,
            conditionId,
            activityId,
            isDuplicate
        };

        const dialogRef = this.dialog.open(DuplicateMedicalActivityDialogComponent, {
            disableClose: true,
            height: '90vh',
            // minWidth: '320px',
            data: data,
        });

        dialogRef.afterClosed()
            .subscribe(result => {

                if (typeof result !== 'undefined' && result != null && result) {

                    // @ Update local patient model to fit data changes
                    const patient = remarkDuplicateActivityGqlCallback.updateActivityDupInPatient(this.patient as any, result);

                    if (patient) {
                        this.patient = Object.assign({}, patient);
                        this.prepareUIProcessor(false);
                    }
                }
            });

        return dialogRef;
    }


    confirmDelete(patientId: string, speciality: string, activityType: string, conditionId: string, activityId?: string) {

        const data: MedicalActivityArgs = {
            patientId,
            speciality,
            activityType,
            conditionId,
            activityId,
        };

        const args: ConfirmActionSheetArgs = {
            yes: 'I\'m sure want to delete this record.',
            no: 'No don\'t delete'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (typeof result !== 'undefined' && result) {
                this.deleteActivity(data);
            }
        });
    }

    private deleteActivity(data: MedicalActivityArgs) {

        this._deleteMedicalActivityGQL
            .mutate(
                data as any,
                {
                    optimisticResponse: deleteMedicalActivityGqlCallback.optimisticResponse(data),
                    update: (proxy, ev) => deleteMedicalActivityGqlCallback.update(proxy, ev, data)
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
                    let errors: any[] = [];
                    // @ errors exists
                    if (response.errors !== undefined && response.errors.length) {
                        errors = AppUtils.handleValidationGqlErrors(response.errors);
                    }

                    // @ found Validation errors
                    if (errors.length) {

                        this.snackBar.open('An error Occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }

                    // @ if errors 
                    return response.errors !== undefined && response.errors.length ? false : true;
                })
            ).subscribe((response) => {

                // @ Update local patient model to fit data changes
                const patient = deleteMedicalActivityGqlCallback.delectActivityInPatient(this.patient as any, data);

                if (patient) {
                    this.patient = Object.assign({}, patient);
                    this.prepareUIProcessor(false);

                    this.snackBar.open('Activity deleted.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000,
                    });
                }
            });
    }

}
