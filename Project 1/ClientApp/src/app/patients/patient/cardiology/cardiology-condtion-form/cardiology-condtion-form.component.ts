import { LocationBase } from './../../../../blocks/graphql/generated/bases';
import { MedicalUtils } from 'app/blocks/utils/medical-utils';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { Logger } from '@nsalaun/ng-logger';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { outputDataEvent } from 'app/blocks/components/mdc-lookup-input/eventData.model';
import { AppUtils } from 'app/blocks/utils';
import { environment } from 'environments/environment';
import findIndex from 'lodash/findIndex';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import {  MediaFile, MediaFileInput, Patient } from '../../../../blocks/graphql/generated/gqlServices';
import { AuthService } from 'app/blocks/auth/auth.service';
import { CardiologyActivityMediaFiles } from '../cardiologyActivityMediaFiles';
import { DataPartitionBase, CardiologyConditionBase, MediaFileBase, MedicationBase } from '../../../../blocks/graphql/generated/bases';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { MedicationFormDialogService } from 'app/blocks/components/medication-form-dialog/medication-form-dialog.service';

@Component({
    selector: 'new-condition',
    templateUrl: './cardiology-condtion-form.component.html',
    styleUrls: ['./cardiology-condtion-form.component.scss']
})
export class CardiologyConditionFormComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild('mediaFlow', { static: false }) mediaFlow: FlowDirective;

    // Private
    private _unsubscribeAll: Subject<any>;
    public patient: Patient;
    private savingDelay = 3000;

    public condition: CardiologyConditionBase = new CardiologyConditionBase();
    public onConditionChange: Subject<any>;
    public formStatus: string = null;
    public lookups: any = {};
    public errors = [];
    public locations: LocationBase[] = [];
    public subLocations: string[] = [];

    public isDirty = false;

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
    public isRightMainMediaDisabled: boolean;
    public isLeftMainMediaDisabled: boolean;

    private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
    public activityFiles: CardiologyActivityMediaFiles = {};
    FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;
    public selectedRowSet: Set<any> = new Set();
    public mediaSelectMode = false;
    public isUploadPopupOpened = false;
    public mediaEndpoint: string;
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public CompTitle: string;
    patientIdExist = false;
    ConditionId: string;
    PatientId: string;
    constructor(
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private _router: Router,
        private _logger: Logger,
        private _authService: AuthService,
        private _queueFileUploaderService: QueueFileUploaderService,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
        private _medicationFormDialogService: MedicationFormDialogService,
    ) {

        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onConditionChange = new Subject();
        this.condition.opened = new Date();

        this.condition.type = 'Condition';
        this.condition.status = 'active';

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;

        this._store.dispatch(fromActions.loadLocations());

        this.setTenantId();

        this._route.parent.parent.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.PatientId = params['id'];

            });
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.ConditionId = params.get('id');

            });
        this._store.dispatch(fromActions.LoadPatientMediaFiles({
            id: this.PatientId,
            speciality: SpecialityEnum.cardiology,
            conditionId: this.ConditionId,
            activitType: null,
            activityId: null
        }
        ));

    }

    ngOnInit(): void {
        // @ read patient id param then get patient then find condition
        // this._route.paramMap
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(params => {
        //         let ConditionId = params.get("id");

        // @ load current patient and assign condition
        //  this._patientsService.onCurrentPatientChanged
        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {

                if (response.data && response) {

                    this.patient = Object.assign({}, response.data);
                    this.patientIdExist = true;

                    if (this.patient.patientInfo.specialities.cardiology.conditions.length) {

                        const conditionIndex = findIndex(this.patient.patientInfo.specialities.cardiology.conditions, ['id', this.ConditionId]);

                        if (conditionIndex !== -1) {

                            this.condition.medications = AppUtils.resolveUniqMedications(this.condition, this.patient.patientInfo.specialities.cardiology.conditions[conditionIndex]) as MedicationBase[];
                            // @ Clone condition 
                            this.condition = AppUtils.DeepClone(this.patient.patientInfo.specialities.cardiology.conditions[conditionIndex]);

                            // this.loadPatientMediaFiles();
                            // @ On update Cardiology Condition 
                            this._store.select(fromSelectors.updateCardiologyCondition, { id: this.ConditionId })
                                .pipe(
                                    takeUntil(this._unsubscribeAll),
                                    filter(data => !!data)
                                )
                                .subscribe(data => {
                                    console.log('updateCardiologyCondition success');
                                    if (this.condition.id) {
                                        this.onUpdateCardiologyConditionCallback(data);
                                    }


                                });
                            // @ update subLocation
                            setTimeout(() => {
                                this.onLocationChange(this.condition.location);
                            }, 0);

                        } else {
                            this._logger.error('[ERROR]: couldn\'t find condition');
                            this.condition.cardiologyClinicalExamination.leftInferior=true;
                            this.condition.cardiologyClinicalExamination.leftSuperior=true;
                            this.condition.cardiologyClinicalExamination.leftTransverse=true;
                            this.condition.cardiologyClinicalExamination.rightInferior=true;
                            this.condition.cardiologyClinicalExamination.rightTransverse=true;
                            this.condition.cardiologyClinicalExamination.rightSuperior=true;
                        }
                    } else {
                        this._logger.error('[ERROR]: couldn\'t find condition');
                    }
                }
            });
        // });

        if (this._router.url.includes('edit')) {
            this.CompTitle = 'Edit condition';
        } else {
            this.CompTitle = 'New condition';
        }

        this.activityMediaFiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files) => {
                this.activityFiles = this.rebuildMediaFiles(files);
                // this.activityFiles = AppUtils.cloneObject(files_)
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
                    this._formUtilsService.popup('An error occurred');
                }
                else if (errors) {
                    // @ Unknown error
                    // this.onFormStatusChanged(this.formStatusEnum.error)
                    this._formUtilsService.formError();
                }
                this._logger.error(errors);

            });

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



        // @ On create Cardiology Condition 
        this._store.select(fromSelectors.createCardiologyCondition)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.condition.id && this.CompTitle === 'New condition') {
                    this.onCreateCardiologyConditionCallback(data);
                }

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
        // @ watch patient 


        // this._store.select(fromSelectors.selectedPatientSelector)
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {
        //         if (response && response.data) {
        //             this.patient = Object.assign({}, response.data);

        //         }
        //     });
        this.watchFormChangesProcessor();
        this.watchPatientChangesProcessor();
    }

    ngAfterViewInit(): void {

        // @ observe location control and update subLocation
        setTimeout(() => {
            this.form.controls['location'].valueChanges.subscribe((value: any) => {
                this.onLocationChange(value);
            });


            merge(
                this.form.controls['weight'].valueChanges,
                this.form.controls['height'].valueChanges
            ).pipe(
                debounceTime(200))
                .subscribe((value: any) => {
                    this.setBmi();
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
                            file['conditionId'] = this.condition.id;
                            file['activityType'] = '';
                            file['activityId'] = '';
                            file['isDeleted'] = false;
                            file['type'] = file.file.type;
                            file['tags'] = new DataPartitionBase();
                            file['systemTagging'] = [
                                FileSystemTagsEnum.cardiologySpeciality,
                                FileSystemTagsEnum.condition
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
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.onConditionChange.next();
        this.onConditionChange.complete();
        this.patient = null;
    }

    // @ Handle Multi input data from mdc-input-component (Lookups)
    notifyHandler(eventData: outputDataEvent): void {
        console.log(eventData)
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated
            this.condition[eventData.modelName].text = eventData.data;
            // @ fire observable to send server request
            this.onConditionChange.next(this.condition);
        }
    }

    newMedication() {
        if (this.condition.id) {
            this._medicationFormDialogService.openDialog({ action: 'new', patientId: this.patient.id, conditionId: this.condition.id });
        }
        else {
            this._formUtilsService.popup('Missing Required Fields');
        }
    }

    onLocationChange(value) {
        if (value.id) {
            const location = this.locations.filter(obj => obj.id === value.id);
            if (location.length) {
                this.subLocations = location[0].subLocations;
                // @ subLocation is set and not related to the selected location then clear subLocation
                if (this.subLocations.indexOf(this.condition.subLocation) === -1) {
                    this.condition.subLocation = '';
                }
            }
        }
    }

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }


    matSelectCompare(objOne, objTwo): boolean {
        if (
            typeof objOne !== 'undefined' &&
            typeof objTwo !== 'undefined' &&
            objOne != null &&
            objTwo != null
        ) {
            return objOne.id === objTwo.id;
        }
    }

    // @ Handle Multi input data from mdc-input-component
    notifyMedicationHandler(eventData: any): void {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated
            this.condition[eventData.modelName] = eventData.data;
            // @ fire observable to send server request
            this.onConditionChange.next(this.condition);
        }
    }

    onDone(): void {
        this._router.navigate(['/patients', this.patient.id, 'cardiology']);
    }

    // @ Save Button
    saveChanges(): void {
        if (AppUtils.validateForm(this.form, true)) {
            this.onConditionChange.next(this.condition);
        }
    }

    // @ update ui header form status : error , autosaved, pending , etc..
    onFormStatusChanged(status: string): void {
        this.formStatus = status;
    }

    // ----------------
    //      MEDIA
    // ----------------

    loadPatientMediaFiles() {

        // this._store.dispatch(fromActions.LoadPatientMediaFiles({
        //     id: this.patient.id,
        //     speciality: SpecialityEnum.cardiology,
        //     conditionId: this.condition.id,
        //     activitType: 'condition',
        //     activityId: null
        // }
        // ));


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
                            file.conditionId === this.condition.id) {
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
        } else if (!this.condition.id) {
            this.snackBar.open(
                'Attention! fill the required fields to create the condition before trying to upload files. ',
                'CLOSE', { panelClass: 'm-24', duration: 8000 }
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
        if (mediafile.activityType || mediafile.activityId) { return false; }
if(this.patient)
        if (
            mediafile.patientId === this.patient.id &&
            mediafile.speciality === SpecialityEnum.cardiology &&
            mediafile.conditionId === this.condition.id
        ) {
            return true;
        }

        return false;
    }

    rebuildMediaFiles(files: MediaFile[]): CardiologyActivityMediaFiles {

        const conditionFiles = <CardiologyActivityMediaFiles>{
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
    private onCreateCardiologyConditionCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        AppUtils.SetFormPrestine(this.form);
        this._formUtilsService.popup('Condition created.');


        // @ Set form as prestine to avoid update conflicts
        AppUtils.SetFormPrestine(this.form);
        this.condition.medications = AppUtils.resolveUniqMedications(this.condition, response) as MedicationBase[];

        this.condition.id = response.id;
        this.condition = AppUtils.mergeForForms(this.condition, response);
    }

    private onUpdateCardiologyConditionCallback(response) {
        this.errors = [];
        this._formUtilsService.formSaved();
        AppUtils.SetFormPrestine(this.form);
        this.condition.medications = AppUtils.resolveUniqMedications(this.condition, response) as MedicationBase[];

        this.condition.id = response.id;
        this.condition = AppUtils.mergeForForms(this.condition, response);
    }


    private sendXhrProcessor() {

        // @ Backend request
        if (this.condition.id) {

            if (this.patient.id) {

                this._formUtilsService.formSaving();

                const condition = Object.assign({}, this.condition);
                console.log('conditon', condition);
                this._store.dispatch(fromActions.updateCardiologyCondition({ patientId: this.patient.id, condition: condition }));


            } else {
                console.error('[ERROR]:Couldn\'t find patient id.');
                this._formUtilsService.popup('An internal error occurred while updating.');

            }

        } else {

            this._formUtilsService.formSaving();

            this.condition.id = AppUtils.GenerateObjectId();
            this.ConditionId=this.condition.id
            const condition = Object.assign({}, this.condition);
            this._store.dispatch(fromActions.createCardiologyCondition({ patientId: this.patient.id, condition: condition }));

        }
    }

    private setBmi() {
        if (this.condition.weight && this.condition.height) {
            this.condition.bmi = MedicalUtils.calculateBmi(this.condition.weight, this.condition.height);
        }
    }

    private watchFormChangesProcessor() {

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onConditionChange.next(this.condition);
                    }
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


    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
