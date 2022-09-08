

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
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { MedicationFormDialogService } from 'app/blocks/components/medication-form-dialog/medication-form-dialog.service';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { environment } from 'environments/environment';
import findIndex from 'lodash/findIndex';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';

import { DataPartitionBase, GeneralFollowupBase, LocationBase, MediaFileBase } from '../../../../blocks/graphql/generated/bases';
import {
    ActivityMediaFilesGQL,
    DeleteMediaFilesGQL,
    GeneralCondition,
    GeneralFollowup,
    LocationsGQL,
    LookupsByGroupsGQL,
    MediaFile,
    MediaFileInput,
    UpdateGeneralFollowupGQL,
    UpdateMediaFilesGQL,
} from '../../../../blocks/graphql/generated/gqlServices';
import { AppUtils } from '../../../../blocks/utils';
import { PatientService } from '../../../patient.service';
import { GeneralActivityMediaFiles } from '../generalActivityMediaFiles';
import { MedicationBase } from './../../../../blocks/graphql/generated/bases';
import { Patient } from './../../../../blocks/graphql/generated/gqlServices';


@Component({
    selector: 'edit-followup',
    templateUrl: './edit-followup.component.html',
    styleUrls: ['./edit-followup.component.scss']
})
export class EditFollowupComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild('mediaFlow', { static: false }) mediaFlow: FlowDirective;


    // Private
    private _unsubscribeAll: Subject<any>;
    // private patient: PatientBase;
    public patient: Patient;
    private savingDelay = 3000;
    private onFollowupChange: Subject<any>;
    private idParam$: Observable<any>;
    private queryParams$: Observable<any>;

    public formStatus: string = null;
    public patientConditions: any;
    public conditionId: string = null;
    public replacedConditionId: string;
    public isConditionIdSet = false;
    public followup: GeneralFollowupBase = new GeneralFollowupBase();
    public locations: LocationBase[] = [];
    public subLocations: string[] = []; public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;


    // @ Form Control
    public subjectiveControl = new FormControl('');
    public assessmentControl = new FormControl('');
    public physicalExamControl = new FormControl('');
    public otherTreatmentsControl = new FormControl('');
    public differentialDiagnosisControl = new FormControl('');
    public laboratoryControl = new FormControl('');
    public radioControl = new FormControl('');
    public consultationControl = new FormControl('');
    public diagnosisControl = new FormControl('');
    public noteControl = new FormControl('');
    public lookups: any = {};
    public selectedCondition: GeneralCondition = {};

    public selectedRowSet: Set<any> = new Set();
    public mediaSelectMode = false;
    public isUploadPopupOpened = false;
    public mediaEndpoint: string;
    public accessToken: string;
    public tenantId: string;
    private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
    public activityFiles: GeneralActivityMediaFiles = {};
    patientIdExist =false;
    FollowupId: string;
    ConditionIdFromUrl: string;
    PatientId: string;
    FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;

    constructor(
        private _updateGeneralFollowupGQL: UpdateGeneralFollowupGQL,
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _patientsService: PatientService,
        private _locationsGQL: LocationsGQL,
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private _router: Router,
        private _logger: Logger,
        private _authService: AuthService,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,
        private _activityMediaFilesGQL: ActivityMediaFilesGQL,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _apollo: Apollo,
        private _queueFileUploaderService: QueueFileUploaderService,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
        private _medicationFormDialogService: MedicationFormDialogService,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onFollowupChange = new Subject();

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this.setTenantId();

        this._route.parent.parent.params
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(params => {
            this.PatientId = params['id'];            
            
        } );
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params =>
                {
                    params.get('id');
                    this.FollowupId = params.get('id');
                    if(this.FollowupId === undefined) {
                    this.FollowupId = null;
                    }}
                    );
            

            this._route.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params =>
                    this.ConditionIdFromUrl = params.conditionId  
                    );
            

        // this._route.parent.parent.params
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(params => {
        //         this._store.dispatch(fromActions.loadPatient({ id: params["id"] }))
        //     });

        this._store.dispatch(fromActions.loadLocations());

             this._store.dispatch(fromActions.LoadPatientMediaFiles({
            id: this.PatientId,
            speciality: SpecialityEnum.general,
            conditionId: this.ConditionIdFromUrl,
            activitType: 'followup',
            activityId: this.FollowupId
        }
        ));
    }

    ngOnInit() {
        this.idParam$ = this._route.paramMap
        .pipe(takeUntil(this._unsubscribeAll))
        .pipe(
            map(params => params.get('id'))
        );

    this.queryParams$ = this._route.queryParams
        .pipe(takeUntil(this._unsubscribeAll));

        this.activityMediaFiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files) => {
                this.activityFiles = this.rebuildMediaFiles(files);
            });
             // @ Catch when saved locally
        this._store.select(fromSelectors.mediaFiles)
        .pipe(
            takeUntil(this._unsubscribeAll),
            filter(data => !!data)

        )
        .subscribe((response) => {
            const files = Object.assign([], response);
            this.activityMediaFiles$.next(files);
        });

        // @ When a file was uploaded
        this._queueFileUploaderService.fileUploaded$.subscribe(mediaFile => {

            if (Object.keys(mediaFile).length > 0) {

                // @ Is the comming file related to this condition?
                const isRelatedFile = this.isRelatedFile(mediaFile);

                if (isRelatedFile) {

                    const files = this.activityMediaFiles$.value;

                    // @ Check if file is already exists localy 
                    const filesIndex = files.findIndex(obj => obj.id === mediaFile.id);

                    // @ If file doesn't exist then push file
                    if (filesIndex === -1) {
                        files.push(JSON.parse(JSON.stringify(mediaFile)));
                        this.activityMediaFiles$.next(files);
                    }
                }
            }
        });
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
            );
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
        this._store.select(fromSelectors.error)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((errors) => {
                // @ errors exists
                if (errors !== undefined && errors.length) {
                    this.errors = AppUtils.handleValidationGqlErrors(errors);
                }
                // @ found Validation errors
                if (this.errors.length) {
                    this._formUtilsService.formValidationError();
                    this._formUtilsService.popup('An error occurred' + errors);

                }
                else if (errors) {
                    // @ Unknown error
                    // this.onFormStatusChanged(this.formStatusEnum.error)
                    this._formUtilsService.formError();
                     }
                this._logger.error(errors);

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

        // @ watch patient 

        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response && response.data) {
                    this.patient = Object.assign({}, response.data);
                    this.patientIdExist = true;
                    if (!this.isConditionIdSet) {
                        this.patientConditions = this.getPatientConditions();
                    }

                    // @ Wait for all observables
                    // @ Query params : patientId , conditionId
                    combineLatest(this.idParam$, this.queryParams$, (followupId, queryParams) => ({ followupId, queryParams }))
                        .subscribe(pair => {
                            const _followupId = pair.followupId;
                            const _conditionid = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;
                            this.conditionId = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;

                            const followup = this.getGeneralFollowup(_followupId, _conditionid);


                            this.followup.medications = AppUtils.resolveUniqMedications(this.followup, followup) as MedicationBase[];
                            this.followup = Object.assign({}, AppUtils.mergeForForms(this.followup, followup));

                            this.updateHeader();
                            
                            // this.loadPatientMediaFiles()

                            // @ update subLocation
                            setTimeout(() => {
                                this.onLocationChange(this.followup.location);
                            }, 0);

                        });
                }
            });
        // @ On update General Condition 
        this._store.select(fromSelectors.updateGeneralFollowup, { id: this.FollowupId })
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.followup.id) {
                this.onUpdateGeneralFollowupCallback(data);
                }

            });

        // this._patientsService.onCurrentPatientChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {
        //         if (response.data && response.data.patient) {
        //             this.patient = Object.assign({}, response.data.patient);


        //             if (!this.isConditionIdSet)
        //                 this.patientConditions = this.getPatientConditions();

        //             // @ Wait for all observables
        //             // @ Query params : patientId , conditionId
        //             combineLatest(this.idParam$, this.queryParams$, (followupId, queryParams) => ({ followupId, queryParams }))
        //                 .subscribe(pair => {
        //                     let _followupId = pair.followupId;
        //                     let _conditionid = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;
        //                     this.conditionId = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;

        //                     let followup = this._patientsService.getGeneralFollowup(_followupId, _conditionid)


        //                     this.followup.medications = AppUtils.resolveUniqMedications(this.followup, followup) as MedicationBase[]
        //                     this.followup = Object.assign({}, AppUtils.mergeForForms(this.followup, followup))

        //                     this.updateHeader()

        //                     this.loadPatientMediaFiles()

        //                     // @ update subLocation
        //                     setTimeout(() => {
        //                         this.onLocationChange(this.followup.location)
        //                     }, 0);

        //                 })
        // }
        // });
        this.watchFormChangesProcessor();
        this.watchPatientChangesProcessor();
        // @ Subscribe for form changes
        // this.form
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data => {
        //         setTimeout(() => {
        //             if (this.form.dirty) {
        //                 this.onFollowupChange.next(this.followup)
        //                 AppUtils.SetFormPrestine(this.form)
        //             }
        //         }, 0);

        //     });

        // @ SEND REQUEST 
        // this.onFollowupChange
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
        //             // this.isDirty = true;
        //         }),
        //         debounceTime(this.savingDelay),
        //     )
        //     .pipe(
        //         switchMap(x => {

        //             // @ Backend request
        //             if (this.followup.id) {

        //                 if (this.conditionId && this.patient.id) {

        //                     this.onFormStatusChanged(this.formStatusEnum.saving)

        //                     let followup = Object.assign({}, this.followup);
        //                     return this._updateGeneralFollowupGQL.mutate(
        //                         { patientId: this.patient.id, conditionId: this.conditionId, replacedConditionId: this.replacedConditionId, followup: followup },
        //                         {
        //                             optimisticResponse: updateGeneralFollowupGqlCallback.optimisticResponse(followup),
        //                             update: (proxy, ev) => updateGeneralFollowupGqlCallback.update(proxy, ev, this.patient.id, this.conditionId, this.replacedConditionId)
        //                         }
        //                     );
        //                 } else {
        //                     console.error("[ERROR]: Condition id or patient id is missing.")
        //                     this.snackBar.open("An internal error occurred, couldn't save followup.", 'CLOSE', {
        //                         panelClass: "m-24",
        //                         duration: 4000,
        //                     });
        //                 }
        //             } else {
        //                 this.onFormStatusChanged(this.formStatusEnum.error);
        //                 this._logger.error("[ERROR]: Couldn't find followup id")
        //             }
        //         }),
        //         catchError((err, source) => {
        //             this.onFormStatusChanged(this.formStatusEnum.error);
        //             this._logger.error("[CATCH ERROR]: ", err)
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
        //             this.errors = [];


        //             if (response.data.updateGeneralFollowup) {
        //                 this.isDirty = false;
        //                 this.replacedConditionId = undefined;
        //                 AppUtils.SetFormPrestine(this.form);
        //                 // let followup = Object.assign({}, this.followup)
        //                 // this.followup.medications = AppUtils.resolveUniqMedications(this.followup, response.data.updateGeneralFollowup) as MedicationBase[]
        //                 // this.followup = AppUtils.mergeForForms(followup, response.data.updateGeneralFollowup)


        //                 if (this.followup.name! === response.data.updateGeneralFollowup.name)
        //                     this.followup.name = response.data.updateGeneralFollowup.name

        //                 // this.snackBar.open("Autosaved", 'CLOSE', {
        //                 //     panelClass: "m-24",
        //                 //     duration: 2000,
        //                 // })

        //             }
        //         },
        //         (err) => {
        //             this._logger.error("[ERROR]: ", err)
        //         });
    }

    ngAfterViewInit(): void {

        // @ observe location control and update subLocation
        setTimeout(() => {
            this.form.controls['location'].valueChanges.subscribe((value: any) => {
                this.onLocationChange(value);
            });
        }, 0);

        // @ Add file metadata to request (query)
        // @ File metadata were attached to each file via 'filesSubmitted' Event fn
        this.mediaFlow.flowJs.opts.query = function (file, chunk) {

            const queryObj = {
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
            };

            return queryObj;
        };

        // @ upload activity media
        this.mediaFlow.events$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {

                // @ prepare file metadata
                if (event.type === 'filesSubmitted') {

                    // @ Get files list
                    const files: any = event.event[0];

                    // @ Clone 
                    const files_: FlowFile[] = Object.assign([], files);

                    if (!files_.length) { return; }

                    files_.map((file, index) => {

                        // @ should be (image or pdf ) and condition id is set
                        const isValidFile = this.isValidFile(file);

                        // @ file is not valid then removefile
                        if (!isValidFile) {
                            this.mediaFlow.flowJs.removeFile(file);

                        } else {

                            file['id'] = AppUtils.GenerateObjectId();
                            file['name'] = AppUtils.GenerateObjectId() + '.' + file.getExtension();
                            file['patientId'] = this.patient.id;
                            file['speciality'] = SpecialityEnum.general;
                            file['conditionId'] = this.conditionId;
                            file['activityType'] = 'followup';
                            file['activityId'] = this.followup.id;
                            file['isDeleted'] = false;
                            file['type'] = file.file.type;
                            file['tags'] = new DataPartitionBase();
                            file['systemTagging'] = [
                                FileSystemTagsEnum.generalSpeciality,
                                FileSystemTagsEnum.followup
                            ];

                            // @ push tags like (physicalexam, radio , lab ) to systemTags
                            if (event.event[1]) {

                                const event_ = event.event[1];
                                const element = event_.target;

                                // @ case button add file clicked, the button hold the tag name
                                if (event_.type === 'change') {

                                    // @ physicalExam tag
                                    if (element && element.id === FileSystemTagsEnum.physicalExam) {
                                        file['systemTagging'].push(FileSystemTagsEnum.physicalExam);
                                    }

                                    // @ radio tag
                                    else if (element && element.id === FileSystemTagsEnum.radio) {
                                        file['systemTagging'].push(FileSystemTagsEnum.radio);
                                         }

                                    // @ laboratory tag
                                    else if (element && element.id === FileSystemTagsEnum.laboratory) {
                                        file['systemTagging'].push(FileSystemTagsEnum.laboratory);
                                         }
                                }


                                // @ case the file was dropped then handle the tag name
                                if (element && event_.type === 'drop') {

                                    // @ get the element that handle the tag name
                                    // let taggedElement = $(element).closest('.auto-tagged-file')
                                    // if (taggedElement.length) taggedElement = taggedElement[0]

                                    const taggedElement = element.closest('.auto-tagged-file');

                                    // @  physical exam tag
                                    if (taggedElement && taggedElement.id === FileSystemTagsEnum.physicalExam) {
                                        file['systemTagging'].push(FileSystemTagsEnum.physicalExam);
                                    }

                                    // @ radio  tag
                                    else if (taggedElement && taggedElement.id === FileSystemTagsEnum.radio) {
                                        file['systemTagging'].push(FileSystemTagsEnum.radio);
                                         }

                                    // // @ laboratory tag
                                    else if (taggedElement && taggedElement.id === FileSystemTagsEnum.laboratory) {
                                        file['systemTagging'].push(FileSystemTagsEnum.laboratory);
                                         }
                                }
                            }

                            if (event.event[1]) {
                                // this.mediaFlow.upload();
                                // this.isUploadPopupOpened = true
                                this._queueFileUploaderService.uploadFile(file);
                            }
                        }

                    });
                }

                // @ NO MORE REQUIRED
                // @ NO MORE REQUIRED
                // @ NO MORE REQUIRED
                // @ On Success
                if (event.type === 'fileSuccess') {
                    if (event.event[0]) {
                        const file: any = event.event[0];
                        const file_ = file.file;
                        const mediaFile = new MediaFileBase();

                        mediaFile.id = file.id || null;
                        mediaFile.name = file.name || null;
                        mediaFile.path = '';
                        mediaFile.size = file_.size || null;
                        mediaFile.type = file_.type || null;
                        mediaFile.patientId = file.patientId || null;
                        mediaFile.speciality = file.speciality || null;
                        mediaFile.conditionId = file.conditionId || null;
                        mediaFile.activityType = file.activityType || null;
                        mediaFile.activityId = file.activityId || null;
                        mediaFile.isDeleted = false;
                        mediaFile.systemTagging = file.systemTagging || [];
                        mediaFile.tags = file.tags;

                        const files = this.activityMediaFiles$.value;
                        files.push(JSON.parse(JSON.stringify(mediaFile)));
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
            });


    }


    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.onFollowupChange.next();
        this.onFollowupChange.complete();
        this.patient = null;
    }
    newMedication() {
        if (this.followup.id) {
        this._medicationFormDialogService.openDialog({ action: 'new', patientId: this.patient.id, conditionId: this.conditionId, followupId: this.followup.id });
        }
        else {
        this._formUtilsService.popup('Missing Required Fields');
        }
    }

    private watchFormChangesProcessor() {

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onFollowupChange.next(this.followup);
                    }
                }, 0);
            });
    }

    private watchPatientChangesProcessor() {
        // @ SEND REQUEST
        this.onFollowupChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                filter(() => this._formUtilsService.isValid(this.form)),
                tap(ev => {
                    this._formUtilsService.formPending();
                    this.isDirty = true;
                    // this.form.form.markAsPristine()
                }),
                debounceTime(this.savingDelay),
                tap(() => {
                    this.sendXhrProcessor();
                })
            )

            .subscribe();
    }
    private sendXhrProcessor() {

        // @ Backend request
        if (this.followup.id) {

            if (this.conditionId && this.patient.id) {

                this._formUtilsService.formSaving();

                const followup = Object.assign({}, this.followup);
                this._store.dispatch(fromActions.updateGeneralFollowup({ patientId: this.patient.id, conditionId: this.conditionId, replacedConditionId: this.replacedConditionId, followup: followup }));
               

            } else {
                console.error('[ERROR]:Condition id or patient id is missing.');
                this._formUtilsService.popup('An internal error Occurred, couldn\'t save operation.');

            }

        }
    }
    private onUpdateGeneralFollowupCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        this.replacedConditionId = undefined;
        AppUtils.SetFormPrestine(this.form);
        if (this.followup.name! === response.name) {
            this.followup.name = response.name;
        }
        this.isDirty = false;

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onLocationChange(value) {
        if (value.id) {
            const location = this.locations.filter(obj => obj.id === value.id);
            if (location.length) {
                this.subLocations = location[0].subLocations;
                // @ subLocation is set and not related to the selected location then clear subLocation
                if (this.subLocations.indexOf(this.followup.subLocation) === -1) {
                    this.followup.subLocation = '';
                }
            }
        }
    }

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            this.followup[eventData.modelName].text = eventData.data;
            this.onFollowupChange.next(this.followup);
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any) {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated 
            this.followup[eventData.modelName] = eventData.data;
            // @ fire observable to send server request
            this.onFollowupChange.next(this.followup);
        }
    }

    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {
            this.onFollowupChange.next(this.followup);
        }
    }

    onDone() {

        this._router.navigate(['/patients', this.patient.id, 'general']);

        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this._router.navigate(['/patients', this.patient.id, 'general']);
        //     }
        // });
    }

    onFormStatusChanged(status: string) {
        this.formStatus = status;
    }

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

    generatFollowupName(): string {
        const condition = this.patient.patientInfo.specialities.general.conditions.find(obj => obj.id === this.conditionId);
        const followupLength = condition.activities.followups.length;
        if (condition && condition.activities && condition.activities.followups.length) {
            const followupLength = condition.activities.followups.length;
            return 'followup ' + (followupLength + 1).toString();
        } else {
            return 'followup ' + '1';
        }
    }

    beforeBackEndRequest(patient: any, followup: any) {
        if (followup.id) {

            if (this.replacedConditionId) {
                patient = this.moveToOtherCondition(patient, followup, this.conditionId, this.replacedConditionId);
            }

            const conditionId = this.conditionId;

            // @ Get condition index
            const conditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
            // @ Get followup index
            const followupIndex = findIndex(patient.specialities.general.conditions[conditionIndex].activities.followups, { id: followup.id });
            // @ update followup
            patient.specialities.general.conditions[conditionIndex].activities.followups[followupIndex] = followup;
            return patient;
        } else {
            const conditionId = this.conditionId;
            followup.id = AppUtils.GenerateObjectId();
            // @ Get condition index
            const conditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
            // @ push followup to selected condition
            patient.specialities.general.conditions[conditionIndex].activities.followups.push(followup);
            return patient;
        }
    }

    /**
     * Removes the followup from the old selected condition and push it for 
     * other condition
     * 
     * @param {any} patient 
     * @param {any} followup 
     * @param {any} conditionId 
     * @param {any} replacedConditionId 
     * 
     * @memberOf NewFollowupComponent
     */
    moveToOtherCondition(patient, followup, conditionId, replacedConditionId): any {
        // @ Remove the followup from old condition
        const ReplacedConditionIndex = findIndex(patient.specialities.general.conditions, { id: replacedConditionId });
        const ReplacedfollowupIndex = findIndex(patient.specialities.general.conditions[ReplacedConditionIndex].activities.followups, { id: followup.id });
        patient.specialities.general.conditions[ReplacedConditionIndex].activities.followups.splice(ReplacedfollowupIndex, 1);

        // @ Add followup to selected condition 
        const ConditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
        patient.specialities.general.conditions[ConditionIndex].activities.followups.push(followup);

        this.replacedConditionId = undefined;
        return patient;
    }

    getPatientConditions(): Array<any> {

        if (this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.general &&
            this.patient.patientInfo.specialities.general.conditions.length) {

            const conditions: any[] = [];
            this.patient.patientInfo.specialities.general.conditions.map((condition) => {
                conditions.push({ id: condition.id, name: condition.name, date: condition.opened, diagnosis: condition.diagnosis });
            });

            return conditions;
        }
    }

    onConditionChanged(value) {
        if (value !== this.conditionId) {
            this.replacedConditionId = this.conditionId;
        }

        this.conditionId = value;
        // @ condition changed then regenerate followup name under the new condition
        this.followup.name = this.generatFollowupName();
        this.updateHeader();

        // @ todo : very !important  update file condition id if condition is changed


    }

    updateHeader() {
        if (!this.conditionId || !this.patient) {
            return;
        }

        const patientConditions = this.getPatientConditions();
        if (patientConditions && patientConditions.length) {
            const conditionIdx = patientConditions.findIndex(cond => cond.id === this.conditionId);
            if (conditionIdx > -1) {
                this.selectedCondition = patientConditions[conditionIdx];
            }
        }
    }

    // ----------------
    //      MEDIA
    // ----------------

    loadPatientMediaFiles() {

        // this._store.dispatch(fromActions.LoadPatientMediaFiles({
        //     id: this.patient.id,
        //     speciality: SpecialityEnum.general,
        //     conditionId: this.conditionId,
        //     activitType: 'followup',
        //     activityId: this.followup.id
        // }
        // ));
       
        // this._activityMediaFilesGQL.watch({
        //     patientId: this.patient.id,
        //     speciality: SpecialityEnum.general,
        //     conditionId: this.conditionId,
        //     activitType: 'followup',
        //     activityId: this.followup.id
        // })
        //     .valueChanges
        //     .subscribe(response => {
        //         if (response.data && response.data.activityMediaFiles) {

        //             let files = Object.assign([], response.data.activityMediaFiles);

        //             this.activityMediaFiles$.next(files)

        //         }
        //     })
    }

    onDeleteSelectedFiles(event: string[]) {
        if (!event && !event.length) {
            return;
        }

        const selectedFilesIds = event;
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
                const ids: string[] = data;
                let files: MediaFile[] = this.activityMediaFiles$.value;
                if (ids && ids.length) {

                    // @ remove file from activityMediaFiles array
                    ids.map((id) => {
                        files = files.filter(obj => obj.id !== id);
                    });

                    this.activityMediaFiles$.next(files);

                }
                this._formUtilsService.popup('Files deleted');
            });
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

    onAttachedFiles(event: MediaFileInput[]) {
        if (!event && !event.length) {
            return;
        }

        const result = event;
        this._store.dispatch(fromActions.UpdatePatientMediaFiles({
            mediaFiles: result
        }));
        // @ Update Media files success
        this._store.select(fromSelectors.updateMediaFiles)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)

            )
            .subscribe((data) => {
                const updateMediaFiles: MediaFile[] = data;
                let files: MediaFile[] = this.activityMediaFiles$.value;
                if (updateMediaFiles.length) {

                    // @ we need to check if files was attached to another condition..
                    files.map((file) => {

                        // @ file still attached to this condition
                        if (file.patientId === this.patient.id &&
                            file.conditionId === this.followup.id) {
                            const index = files.findIndex(obj => obj.id === file.id);
                            if (index) { files[index] = file; }
                        } else {
                            // @ file is moved to another location
                            files = files.filter(obj => obj.id !== file.id);
                        }
                    });

                    this.activityMediaFiles$.next(files);
                    this._formUtilsService.popup('Files attached');


                    this.toggleViewMode();
                }

            });

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

        //                         // @ if file still attached to this followup
        //                         if (file.patientId === this.patient.id &&
        //                             file.conditionId === this.followup.id) {
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

    rebuildMediaFiles(files: MediaFile[]): GeneralActivityMediaFiles {

        const conditionFiles = <GeneralActivityMediaFiles>{
            other: [],
            physicalExam: [],
            radio: [],
            laboratory: [],
        };

        if (!files || !files.length) { return conditionFiles; }


        files.map((file, index) => {

            if (file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1) {
                conditionFiles.physicalExam.push(file);
            }

            else if (file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1) {
                conditionFiles.radio.push(file);
                 }

            else if (file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1) {
                conditionFiles.laboratory.push(file);
                 }

            else {
                conditionFiles.other.push(file);
                 }
        });

        return conditionFiles;

    }


    toggleViewMode(): void {
        this.mediaSelectMode = !this.mediaSelectMode;
        this.selectedRowSet.clear();
    }

    isValidFile(file: FlowFile): boolean {

        const fileType = file.file.type;
        const isImage = AppUtils.RegexImage(fileType);
        let isValid = true;


        if (!isImage && fileType !== 'application/pdf') {
            this.snackBar.open(
                'Attention! only images and pdf files are allowed.',
                'CLOSE', { panelClass: 'm-24', duration: 8000 }
            );
            isValid = false;
        } else if (!this.followup.id) {
            this.snackBar.open(
                'Attention! fill the required fields to create the followup before trying to upload files. ',
                'CLOSE',
                {
                    panelClass: 'm-24',
                    duration: 8000
                }
            );

            isValid = false;
        } else if (!this.conditionId) {
            this.snackBar.open(
                'Attention! select condition selected to upload files. ',
                'CLOSE',
                {
                    panelClass: 'm-24',
                    duration: 8000
                }
            );
            isValid = false;
        }

        if (!isValid) {
            this.mediaFlow.flowJs.removeFile(file);
        }

        return isValid;
    }

    private isRelatedFile(mediafile: MediaFileBase) {
        // @ if mediafile contain an activityId.. then its not related
        if (!mediafile.activityType || !mediafile.activityId) { return false; }

        if (
            mediafile.patientId === this.patient.id &&
            mediafile.speciality === SpecialityEnum.general &&
            mediafile.activityId === this.followup.id
        ) {
            return true;
        }

        return false;
    }
    getGeneralFollowup(
        followupId: string,
        conditionId: string
    ): GeneralFollowup | null {
        if (!this.patient) { return null; }

        if (
            this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.general &&
            this.patient.patientInfo.specialities.general.conditions.length
        ) {
            if (!this.patient) {
                this._logger.error('[Warning]: couldn\'t find patient');
                return null;
            }

            const conditionIndex = findIndex(
                this.patient.patientInfo.specialities.general.conditions,
                ['id', conditionId]
            );
            if (conditionIndex === -1) {
                this._logger.error('[Warning]: couldn\'t find condition');
                return null;
            }

            const condition: GeneralCondition = this.patient.patientInfo.specialities.general
                .conditions[conditionIndex];

            const followupIndex = findIndex(condition.activities.followups, [
                'id',
                followupId
            ]);
            if (followupIndex === -1) {
                this._logger.error('[Warning]: couldn\'t find followup');
                return null;
            }

            const followup: GeneralFollowup =
                condition.activities.followups[followupIndex];

            return followup;
        }
    }

    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId);
    }
}
