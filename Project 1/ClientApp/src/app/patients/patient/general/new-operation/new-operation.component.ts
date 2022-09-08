import {  Patient } from './../../../../blocks/graphql/generated/gqlServices';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { Subject, BehaviorSubject } from 'rxjs';

import { debounceTime, takeUntil, tap, filter } from 'rxjs/operators';
import {
    CreateGeneralOperationGQL,
    GeneralCondition,
    LocationsGQL,
    LookupsByGroupsGQL,
    UpdateGeneralOperationGQL,
    MediaFile,
    ActivityMediaFilesGQL,
    UpdateMediaFilesGQL,
    DeleteMediaFilesGQL,
    MediaFileInput
} from '../../../../blocks/graphql/generated/gqlServices';
import { GeneralOperationBase, MediaFileBase, DataPartitionBase, LocationBase } from './../../../../blocks/graphql/generated/bases';
import { AppUtils } from './../../../../blocks/utils';
import { PatientService } from './../../../patient.service';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { Apollo } from 'apollo-angular';
import { GeneralActivityMediaFiles } from '../generalActivityMediaFiles';
import { AuthService } from 'app/blocks/auth/auth.service';
import { environment } from 'environments/environment';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { FlowFile, FlowDirective } from '@flowjs/ngx-flow';
import findIndex from 'lodash/findIndex';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';

@Component({
    selector: 'new-operation',
    templateUrl: './new-operation.component.html',
    styleUrls: ['./new-operation.component.scss']
})
export class NewOperationComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild('mediaFlow', { static: false }) mediaFlow: FlowDirective;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    codeCtrl = new FormControl();

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;
    private onOperationChange: Subject<any>;
    public patient: Patient;
    // public patient: PatientBase
    public operation: GeneralOperationBase = new GeneralOperationBase();
    public locations: LocationBase[] = [];
    public subLocations: string[] = [];
    public formStatus: string = null;
    public patientConditions: any;
    public conditionId: string = null;
    public replacedConditionId: string;
    public isConditionIdSet = false;
    public departments = ['OR', 'ER', 'Clinic'];
    public lookups: any = {};
    public isDirty = false;

    // @ Form Control
    public anesthesiaControl = new FormControl('');
    public operationTypeControl = new FormControl('');
    public operationPerformedControl = new FormControl('');
    public operationPostDiagnosisControl = new FormControl('');
    public diagnosisControl = new FormControl('');
    public operationPreFindingsControl = new FormControl('');
    public selectedCondition: GeneralCondition = {};

    public selectedRowSet: Set<any> = new Set();
    public mediaSelectMode = false;
    public isUploadPopupOpened = false;
    public mediaEndpoint: string;
    public accessToken: string;
    public tenantId: string;
    private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
    public activityFiles: GeneralActivityMediaFiles = {};
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;


    public codes = [
        { code: 'A1234', description: 'Truma 1' },
        { code: 'A7890', description: 'Truma 2' }
    ];

    constructor(
        private _createGeneralOperationGQL: CreateGeneralOperationGQL,
        private _updateGeneralOperationGQL: UpdateGeneralOperationGQL,
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _patientsService: PatientService,
        private _locationsGQL: LocationsGQL,
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
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

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onOperationChange = new Subject();

        this.operation.opened = new Date();
        this.operation.type = 'Operation';

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this.setTenantId();
        this._store.dispatch(fromActions.loadLocations());

        //     this._store.dispatch(fromActions.LoadPatientMediaFiles({
        //         id: this.patient.id,
        //      speciality: SpecialityEnum.general,
        //      conditionId: this.conditionId,
        //      activitType: 'operation',
        // activityId:this.operation.id
        // }));
    }

    ngOnInit() {

        this.activityMediaFiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files) => {
                this.activityFiles = this.rebuildMediaFiles(files);
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

        // // @ load locations
        // this._locationsGQL
        //     .watch()
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(
        //         (response) => {
        //             if (response.data && response.data.locations)
        //                 this.locations = response.data.locations;
        //         },
        //         (error) => {
        //             this._logger.error("[ERROR]: ", error)
        //         }
        //     );

        // @ On Patient Load failure
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

        this._route.queryParams.pipe(
            filter(params => params.conditionId))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const conditionId = params.conditionId;
                if (conditionId) {
                    this.conditionId = conditionId;
                    this.isConditionIdSet = true;
                }
            });

        // // @ Catch when saved locally
        // this._store.select(fromSelectors.mediaFiles)
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         filter(data => !!data)

        //     )
        //     .subscribe((response) => {
        //         let files = Object.assign([], response);
        //         this.activityMediaFiles$.next(files)
        //     })

        // @ On create General Condition 
        this._store.select(fromSelectors.createGeneralOperation)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.operation.id) {
                    this.onCreateGeneralOperationCallback(data);
                }
                // @ On update General Condition 
                this.onUpdateGeneralOperation();
            });

        // @ watch patient 

        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response && response.data) {
                    this.patient = Object.assign({}, response.data);
                    if (!this.isConditionIdSet) {
                        this.patientConditions = this.getPatientConditions();
                    }


                    this.updateHeader();

                    // this.predictDiagnosis()

                    // this.loadPatientMediaFiles()            

                }
            });
        // this._patientsService.onCurrentPatientChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {
        //         if (response.data && response.data.patient) {

        //             this.patient = Object.assign({}, response.data.patient);

        //             if (!this.isConditionIdSet)
        //                 this.patientConditions = this.getPatientConditions();

        //             this.updateHeader()

        //             this.predictDiagnosis()

        //             this.loadPatientMediaFiles()
        //         }
        //     });



        this.watchFormChangesProcessor();
        this.watchPatientChangesProcessor();

        // // @ Subscribe for form changes
        // this.form
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data => {
        //         setTimeout(() => {
        //             if (this.form.dirty)
        //                 this.onOperationChange.next(this.operation)
        //         }, 0);
        //     });

        // @ SEND REQUEST 
        // this.onOperationChange
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
        //             this.onFormStatusChanged(this.formStatusEnum.pending)
        //             this.form.form.markAsPristine()
        //             // this.isDirty = true;
        //         }),
        //         debounceTime(this.savingDelay),
        //     )
        //     .pipe(
        //         switchMap(x => {

        //             // @ Backend request
        //             if (this.operation.id) {

        //                 if (this.conditionId && this.patient.id) {

        //                     this.onFormStatusChanged(this.formStatusEnum.saving)

        //                     let operation = Object.assign({}, this.operation);
        //                     return this._updateGeneralOperationGQL.mutate(
        //                         { patientId: this.patient.id, conditionId: this.conditionId, replacedConditionId: this.replacedConditionId, operation: operation },
        //                         {
        //                             optimisticResponse: updateGeneralOperationGqlCallback.optimisticResponse(operation),
        //                             update: (proxy, ev) => updateGeneralOperationGqlCallback.update(proxy, ev, this.patient.id, this.conditionId, this.replacedConditionId)
        //                         }
        //                     );
        //                 } else {
        //                     console.error("[ERROR]: Condition id or patient id is missing.")
        //                     this.snackBar.open("An internal error Occurred, couldn't save operation.", 'CLOSE', {
        //                         panelClass: "m-24",
        //                         duration: 4000,
        //                     });
        //                 }

        //             } else {

        //                 this.onFormStatusChanged(this.formStatusEnum.saving)

        //                 this.operation.id = AppUtils.GenerateObjectId()
        //                 let operation = Object.assign({}, this.operation);

        //                 return this._createGeneralOperationGQL.mutate(
        //                     { patientId: this.patient.id, conditionId: this.conditionId, operation: operation },
        //                     {
        //                         optimisticResponse: createGeneralOperationGqlCallback.optimisticResponse(operation),
        //                         update: (proxy, ev) => createGeneralOperationGqlCallback.update(proxy, ev, this.patient.id, this.conditionId)
        //                     }
        //                 );
        //             }

        //         }),
        //         catchError((err, source) => {
        //             this.onFormStatusChanged(this.formStatusEnum.error)
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

        //             this.onFormStatusChanged(this.formStatusEnum.saved)

        //             if (response.data.createGeneralOperation) {
        //                 this.errors = [];
        //                 this.replacedConditionId = undefined;
        //                 AppUtils.SetFormPrestine(this.form);
        //                 let operation = Object.assign({}, this.operation)
        //                 this.operation = AppUtils.deepMergeWith(operation, response.data.createGeneralOperation)
        //                 this.snackBar.open("Operation created", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 2000,
        //                 })
        //                 this.isDirty = false;
        //             }

        //             else if (response.data.updateGeneralOperation) {
        //                 this.errors = [];
        //                 this.replacedConditionId = undefined;
        //                 AppUtils.SetFormPrestine(this.form);
        //                 let operation = Object.assign({}, this.operation)
        //                 this.operation = AppUtils.deepMergeWith(operation, response.data.updateGeneralOperation)
        //                 // this.snackBar.open("Operation updated", 'CLOSE', {
        //                 //     panelClass: "m-24",
        //                 //     duration: 2000,
        //                 // })
        //                 this.isDirty = false;
        //             }
        //         },
        //         (err) => {
        //             this.onFormStatusChanged('error')
        //             this._logger.error("[ERROR ]: ", err)

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
                            file['activityType'] = 'operation';
                            file['activityId'] = this.operation.id;
                            file['isDeleted'] = false;
                            file['type'] = file.file.type;
                            file['tags'] = new DataPartitionBase();
                            file['systemTagging'] = [
                                FileSystemTagsEnum.generalSpeciality,
                                FileSystemTagsEnum.operation
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
                        mediaFile.isDeleted = false;

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
        this.onOperationChange.next();
        this.onOperationChange.complete();
        this.patient = null;
    }

    private onUpdateGeneralOperation() {
        this._store.select(fromSelectors.updateGeneralOperation, { id: this.operation.id })
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.operation.id) {
                    this.onUpdateGeneralOperationCallback(data);
                }

            });

    }
    private onCreateGeneralOperationCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        this.replacedConditionId = undefined;
        AppUtils.SetFormPrestine(this.form);
        const operation = Object.assign({}, this.operation);
        // this.operation = AppUtils.deepMergeWith(operation, response)
        this.operation = AppUtils.mergeForForms(operation, response);
        this.isDirty = false;
        this._formUtilsService.popup('Operation created.');



    }

    private onUpdateGeneralOperationCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        this.replacedConditionId = undefined;
        AppUtils.SetFormPrestine(this.form);

        const operation = Object.assign({}, this.operation);
        // this.operation = AppUtils.deepMergeWith(operation, response)
        this.operation = AppUtils.mergeForForms(operation, response);
        this.isDirty = false;

    }

    private sendXhrProcessor() {

        // @ Backend request
        if (this.operation.id) {

            if (this.conditionId && this.patient.id) {

                this._formUtilsService.formSaving();

                const operation = Object.assign({}, this.operation);
                this._store.dispatch(fromActions.updateGeneralOperation({ patientId: this.patient.id, conditionId: this.conditionId, replacedConditionId: this.replacedConditionId, operation: operation }));


            } else {
                console.error('[ERROR]:Condition id or patient id is missing.');
                this._formUtilsService.popup('An internal error Occurred, couldn\'t save operation.');

            }

        } else {

            this._formUtilsService.formSaving();

            this.operation.id = AppUtils.GenerateObjectId();
            const operation = Object.assign({}, this.operation);
            this._store.dispatch(fromActions.createGeneralOperation({ patientId: this.patient.id, conditionId: this.conditionId, operation: operation }));


        }
    }

    private watchFormChangesProcessor() {

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onOperationChange.next(this.operation);
                    }
                }, 0);
            });
    }

    private watchPatientChangesProcessor() {
        // @ SEND REQUEST
        this.onOperationChange
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onLocationChange(value) {
        if (value.id) {
            const location = this.locations.filter(obj => obj.id === value.id);
            if (location.length) {
                this.subLocations = location[0].subLocations;
                // @ subLocation is set and not related to the selected location then clear subLocation
                if (this.subLocations.indexOf(this.operation.subLocation) === -1) {
                    this.operation.subLocation = '';
                }
            }
        }
    }

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }


    add(event: MatChipInputEvent): void {

        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.operation.code.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.codeCtrl.setValue(null);
        this.onOperationChange.next(this.operation);
    }

    remove(code: string): void {
        const index = this.operation.code.indexOf(code);

        if (index >= 0) {
            this.operation.code.splice(index, 1);
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            this.operation[eventData.modelName].text = eventData.data;
            this.onOperationChange.next(this.operation);
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

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {
            this.onOperationChange.next(this.operation);
        }
    }

    onFormStatusChanged(status: string) {
        this.formStatus = status;
    }

    beforeBackEndRequest(patient: any, operation: any) {
        if (operation.id) {

            if (this.replacedConditionId) {
                patient = this.moveToOtherCondition(patient, operation, this.conditionId, this.replacedConditionId);
            }

            const conditionId = this.conditionId;

            // @ Get condition index
            const conditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
            // @ Get operation index
            const operationIndex = findIndex(patient.specialities.general.conditions[conditionIndex].activities.operations, { id: operation.id });
            // @ update operation
            patient.specialities.general.conditions[conditionIndex].activities.operations[operationIndex] = operation;
            return patient;
        } else {
            const conditionId = this.conditionId;
            operation.id = AppUtils.GenerateObjectId();
            // @ Get condition index
            const conditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
            // @ push operation to selected condition
            patient.specialities.general.conditions[conditionIndex].activities.operations.push(operation);
            return patient;
        }
    }

    /**
     * Removes the operation from the old selected condition and push it for 
     * other condition
     * 
     * @param {any} patient 
     * @param {any} operation 
     * @param {any} conditionId 
     * @param {any} replacedConditionId 
     * 
     * @memberOf NewOperationComponent
     */
    moveToOtherCondition(patient, operation, conditionId, replacedConditionId): any {

        // @ Remove the operation from old condition if exists
        const ReplacedConditionIndex = findIndex(patient.specialities.general.conditions, { id: replacedConditionId });
        const ReplacedoperationIndex = findIndex(patient.specialities.general.conditions[ReplacedConditionIndex].activities.operations, { id: operation.id });
        if (ReplacedoperationIndex >= 0) {
            patient.specialities.general.conditions[ReplacedConditionIndex].activities.operations.splice(ReplacedoperationIndex, 1);
        }

        // @ Add operation to selected condition 
        const ConditionIndex = findIndex(patient.specialities.general.conditions, { id: conditionId });
        patient.specialities.general.conditions[ConditionIndex].activities.operations.push(operation);

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

        this.updateHeader();

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
        //         this._store.dispatch(fromActions.LoadPatientMediaFiles({
        //             id: this.patient.id,
        //          speciality: SpecialityEnum.general,
        //          conditionId: this.conditionId,
        //          activitType: 'operation',
        //     activityId:this.operation.id
        //         }
        // ));

        // this._activityMediaFilesGQL.watch({
        //     patientId: this.patient.id,
        //     speciality: SpecialityEnum.general,
        //     conditionId: this.conditionId,
        //     activitType: 'operation',
        //     activityId: this.operation.id
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
                            file.conditionId === this.operation.id) {
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

        //     this._updateMediaFilesGQL
        //         .mutate(
        //             {
        //                 mediaFiles: result
        //             },
        //             {
        //                 optimisticResponse: updateMediaFilesGqlCallback.optimisticResponse(
        //                     result
        //                 ),
        //                 update: (proxy, ev) =>
        //                     updateMediaFilesGqlCallback.update(proxy, ev)
        //             }
        //         )
        //         .subscribe(
        //             response => {
        //                 if (response.data && response.data.updateMediaFiles) {
        //                     let updateMediaFiles: MediaFile[] = response.data.updateMediaFiles;
        //                     let files: MediaFile[] = this.activityMediaFiles$.value;

        //                     if (updateMediaFiles.length) {

        //                         // @ we need to check if files was attached to another condition..
        //                         files.map((file) => {

        //                             // @ if file still attached to this operation
        //                             // @ then add file to list
        //                             if (file.patientId === this.patient.id &&
        //                                 file.conditionId === this.operation.id) {
        //                                 let index = files.findIndex(obj => obj.id == file.id)
        //                                 if (index) files[index] = file
        //                             } else {
        //                                 // @ file is moved to another location
        //                                 files = files.filter(obj => obj.id != file.id)
        //                             }
        //                         })

        //                         this.activityMediaFiles$.next(files);

        //                         this.snackBar.open('Files attached', 'CLOSE', {
        //                             panelClass: 'm-24',
        //                             duration: 3000
        //                         });

        //                         this.toggleViewMode();
        //                     }

        //                 }
        //             },

        //             error => { }
        //         );
    }

    rebuildMediaFiles(files: MediaFile[]): GeneralActivityMediaFiles {

        const activityFiles = <GeneralActivityMediaFiles>{
            other: [],
            physicalExam: [],
            radio: [],
            laboratory: [],
        };

        if (!files || !files.length) { return activityFiles; }


        files.map((file, index) => {

            if (file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1) {
                activityFiles.physicalExam.push(file);
            }

            else if (file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1) {
                activityFiles.radio.push(file);
                 }

            else if (file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1) {
                activityFiles.laboratory.push(file);
                 }

            else {
                activityFiles.other.push(file);
                 }
        });

        return activityFiles;

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
        } else if (!this.operation.id) {
            this.snackBar.open(
                'Attention! fill the required fields to create the operation before trying to upload files. ',
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

    predictDiagnosis() {


        if (this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.general &&
            this.patient.patientInfo.specialities.general.conditions.length
        ) {

            const conditionIndex = this.patient.patientInfo.specialities.general.conditions.findIndex(obj => obj.id === this.conditionId);

            // if (conditionIndex > -1) {
            //     let condition: GeneralConditionBase = this.patient.patientInfo.specialities.general.conditions[conditionIndex]


            //     if (condition.activities.followups.length) {
            //         // @ try get latest followup that contains any diagnosis
            //         let followup = condition.activities.followups.reduce((preF, curF) => {
            //             if (curF.diagnosis.text.length)
            //                 if (moment(curF.opened).isAfter(moment(preF.opened)))
            //                     return curF

            //             return preF
            //         })
            //         // @ maybe all followups dosn't contain diagnosis
            //         if (followup.diagnosis.text.length)
            //         this.operation.operationDiagnosis=followup.diagnosis
            //             //this.operation.operationDiagnosis = followup.diagnosis
            //         else
            //             // @ try add condition diagnosis
            //             if (condition.diagnosis.text.length)
            //                 this.operation.operationDiagnosis = condition.diagnosis
            //     }
            //     else
            //         // @ try add condition diagnosisi
            //         if (condition.diagnosis.text.length)
            //             this.operation.operationDiagnosis = condition.diagnosis
            // }
        }
    }

    private isRelatedFile(mediafile: MediaFileBase) {
        // @ if mediafile contain an activityId.. then its not related
        if (!mediafile.activityType || !mediafile.activityId) { return false; }

        if (
            mediafile.patientId === this.patient.id &&
            mediafile.speciality === SpecialityEnum.general &&
            mediafile.activityId === this.operation.id
        ) {
            return true;
        }

        return false;
    }

    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId);
    }
}
