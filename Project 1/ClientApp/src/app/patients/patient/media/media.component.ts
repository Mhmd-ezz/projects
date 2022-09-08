import { PatientService } from 'app/patients/patient.service';
import { PatientMediaPoolFilesGQL } from './../../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { Subject, BehaviorSubject } from 'rxjs';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import { AuthService } from 'app/blocks/auth/auth.service';
import { environment } from 'environments/environment';
import { takeUntil } from 'rxjs/operators';
import { AppUtils } from 'app/blocks/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataPartitionBase, MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { MediaFile, DeleteMediaFilesGQL, UpdateMediaFilesGQL, MediaFileInput } from 'app/blocks/graphql/generated/gqlServices';
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    private MediaPoolFiles$ = new BehaviorSubject<MediaFile[]>([]);

    @ViewChild('mediaFlow', { static: false }) mediaFlow: FlowDirective;
    mediaEndpoint: any;
    accessToken: string;
    tenantId: any;
    patientId: string;
    mediaFiles: MediaFile[] = [];


    constructor(
        private _queueFileUploaderService: QueueFileUploaderService,
        private _authService: AuthService,
        private snackBar: MatSnackBar,
        private _route: ActivatedRoute,
        private _patientMediaPoolFilesGQL: PatientMediaPoolFilesGQL,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,
        private _patientService: PatientService,


    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();

        this.mediaEndpoint = environment.mediaEndpoint;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this.tenantId = this._authService.identityClaims['tenantId'];
    }

    ngOnInit() {

        // @ Get patient id from url path 
        this.getPatientId();

        // @ Watch for uploaded files by queue uploader service
        this.watchUploadedFiles();

        // @ Load patient media files from server
        this.loadPatientMediaFiles();

        // @ Subscribe to activityMediaFiles observable
        this.watchActivityFiles();
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    ngAfterViewInit(): void {

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


        // @ upload media
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
                            file['patientId'] = this.patientId;
                            file['speciality'] = '';
                            file['conditionId'] = '';
                            file['activityType'] = '';
                            file['activityId'] = '';
                            file['isDeleted'] = false;
                            file['type'] = file.file.type;
                            file['tags'] = new DataPartitionBase();
                            file['systemTagging'] = [];

                            if (event.event[1]) {
                                this._queueFileUploaderService.uploadFile(file);
                            }
                        }
                    });
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    onDeleteSelectedFiles(event: string[]) {
        if (!event && !event.length) {
            return;
        }

        const selectedFilesIds = event;

        this._deleteMediaFilesGQL
            .mutate(
                { id: selectedFilesIds },
                {
                    optimisticResponse: deleteMediaFilesGqlCallback.optimisticResponse(selectedFilesIds),
                    update: (proxy, ev) => deleteMediaFilesGqlCallback.update(proxy, ev)
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
                        let files: MediaFile[] = this.MediaPoolFiles$.value;

                        if (ids && ids.length) {

                            // @ remove file from activityMediaFiles array
                            ids.map((id) => {
                                files = files.filter(obj => obj.id !== id);
                            });

                            this.MediaPoolFiles$.next(files);

                            // @ Inform other components (sidebar menu) that new images was changed
                            this._patientService.onpatientMediaPoolChange.next(true);
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
                    optimisticResponse: updateMediaFilesGqlCallback.optimisticResponse(result),
                    update: (proxy, ev) => updateMediaFilesGqlCallback.update(proxy, ev)
                }
            )
            .subscribe(
                response => {
                    if (response.data && response.data.updateMediaFiles) {
                        const updateMediaFiles: MediaFile[] = response.data.updateMediaFiles;
                        let files: MediaFile[] = this.MediaPoolFiles$.value;

                        if (updateMediaFiles.length) {

                            // @ we need to check if files was attached to another patient or to an activity
                            files.map((file) => {

                                // @ file still attached to this patient pool
                                if (file.patientId === this.patientId &&
                                    !file.speciality &&
                                    !file.conditionId) {
                                    const index = files.findIndex(obj => obj.id === file.id);
                                    if (index) { files[index] = file; }
                                } else {
                                    // @ file is moved to another location
                                    files = files.filter(obj => obj.id !== file.id);
                                }
                            });

                            this.MediaPoolFiles$.next(files);

                            // @ Inform other components (sidebar menu) that new images was changed
                            this._patientService.onpatientMediaPoolChange.next(true);

                            this.snackBar.open('Files attached', 'CLOSE', {
                                panelClass: 'm-24',
                                duration: 3000
                            });

                            // this.toggleViewMode();
                        }
                    }
                },
                error => { }
            );
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private isValidFile(file: FlowFile): boolean {

        const fileType = file.file.type;
        const isImage = AppUtils.RegexImage(fileType);
        let isValid = true;


        if (!isImage) {
            this.snackBar.open(
                'Attention! only images are allowed.',
                'CLOSE', { panelClass: 'm-24', duration: 8000 }
            );
            isValid = false;
        }

        if (!isValid) {
            this.mediaFlow.flowJs.removeFile(file);
        }

        return isValid;
    }

    private getPatientId() {

        // @ Extract patient id from URL
        this._route.parent.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params['id'];
                this.patientId = id;
            });

    }

    private watchUploadedFiles() {
        // @ When a file are uploaded
        this._queueFileUploaderService.fileUploaded$.subscribe(mediaFile => {

            if (Object.keys(mediaFile).length > 0) {

                // @ Is the comming file related to patient pool ?
                const isRelatedFile = this.isRelatedFile(mediaFile);

                if (isRelatedFile) {

                    const files = this.MediaPoolFiles$.value;

                    // @ Check if file is already exists localy 
                    const filesIndex = files.findIndex(obj => obj.id === mediaFile.id);

                    // @ If file doesn't exist then push file
                    if (filesIndex === -1) {
                        files.push(JSON.parse(JSON.stringify(mediaFile)));
                        this.MediaPoolFiles$.next(files);
                    }
                    
                    // @ Inform other components (sidebar menu) that new images was changed
                    this._patientService.onpatientMediaPoolChange.next(true);
                }
            }
        });
    }

    private isRelatedFile(mediafile: MediaFileBase) {
        // @ if mediafile contain an activityId.. then its not related
        if (mediafile.activityType || mediafile.activityId || mediafile.speciality || mediafile.conditionId) { return false; }

        if (mediafile.patientId === this.patientId) {
            return true;
        }

        return false;
    }

    private loadPatientMediaFiles() {
        if (!this.patientId) {
            console.error('[ERROR]: Could not find patient id.');
            return false;
        }
        this._patientMediaPoolFilesGQL.watch({ patientId: this.patientId })
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {

                if (response.data && response.data.patientMediaPoolFiles) {

                    const files = Object.assign([], response.data.patientMediaPoolFiles);
                    this.MediaPoolFiles$.next(files);

                }
            });
    }

    private watchActivityFiles() {
        this.MediaPoolFiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files) => {
                this.mediaFiles = files;
            });
    }

    // private rebuildMediaFiles(files: MediaFile[]): MediaFile[] {

    //     let result: MediaFile[] = []

    //     if (!files || !files.length) return result;

    //     files.map((file, index) => {

    //         if (file.systemTagging.indexOf(FileSystemTagsEnum.physicalExam) > -1) {
    //             conditionFiles.physicalExam.push(file)
    //         }
    //         else if (file.systemTagging.indexOf(FileSystemTagsEnum.radio) > -1) {
    //             conditionFiles.radio.push(file)
    //         }
    //         else if (file.systemTagging.indexOf(FileSystemTagsEnum.laboratory) > -1) {
    //             conditionFiles.laboratory.push(file)
    //         }
    //         else {
    //             conditionFiles.other.push(file)
    //         }
    //     })

    //     return conditionFiles;

    // }
}
