import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromActions from '@appStore/actions';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { Store } from '@ngrx/store';
import { Logger } from '@nsalaun/ng-logger';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'app/blocks/auth/auth.service';
import { AttachFilesService } from 'app/blocks/components/attach-files-dialog/attach-files.service';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import {
    CardiologyConditionBase,
    DataPartitionBase,
    LocationBase,
    MediaFileBase,
    MedicationBase,
} from 'app/blocks/graphql/generated/bases';
import { AppUtils } from 'app/blocks/utils';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { PatientService } from 'app/patients/patient.service';
import { environment } from 'environments/environment';
import findIndex from 'lodash/findIndex';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

import {
    LocationsGQL,
    LookupsByGroupsGQL,
    Patient,
    UpdateCardiologyConditionGQL,
} from '../../../../blocks/graphql/generated/gqlServices';
import { CardiologyActivityMediaFiles } from '../cardiologyActivityMediaFiles';
import {
    ActivityMediaFilesGQL,
    DeleteMediaFilesGQL,
    MediaFile,
    MediaFileInput,
    UpdateMediaFilesGQL,
} from './../../../../blocks/graphql/generated/gqlServices';

@Component({
    selector: 'edit-condition',
    templateUrl: './edit-condition.component.html',
    styleUrls: ['./edit-condition.component.scss']
})
export class CardiologyEditConditionComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild("mediaFlow", { static: false }) mediaFlow: FlowDirective


    // Private
    private _unsubscribeAll: Subject<any>;
    public patient: Patient;
    private savingDelay: number = 3000;

    public condition: CardiologyConditionBase = new CardiologyConditionBase()
    public onConditionChange: Subject<any>;
    public formStatus: string = null;
    public lookups: any = {};
    public errors = []
    public locations: LocationBase[] = [];
    public subLocations: string[] = [];

    public isDirty: boolean = false;

    public cheifComplaintControl = new FormControl('');
    public CardiologyClinicalExaminationControl = new FormControl('');
    public presentHistoryControl = new FormControl('');
    public physicalExamControl = new FormControl('');
    public otherTreatmentsControl = new FormControl('');
    public differentialDiagnosisControl = new FormControl('');
    public laboratoryControl = new FormControl('');
    public radioControl = new FormControl('');
    public consultationControl = new FormControl('');
    public diagnosisControl = new FormControl('');
    public noteControl = new FormControl('');
    public tenantId: string;
    public accessToken: string;
    public isRightMainMediaDisabled: boolean
    public isLeftMainMediaDisabled: boolean

    private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
    public activityFiles: CardiologyActivityMediaFiles = {}
    FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;
    public selectedRowSet: Set<any> = new Set();
    public mediaSelectMode = false;
    public isUploadPopupOpened = false;
    public mediaEndpoint: string;
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public imageFallback: string;

    constructor(
        private _updateCardiologyConditionGQL: UpdateCardiologyConditionGQL,
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _patientsService: PatientService,
        private _locationsGQL: LocationsGQL,
        private _apollo: Apollo,
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private _router: Router,
        private _logger: Logger,
        private _authService: AuthService,
        private _attachFilesService: AttachFilesService,
        private _activityMediaFilesGQL: ActivityMediaFilesGQL,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,
        private _queueFileUploaderService: QueueFileUploaderService,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,

    ) {

        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onConditionChange = new Subject();
        this.condition.opened = new Date();

        this.condition.type = 'Condition';
        this.condition.status = 'active';

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this.imageFallback = environment.imageFallback;
        this.setTenantId()

        this._store.dispatch(fromActions.loadLocations());

        // this._route.parent.parent.params
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe(params => {
        //    this._store.dispatch(fromActions.loadPatient({id:params["id"]}))
        // } );

    }

    ngOnInit() {
        // @ read patient id param then get patient then find condition
        // this._route.paramMap
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(params => {
        //         let id = params.get("id");

                // @ load current patient and assign condition
                //this._patientsService.onCurrentPatientChanged
                this._store.select(fromSelectors.selectedPatientSelector)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(response => {

                        if (response && response.data) {

                            this.patient = Object.assign({}, response.data);

                            if (this.patient.patientInfo.specialities.cardiology.conditions.length) {

                                let conditionIndex = findIndex(this.patient.patientInfo.specialities.cardiology.conditions, ['id', this.patient.id])

                                if (conditionIndex != -1) {

                                    this.condition.medications = AppUtils.resolveUniqMedications(this.condition, this.patient.patientInfo.specialities.cardiology.conditions[conditionIndex]) as MedicationBase[]
                                    // @ Clone condition 
                                    this.condition = AppUtils.DeepClone(this.patient.patientInfo.specialities.cardiology.conditions[conditionIndex])

                                    this.loadPatientMediaFiles();

                                    // @ update subLocation
                                    setTimeout(() => {
                                        this.onLocationChange(this.condition.location)
                                    }, 0);

                                } else {
                                    this._logger.error("[ERROR]: couldn't find condition");
                                }
                            } else {
                                this._logger.error("[ERROR]: couldn't find condition");
                            }
                        }
                    });
           // });


        this.activityMediaFiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files) => {
                this.activityFiles = this.rebuildMediaFiles(files);
                // this.activityFiles = AppUtils.cloneObject(files_)
            })

            // @ Catch when saved locally
this._store.select(fromSelectors.patientSavedLocallySelector)
.pipe(
    takeUntil(this._unsubscribeAll),
    filter(data => !!data)
 
)
.subscribe(_ => {

   this._formUtilsService.formSavedLocally();
   this._formUtilsService.popup('No internet access, Saved locally')
})

        // @ When a file was uploaded
        this._queueFileUploaderService.fileUploaded$.subscribe(mediaFile => {

            if (Object.keys(mediaFile).length > 0) {

                // @ Is the comming file related to this condition?
                let isRelatedFile = this.isRelatedFile(mediaFile)

                if (isRelatedFile) {

                    let files = this.activityMediaFiles$.value;

                    // @ Check if file is already exists localy 
                    let filesIndex = files.findIndex(obj => obj.id == mediaFile.id)

                    // @ If file doesn't exist then push file
                    if (filesIndex == -1) {
                        files.push(JSON.parse(JSON.stringify(mediaFile)))
                        this.activityMediaFiles$.next(files);
                    }
                }
            }
        })

 // @ load locations  
 this._store.select(fromSelectors.Locations)
 .pipe(takeUntil(this._unsubscribeAll))
 .subscribe(
     response => {
         if (response) {
             this.locations = response;
         }
     },
     error => {
         this._logger.error('[error]: ', error);
     }
 )
        // // @ load locations        
        // this._locationsGQL.watch()
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(
        //         (response) => {
        //             if (response.data && response.data.locations)
        //                 this.locations = response.data.locations;
        //         },
        //         (error) => {
        //             this._logger.error("[error]: ", error)
        //         }
        //     );
  // @ On Patient Load failure
  this._store.select(fromSelectors.error)
  .pipe(
      takeUntil(this._unsubscribeAll),
      filter(data => !!data)
  )
  .subscribe((errors) => 
  {
       // @ errors exists
       if (errors != undefined && errors.length)
       this.errors = AppUtils.handleValidationGqlErrors(errors)
        // @ found Validation errors
        if (this.errors.length) {
            this._formUtilsService.formValidationError()
            this._formUtilsService.popup('An error occurred'+ errors)
        
     }
     else if (errors)
                 // @ Unknown error
                 //this.onFormStatusChanged(this.formStatusEnum.error)
                 this._formUtilsService.formError();
                 this._logger.error(errors);
     
  }         
  )

   // @ On update General Condition 
   this._store.select(fromSelectors.updateCardiologyCondition)
   .pipe(
       takeUntil(this._unsubscribeAll),
       filter(data => !!data)
   )
   .subscribe(data => {   
       if(this.condition.id == data.id)            
       this.onUpdateCardiologyConditionCallback(data)
       
   })
        // @ Subscribe for form changes
        // this.form.valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data => {
        //         setTimeout(() => {
        //             if (this.form.dirty) {
        //                 this.onConditionChange.next(this.condition)
        //             }
        //         }, 0);

        //     })

            this.watchFormChangesProcessor()
            this.watchPatientChangesProcessor()
        // @ SEND REQUEST
        // this.onConditionChange
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
        //             this.form.form.markAsPristine()
        //         }),
        //         debounceTime(this.savingDelay),
        //     )
        //     .pipe(
        //         switchMap(x => {

        //             // @ Backend request
        //             if (this.condition.id && this.patient.id) {

        //                 this.onFormStatusChanged(this.formStatusEnum.saving)

        //                 let condition = Object.assign({}, this.condition);
        //                 return this._updateCardiologyConditionGQL.mutate(
        //                     { patientId: this.patient.id, condition: condition },
        //                     {
        //                         optimisticResponse: updateCardiologyConditionGqlCallback.optimisticResponse(condition),
        //                         update: (proxy, ev) => updateCardiologyConditionGqlCallback.update(proxy, ev, this.patient.id)
        //                     }
        //                 );
        //             }

        //         }),
        //         catchError((err, source) => {
        //             this.onFormStatusChanged(this.formStatusEnum.error);
        //             this._logger.error("[CATCH ERROR ]: ", err)
        //             this.snackBar.open("An error Occurred", 'CLOSE', {
        //                 panelClass: "m-24",
        //                 duration: 4000,
        //             });
        //             // @ Important to return source to avoid observable completion
        //             return source
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

        //             // @ Merge local condition with server response
        //             if (response.data.updateCardiologyCondition) {
        //                 this.errors = [];
        //                 AppUtils.SetFormPrestine(this.form);
        //                 // let condition = Object.assign({}, this.condition)
        //                 // this.condition.medications = AppUtils.resolveUniqMedications(this.condition, response.data.updateCardiologyCondition) as MedicationBase[]
        //                 // this.condition = AppUtils.mergeForForms(condition, response.data.updateCardiologyCondition)
        //                 // this.snackBar.open("Autosaved", 'CLOSE', {
        //                 //     panelClass: "m-24",
        //                 //     duration: 2000,
        //                 // })
        //                 this.isDirty = false;
        //             }
        //         },
        //         (err) => {
        //             console.error("[Error]: ", err)
        //         }
        //     );
    }

    ngAfterViewInit(): void {

        // @ observe location control and update subLocation
        setTimeout(() => {
            this.form.controls['location'].valueChanges.subscribe((value: any) => {
                this.onLocationChange(value);
            })
        }, 0);

        // @ Add file metadata to request (query)
        // @ File metadata were attached to each file via 'filesSubmitted' Event fn
        this.mediaFlow.flowJs.opts.query = function (file, chunk) {

            let queryObj = {
                id: file['id'],
                name: file['name'],
                patientId: file['patientId'],
                speciality: file['speciality'],
                conditionId: file['conditionId'],
                activityType: file['activityType'],
                activityId: file['activityId'],
                isDeleted: file['isDeleted'],
                type: file['type'],
                tags: file['tags'],
                systemTagging: file['systemTagging'],
            }

            return queryObj
        }

        // @ upload activity media
        this.mediaFlow.events$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {

                // @ prepare file metadata
                if (event.type === "filesSubmitted") {

                    // @ Get files list
                    const files: any = event.event[0]

                    // @ Clone 
                    let files_: FlowFile[] = Object.assign([], files)

                    if (!files_.length) return

                    files_.map((file, index) => {

                        // @ should be (image or pdf ) and condition id is set
                        let isValidFile = this.isValidFile(file)

                        // @ file is not valid then removefile
                        if (!isValidFile) {
                            this.mediaFlow.flowJs.removeFile(file)

                        } else {

                            file['id'] = AppUtils.GenerateObjectId()
                            file['name'] = AppUtils.GenerateObjectId() + "." + file.getExtension()
                            file["patientId"] = this.patient.id
                            file["speciality"] = SpecialityEnum.cardiology
                            file["conditionId"] = this.condition.id
                            file["activityType"] = ''
                            file["activityId"] = ''
                            file["isDeleted"] = false
                            file["type"] = file.file.type
                            file["tags"] = new DataPartitionBase()
                            file['systemTagging'] = [
                                FileSystemTagsEnum.cardiologySpeciality,
                                FileSystemTagsEnum.condition
                            ];

                            // @ push tags like (physicalexam, radio , lab ) to systemTags
                            if (event.event[1]) {

                                let event_ = event.event[1]
                                let element = event_.target

                                // @ case button add file clicked, the button hold the tag name
                                if (event_.type === 'change') {

                                    // @ physicalExam tag
                                    if (element && element.id === FileSystemTagsEnum.physicalExam)
                                        file['systemTagging'].push(FileSystemTagsEnum.physicalExam)

                                    // @ radio tag
                                    else if (element && element.id === FileSystemTagsEnum.radio)
                                        file['systemTagging'].push(FileSystemTagsEnum.radio)

                                    // @ laboratory tag
                                    else if (element && element.id === FileSystemTagsEnum.laboratory)
                                        file['systemTagging'].push(FileSystemTagsEnum.laboratory)
                                }


                                // @ case the file was dropped then handle the tag name
                                if (element && event_.type == 'drop') {

                                    // @ get the element that handle the tag name
                                    // let taggedElement = $(element).closest('.auto-tagged-file')
                                    // if (taggedElement.length) taggedElement = taggedElement[0]

                                    let taggedElement = element.closest('.auto-tagged-file')

                                    // @  physical exam tag
                                    if (taggedElement && taggedElement.id === FileSystemTagsEnum.physicalExam)
                                        file['systemTagging'].push(FileSystemTagsEnum.physicalExam)

                                    // @ radio  tag
                                    else if (taggedElement && taggedElement.id === FileSystemTagsEnum.radio)
                                        file['systemTagging'].push(FileSystemTagsEnum.radio)

                                    // // @ laboratory tag
                                    else if (taggedElement && taggedElement.id === FileSystemTagsEnum.laboratory)
                                        file['systemTagging'].push(FileSystemTagsEnum.laboratory)
                                }
                            }

                            if (event.event[1]) {
                                // this.mediaFlow.upload();
                                // this.isUploadPopupOpened = true                                
                                this._queueFileUploaderService.uploadFile(file)

                            }
                        }

                    })
                }

                // @ On Success
                if (event.type === "fileSuccess") {
                    if (event.event[0]) {
                        const file: any = event.event[0]
                        const file_ = file.file
                        const mediaFile = new MediaFileBase()

                        mediaFile.id = file.id || null
                        mediaFile.name = file.name || null
                        mediaFile.path = ''
                        mediaFile.size = file_.size || null
                        mediaFile.type = file_.type || null
                        mediaFile.patientId = file.patientId || null
                        mediaFile.speciality = file.speciality || null
                        mediaFile.conditionId = file.conditionId || null
                        mediaFile.activityType = file.activityType || null
                        mediaFile.activityId = file.activityId || null
                        mediaFile.isDeleted = false
                        mediaFile.systemTagging = file.systemTagging || []
                        mediaFile.tags = file.tags
                        mediaFile.isDeleted = false;

                        let files = this.activityMediaFiles$.value;
                        files.push(JSON.parse(JSON.stringify(mediaFile)))
                        this.activityMediaFiles$.next(files);


                        this.snackBar.open('File uploaded', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 3000
                        });

                        createMediaFileGqlCallback.update(
                            this._apollo.getClient().cache,
                            {
                                data: {
                                    createMediaFile: mediaFile
                                }
                            }
                        );
                    }
                }
            })
    }

    private watchFormChangesProcessor() {

        // @ Subscribe for form changes
        this.form.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
            setTimeout(() => {
                if (this.form.dirty)
                    this.onConditionChange.next(this.condition);
            }, 0);
        });
       }
    
       private watchPatientChangesProcessor() {     
        // @ SEND REQUEST
        this.onConditionChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(              
                filter(() => this._formUtilsService.isValid(this.form)),
                tap(ev => {
                    this._formUtilsService.formPending()
                    this.isDirty=true
                    //this.form.form.markAsPristine()
                }),
                debounceTime(this.savingDelay),
                tap(() => {
                    this.sendXhrProcessor();
                })
            )          
               
            .subscribe();
    }
    private onUpdateCardiologyConditionCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved()
       AppUtils.SetFormPrestine(this.form);
       this.condition.id = response.id;  
       this.isDirty = false;          
       this.condition = AppUtils.mergeForForms(this.condition, response);
}
    private sendXhrProcessor() {
        
        // @ Backend request
        if (this.condition.id) {
    
            if (this.patient.id) {
               
                this._formUtilsService.formSaving()
    
                let condition = Object.assign({}, this.condition);
                this._store.dispatch(fromActions.updateCardiologyCondition({patientId:this.patient.id, condition: condition}));
               
            } else {
                console.error("[ERROR]:Couldn't find patient id.")
                this._formUtilsService.popup('An internal error occurred while updating.')
               
            }
    
        } 
    }
    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // @ Handle Multi input data from mdc-input-component (Lookups)
    notifyHandler(eventData: outputDataEvent) {
        let modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.condition[eventData.modelName].text = eventData.data;
            // @ fire observable to send server request
            this.onConditionChange.next(this.condition);
        }
    }

    onLocationChange(value) {
        if (value.id) {
            let location = this.locations.filter(obj => obj.id === value.id)
            if (location.length) {
                this.subLocations = location[0].subLocations
                // @ subLocation is set and not related to the selected location then clear subLocation
                if (this.subLocations.indexOf(this.condition.subLocation) === -1)
                    this.condition.subLocation = ''
            }
        }
    }

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' &&
         typeof objTwo !== 'undefined' && 
         objOne != null && 
         objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any) {
        let modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.condition[eventData.modelName] = eventData.data
            // @ fire observable to send server request
            this.onConditionChange.next(this.condition);
        }
    }

    onDone() {

        this._router.navigate(['/patients', this.patient.id, 'cardiology']);

        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this._router.navigate(['/patients', this.patient.id, 'cardiology']);
        //     }
        // });
    }

    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true))
            this.onConditionChange.next(this.condition);
    }

    // @ update ui header form status : error , autosaved, pending , etc..
    onFormStatusChanged(status: string) {
        this.formStatus = status;
    }

    // ----------------
    //      MEDIA
    // ----------------

    loadPatientMediaFiles() {
        this._store.dispatch(fromActions.LoadPatientMediaFiles({
            id: this.patient.id,
            speciality: SpecialityEnum.cardiology,
            conditionId: this.condition.id,
            activitType: null,
            activityId: null
        }
        ));

        this._store.select(fromSelectors.mediaFiles)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)

            )
            .subscribe((response) => {
                let files = Object.assign([], response);
                this.activityMediaFiles$.next(files)
            })


        // this._activityMediaFilesGQL.watch({
        //     patientId: this.patient.id,
        //     speciality: SpecialityEnum.cardiology,
        //     conditionId: this.condition.id,
        // })
        //     .valueChanges
        //     .subscribe(response => {
        //         if (response.data && response.data.activityMediaFiles) {

        //             let files = Object.assign([], response.data.activityMediaFiles);
        //             this.activityMediaFiles$.next(files)

        //         }
        //     })
    }

    onAttachedFiles(event: MediaFileInput[]) {
        if (!event && !event.length)
            return

        let result = event
        this._store.dispatch(fromActions.UpdatePatientMediaFiles({
            mediaFiles: result
        }))

         // @ Update Media files success
         this._store.select(fromSelectors.updateMediaFiles)
         .pipe(
             takeUntil(this._unsubscribeAll),
             filter(data => !!data)

         )
         .subscribe((data) => {
             let updateMediaFiles: MediaFile[] = data;
             let files: MediaFile[] = this.activityMediaFiles$.value;
             if (updateMediaFiles.length) {

                 // @ we need to check if files was attached to another condition..
                 files.map((file) => {

                     // @ file still attached to this condition
                     if (file.patientId === this.patient.id &&
                         file.conditionId === this.condition.id) {
                         let index = files.findIndex(obj => obj.id == file.id)
                         if (index) files[index] = file
                     } else {
                         // @ file is moved to another location
                         files = files.filter(obj => obj.id != file.id)
                     }
                 })

                 this.activityMediaFiles$.next(files);
                 this._formUtilsService.popup('Files attached')


                 this.toggleViewMode();
             }

         })
        // this._updateMediaFilesGQL
        //     .mutate(
        //         {
        //             mediaFiles: result
        //         },
        //         {
        //             optimisticResponse: updateMediaFilesGqlCallback.optimisticResponse(
        //                 result
        //             ),
        //             update: (proxy, ev) =>
        //                 updateMediaFilesGqlCallback.update(proxy, ev)
        //         }
        //     )
        //     .subscribe(
        //         response => {
        //             if (response.data && response.data.updateMediaFiles) {
        //                 let updateMediaFiles: MediaFile[] = response.data.updateMediaFiles;
        //                 let files: MediaFile[] = this.activityMediaFiles$.value;

        //                 if (updateMediaFiles.length) {

        //                     // @ we need to check if files was attached to another condition..
        //                     files.map((file) => {

        //                         // @ file still attached to this condition
        //                         if (file.patientId === this.patient.id &&
        //                             file.conditionId === this.condition.id) {
        //                             let index = files.findIndex(obj => obj.id == file.id)
        //                             if (index) files[index] = file
        //                         } else {
        //                             // @ file is moved to another location
        //                             files = files.filter(obj => obj.id != file.id)
        //                         }
        //                     })

        //                     this.activityMediaFiles$.next(files);

        //                     this.snackBar.open('Files attached', 'CLOSE', {
        //                         panelClass: 'm-24',
        //                         duration: 3000
        //                     });

        //                     this.toggleViewMode();
        //                 }

        //             }
        //         },

        //         error => { }
        //     );
    }

    onDeleteSelectedFiles(event: string[]) {
        if (!event && !event.length)
            return

        let selectedFilesIds = event
        this._store.dispatch(fromActions.DeletePatientMediaFiles({
            id: selectedFilesIds
        }));

        // @ Delete Media files success
        this._store.select(fromSelectors.deletemediaFiles)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)

            )
            .subscribe((data) => {
                let ids: string[] = data;
                let files: MediaFile[] = this.activityMediaFiles$.value;
                if (ids && ids.length) {

                    // @ remove file from activityMediaFiles array
                    ids.map((id) => {
                        files = files.filter(obj => obj.id != id)
                    })

                    this.activityMediaFiles$.next(files)

                }
                this._formUtilsService.popup('Files deleted')
            })
        // this._deleteMediaFilesGQL
        //     .mutate(
        //         { id: selectedFilesIds },
        //         {
        //             optimisticResponse: deleteMediaFilesGqlCallback.optimisticResponse(
        //                 selectedFilesIds
        //             ),
        //             update: (proxy, ev) =>
        //                 deleteMediaFilesGqlCallback.update(proxy, ev)
        //         }
        //     )

        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe({
        //         next: response => {
        //             if (response.errors) {
        //                 const message =
        //                     response.errors[0].extensions.data.message;

        //                 this.snackBar.open(message, 'CLOSE', {
        //                     panelClass: 'm-24',
        //                     duration: 15000
        //                 });
        //             } else if (
        //                 response.data &&
        //                 response.data.deleteMediaFiles
        //             ) {

        //                 let ids: string[] = response.data.deleteMediaFiles;
        //                 let files: MediaFile[] = this.activityMediaFiles$.value;

        //                 if (ids && ids.length) {

        //                     // @ remove file from activityMediaFiles array
        //                     ids.map((id) => {
        //                         files = files.filter(obj => obj.id != id)
        //                     })

        //                     this.activityMediaFiles$.next(files)
        //                 }

        //                 this.snackBar.open('Files deleted', 'CLOSE', {
        //                     panelClass: 'm-24',
        //                     duration: 3000
        //                 });
        //             }
        //         },
        //         error: error => {
        //             console.error('[ERROR]: ', error);
        //         }
        //     });
    }

    toggleViewMode(): void {
        this.mediaSelectMode = !this.mediaSelectMode
        this.selectedRowSet.clear()
    }


    isValidFile(file: FlowFile): boolean {

        const fileType = file.file.type
        const isImage = AppUtils.RegexImage(fileType)
        let isValid: boolean = true


        if (!isImage && fileType !== "application/pdf") {
            this.snackBar.open(
                "Attention! only images and pdf files are allowed.",
                "CLOSE", { panelClass: "m-24", duration: 8000 }
            )
            isValid = false
        } else if (!this.condition.id) {
            this.snackBar.open(
                "Attention! fill the required fields to create the condition before trying to upload files. ",
                "CLOSE", { panelClass: "m-24", duration: 8000 }
            )

            isValid = false
        }

        if (!isValid)
            this.mediaFlow.flowJs.removeFile(file)

        return isValid
    }

    private isRelatedFile(mediafile: MediaFileBase) {
        // @ if mediafile contain an activityId.. then its not related
        if (mediafile.activityType || mediafile.activityId) return false

        if (
            mediafile.patientId == this.patient.id &&
            mediafile.speciality == SpecialityEnum.cardiology &&
            mediafile.conditionId == this.condition.id
        ) {
            return true
        }

        return false
    }

    rebuildMediaFiles(files: MediaFile[]): CardiologyActivityMediaFiles {

        let conditionFiles = <CardiologyActivityMediaFiles>{
            other: [],
            physicalExam: [],
            radio: [],
            laboratory: [],
        };

        if (!files || !files.length) return conditionFiles;

        files.map((file, index) => {

            if (file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1) {
                conditionFiles.physicalExam.push(file)
            }
            else if (file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1) {
                conditionFiles.radio.push(file)
            }
            else if (file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1) {
                conditionFiles.laboratory.push(file)
            }
            else {
                conditionFiles.other.push(file)
            }
        })

        return conditionFiles;

    }

    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId)
    }

}