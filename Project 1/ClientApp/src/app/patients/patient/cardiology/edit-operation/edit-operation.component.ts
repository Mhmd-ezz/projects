import { LocationBase } from './../../../../blocks/graphql/generated/bases';
import { CardiologyOperationInput, Patient } from './../../../../blocks/graphql/generated/gqlServices';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { combineLatest, Observable, Subject, BehaviorSubject } from 'rxjs';

import { catchError, debounceTime, map, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { updateCardiologyOperationGqlCallback } from '../../../../blocks/graphql/callback/updateCardiologyOperationGqlCallback';
import { CardiologyOperationBase, MediaFileBase, DataPartitionBase } from '../../../../blocks/graphql/generated/bases';
import {
    CardiologyCondition,
    LocationsGQL,
    LookupsByGroupsGQL,
    UpdateCardiologyOperationGQL,
    MediaFile,
    UpdateMediaFilesGQL,
    ActivityMediaFilesGQL,
    DeleteMediaFilesGQL,
    MediaFileInput,
} from '../../../../blocks/graphql/generated/gqlServices';
import { AppUtils } from './../../../../blocks/utils';
import { PatientService } from './../../../patient.service';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'app/blocks/auth/auth.service';
import { environment } from 'environments/environment';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { FlowFile, FlowDirective } from '@flowjs/ngx-flow';
import findIndex from 'lodash/findIndex';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import { CardiologyActivityMediaFiles } from '../cardiologyActivityMediaFiles';


@Component({
    selector: 'edit-operation',
    templateUrl: './edit-operation.component.html',
    styleUrls: ['./edit-operation.component.scss']
})
export class CardiologyEditOperationComponent implements OnInit {

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
    private idParam$: Observable<any>;
    private queryParams$: Observable<any>;

    public patient: Patient;
    public operation: CardiologyOperationBase = new CardiologyOperationBase();
    public formStatus: string = null;
    public patientConditions: any;
    public conditionId: string = null;
    public replacedConditionId: string;
    public isConditionIdSet = false;
    public locations: LocationBase[] = [];
    public subLocations: string[] = [];
    public departments = ['OR', 'ER', 'Clinic'];
    public lookups: any = {};
    public isDirty = false;
    public selectedCondition: CardiologyCondition = {};

    public selectedRowSet: Set<any> = new Set();
    public mediaSelectMode = false;
    public isUploadPopupOpened = false;
    public mediaEndpoint: string;
    public accessToken: string;
    public tenantId: string;
    private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
    public activityFiles: CardiologyActivityMediaFiles = {};

    FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;

    // @ Form Control
    public anesthesiaControl = new FormControl('');
    public operationTypeControl = new FormControl('');
    public operationPerformedControl = new FormControl('');
    public operationPostDiagnosisControl = new FormControl('');
    public diagnosisControl = new FormControl('');
    public operationPreFindingsControl = new FormControl('');

    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;


    public codes = [
        { code: 'A1234', description: 'Truma 1' },
        { code: 'A7890', description: 'Truma 2' }
    ];

    constructor(
        private _updateCardiologyOperationGQL: UpdateCardiologyOperationGQL,
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
    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onOperationChange = new Subject();

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this.setTenantId();

        this.idParam$ = this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                map(params => params.get('id'))
            );

        this.queryParams$ = this._route.queryParams
            .pipe(takeUntil(this._unsubscribeAll));

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

        // @ load locations
        this._locationsGQL
            .watch()
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    if (response.data && response.data.locations) {
                        this.locations = response.data.locations;
                    }
                },
                (error) => {
                    this._logger.error('[ERROR]: ', error);
                }
            );



        this._patientsService.onCurrentPatientChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response.data && response.data.patient) {
                    this.patient = Object.assign({}, response.data.patient);

                    if (!this.isConditionIdSet) {
                        this.patientConditions = this.getPatientConditions();
                    }

                    // @ Wait for all observables
                    // @ Query params : patientId , conditionId
                    combineLatest(this.idParam$, this.queryParams$, (operationId, queryParams) => ({ operationId, queryParams }))
                        .subscribe(pair => {
                            const _operationId = pair.operationId;
                            const _conditionid = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;
                            this.conditionId = !this.conditionId ? pair.queryParams.conditionId : this.conditionId;

                            const operation = this._patientsService.getCardiologyOperation(_operationId, _conditionid);
                            this.operation = Object.assign({}, AppUtils.mergeForForms(this.operation, operation));

                            this.updateHeader();

                            this.loadPatientMediaFiles();

                            // @ update subLocation
                            setTimeout(() => {
                                this.onLocationChange(this.operation.location);
                            }, 0);
                        });

                }
            });

        // @ Subscribe for form changes
        this.form
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onOperationChange.next(this.operation);
                    }
                }, 0);

            });

        // @ SEND REQUEST 
        this.onOperationChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid
                filter(() => {

                    const isValid = AppUtils.validateForm(this.form, false);

                    if (!isValid) {
                        this.onFormStatusChanged(this.formStatusEnum.invalid);
                    }

                    return isValid;
                }),
                tap(ev => {
                    this.onFormStatusChanged(this.formStatusEnum.pending);
                    this.form.form.markAsPristine();
                    // this.isDirty = true;
                }),
                debounceTime(this.savingDelay),
            )
            .pipe(
                switchMap(x => {

                    // @ Backend request
                    if (this.operation.id) {

                        if (this.conditionId && this.patient.id) {


                            this.onFormStatusChanged(this.formStatusEnum.saving);

                            const operation  = Object.assign({}, this.operation) as CardiologyOperationInput;

                            return this._updateCardiologyOperationGQL.mutate(
                                { patientId: this.patient.id, conditionId: this.conditionId, replacedConditionId: this.replacedConditionId, operation: operation },
                                {
                                    optimisticResponse: updateCardiologyOperationGqlCallback.optimisticResponse(operation),
                                    update: (proxy, ev) => updateCardiologyOperationGqlCallback.update(proxy, ev, this.patient.id, this.conditionId, this.replacedConditionId)
                                }
                            );
                        } else {
                            console.error('[ERROR]: Condition id or patient id is missing.');
                            this.snackBar.open('An internal error Occurred, couldn\'t save operation.', 'CLOSE', {
                                panelClass: 'm-24',
                                duration: 4000,
                            });
                        }

                    } else {
                        this.onFormStatusChanged(this.formStatusEnum.error);
                        this._logger.error('[ERROR]: Couldn\'t find operation id');
                    }

                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    this._logger.error('[CATCH ERROR ]: ', err);
                    this.snackBar.open('An error Occurred', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000,
                    });
                    // @ Important to return source to avoid observable completion
                    return source;
                })
            )
            .pipe(
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {
                        this.onFormStatusChanged(this.formStatusEnum.savedLocally);

                        this.snackBar.open('No internet access, Saved locally', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                        return false;
                    }

                    return true;
                }),
                // @ Catch validation errors
                filter((response) => {

                    // @ errors exists
                    if (response.errors !== undefined && response.errors.length) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors);
                    }

                    // @ found Validation errors
                    if (this.errors.length) {
                        this.onFormStatusChanged(this.formStatusEnum.validationError);

                        this.snackBar.open('An error Occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }
                    else if (response.errors) {
                        // @ Unknown error
                        this.onFormStatusChanged(this.formStatusEnum.error);
                         }

                    // @ if errors 
                    return response.errors !== undefined && response.errors.length ? false : true;
                })
            )
            .subscribe(
                (response) => {

                    this.onFormStatusChanged(this.formStatusEnum.saved);

                    if (response.data.updateCardiologyOperation) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.replacedConditionId = undefined;
                        const operation = Object.assign({}, this.operation);
                        this.operation = AppUtils.mergeForForms(operation, response.data.updateCardiologyOperation);
                        // this.snackBar.open("Operation updated", 'CLOSE', {
                        //     panelClass: "m-24",
                        //     duration: 2000,
                        // })
                        this.isDirty = false;
                    }
                },
                (err) => {
                    this.onFormStatusChanged('error');
                    this._logger.error('[ERROR ]: ', err);

                });
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
                            file['speciality'] = SpecialityEnum.cardiology;
                            file['conditionId'] = this.conditionId;
                            file['activityType'] = 'operation';
                            file['activityId'] = this.operation.id;
                            file['isDeleted'] = false;
                            file['type'] = file.file.type;
                            file['tags'] = new DataPartitionBase();
                            file['systemTagging'] = [
                                FileSystemTagsEnum.cardiologySpeciality,
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

    matSelectCompare(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
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
            const conditionIndex = findIndex(patient.specialities.cardiology.conditions, { id: conditionId });
            // @ Get operation index
            const operationIndex = findIndex(patient.specialities.cardiology.conditions[conditionIndex].activities.operations, { id: operation.id });
            // @ update operation
            patient.specialities.cardiology.conditions[conditionIndex].activities.operations[operationIndex] = operation;
            return patient;
        } else {
            const conditionId = this.conditionId;
            operation.id = AppUtils.GenerateObjectId();
            // @ Get condition index
            const conditionIndex = findIndex(patient.specialities.cardiology.conditions, { id: conditionId });
            // @ push operation to selected condition
            patient.specialities.cardiology.conditions[conditionIndex].activities.operations.push(operation);
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
        const ReplacedConditionIndex = findIndex(patient.specialities.cardiology.conditions, { id: replacedConditionId });
        const ReplacedoperationIndex = findIndex(patient.specialities.cardiology.conditions[ReplacedConditionIndex].activities.operations, { id: operation.id });
        if (ReplacedoperationIndex >= 0) {
            patient.specialities.cardiology.conditions[ReplacedConditionIndex].activities.operations.splice(ReplacedoperationIndex, 1);
        }

        // @ Add operation to selected condition 
        const ConditionIndex = findIndex(patient.specialities.cardiology.conditions, { id: conditionId });
        patient.specialities.cardiology.conditions[ConditionIndex].activities.operations.push(operation);

        this.replacedConditionId = undefined;
        return patient;
    }

    getPatientConditions(): Array<any> {

        if (this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.cardiology &&
            this.patient.patientInfo.specialities.cardiology.conditions.length) {

            const conditions: any[] = [];
            this.patient.patientInfo.specialities.cardiology.conditions.map((condition) => {
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

        this._activityMediaFilesGQL.watch({
            patientId: this.patient.id,
            speciality: SpecialityEnum.cardiology,
            conditionId: this.conditionId,
            activitType: 'operation',
            activityId: this.operation.id
        })
            .valueChanges
            .subscribe(response => {

                if (response.data && response.data.activityMediaFiles) {

                    const files = Object.assign([], response.data.activityMediaFiles);
                    this.activityMediaFiles$.next(files);

                }
            });
    }

    onDeleteSelectedFiles(event: string[]) {
        if (!event && !event.length) {
            return;
        }

        const selectedFilesIds = event;

        this._deleteMediaFilesGQL
            .mutate(
                { id: selectedFilesIds },
                {
                    optimisticResponse: deleteMediaFilesGqlCallback.optimisticResponse(
                        selectedFilesIds
                    ),
                    update: (proxy, ev) =>
                        deleteMediaFilesGqlCallback.update(proxy, ev)
                }
            )

            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: response => {
                    if (response.errors) {
                        const message =
                            response.errors[0].extensions.data.message;

                        this.snackBar.open(message, 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 15000
                        });
                    } else if (
                        response.data &&
                        response.data.deleteMediaFiles
                    ) {

                        const ids: string[] = response.data.deleteMediaFiles;
                        let files: MediaFile[] = this.activityMediaFiles$.value;

                        if (ids && ids.length) {

                            // @ remove file from activityMediaFiles array
                            ids.map((id) => {
                                files = files.filter(obj => obj.id !== id);
                            });

                            this.activityMediaFiles$.next(files);
                        }

                        this.snackBar.open('Files deleted', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 3000
                        });
                    }
                },
                error: error => {
                    console.error('[ERROR]: ', error);
                }
            });
    }

    onAttachedFiles(event: MediaFileInput[]) {
        if (!event && !event.length) {
            return;
        }

        const result = event;

        this._updateMediaFilesGQL
            .mutate(
                {
                    mediaFiles: result
                },
                {
                    optimisticResponse: updateMediaFilesGqlCallback.optimisticResponse(
                        result
                    ),
                    update: (proxy, ev) =>
                        updateMediaFilesGqlCallback.update(proxy, ev)
                }
            )
            .subscribe(
                response => {
                    if (response.data && response.data.updateMediaFiles) {
                        const updateMediaFiles: MediaFile[] = response.data.updateMediaFiles;
                        let files: MediaFile[] = this.activityMediaFiles$.value;

                        if (updateMediaFiles.length) {

                            // @ we need to check if files was attached to another condition..
                            files.map((file) => {

                                // @ if file still attached to this operation
                                // @ then add file to list
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

                            this.snackBar.open('Files attached', 'CLOSE', {
                                panelClass: 'm-24',
                                duration: 3000
                            });

                            this.toggleViewMode();
                        }

                    }
                },

                error => { }
            );
    }

    rebuildMediaFiles(files: MediaFile[]): CardiologyActivityMediaFiles {

        const activityFiles = <CardiologyActivityMediaFiles>{
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

    private isRelatedFile(mediafile: MediaFileBase) {
        // @ if mediafile contain an activityId.. then its not related
        if (!mediafile.activityType || !mediafile.activityId) { return false; }

        if (
            mediafile.patientId === this.patient.id &&
            mediafile.speciality === SpecialityEnum.cardiology &&
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
