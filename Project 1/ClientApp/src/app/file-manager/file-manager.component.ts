import { QueueFileUploaderService } from './../blocks/components/queue-file-uploader/queue-file-uploader.service';
import { ResizeService } from './../blocks/services/resize.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Apollo } from 'apollo-angular';
import { AttachFilesService } from 'app/blocks/components/attach-files-dialog/attach-files.service';
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { AuthService } from 'app/blocks/auth/auth.service';
import { FileManagerService } from 'app/file-manager/file-manager.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createMediaFileGqlCallback } from './../blocks/graphql/callback/createMediaFileGqlCallback';
import { DataPartitionBase, MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { MediaFile, UpdateMediaFilesGQL, PatientGQL, TenantPoolMediaFilesGQL, DeleteMediaFilesGQL, MediaFileInput } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FileManagerComponent implements OnInit, OnDestroy, AfterViewInit {

    public isUploadPopupOpened = false;
    public poolFiles: MediaFile[] = [];
    public viewSize = 80;
    public paneSize = 20;
    public tenantId: string;

    @ViewChild('poolFlow', { static: false })
    poolflow: FlowDirective;

    // Private

    private _unsubscribeAll: Subject<any>;

    public mediaEndpoint: string;
    public imageFallback: string;
    public statistics: any;
    accessToken: string;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private _attachFilesService: AttachFilesService,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,
        private _patientGql: PatientGQL,
        private _apollo: Apollo,
        private _authService: AuthService,
        private _tenantPoolMediaFilesGQL: TenantPoolMediaFilesGQL,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _resizeService: ResizeService,
        private _queueFileUploaderService: QueueFileUploaderService

    ) {
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;

        this.setTenantId();


        this.mediaEndpoint = environment.mediaEndpoint;

        this.imageFallback = environment.imageFallback;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // @ calculate size of sidebar pane

        // const docWidthSize = document.body.clientWidth;

        // if (docWidthSize >= 1280) {
        //     this.viewSize = 80;

        //     this.paneSize = 20;
        // } else {
        //     this.viewSize = 100;

        //     this.paneSize = 0;
        // }

        this._resizeService.windowSizeChanged.subscribe(data => {

            if (data.width >= 1280) {
                this.viewSize = 80;

                this.paneSize = 20;
            } else {
                this.viewSize = 100;

                this.paneSize = 0;
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._fileManagerService.onFilesChanged.subscribe(_ => {
            this.loadPool();
        });

        this.loadPool();

        // @ When a file was uploaded
        this._queueFileUploaderService.fileUploaded$.subscribe(mediaFile => {

            if (Object.keys(mediaFile).length > 0) {

                // @ Check if its pool file
                const isPoolfile = this.isPool(mediaFile);

                if (isPoolfile) {
                    // @ update ui
                    const files_ = Object.assign([], this.poolFiles);
                    files_.push(JSON.parse(JSON.stringify(mediaFile)));
                    this.poolFiles = files_;

                    // @ emit to fileManagerService
                    this._fileManagerService.onFilesChanged.next(true);
                }
            }
        });
    }



    ngAfterViewInit(): void {

        // @ Add file metadata to request (query)
        // @ File metadata were attached to each file via 'filesSubmitted' Event fn
        this.poolflow.flowJs.opts.query = function (file, chunk) {

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
        this.poolflow.events$
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
                            this.poolflow.flowJs.removeFile(file);

                        } else {

                            file['id'] = AppUtils.GenerateObjectId();
                            file['name'] = AppUtils.GenerateObjectId() + '.' + file.getExtension();
                            file['patientId'] = '';
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
                                // console.log(this.poolflow, file)
                                // @ TODO TEMPO: uncomment lines
                                // this.mediaFlow.upload();
                                // this.isUploadPopupOpened = true
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

                        // @ update ui
                        const files_ = Object.assign([], this.poolFiles);
                        files_.push(JSON.parse(JSON.stringify(mediaFile)));
                        this.poolFiles = files_;

                        this.snackBar.open('File uploaded', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 3000
                        });

                        // @ emit to fileManagerService
                        this._fileManagerService.onFilesChanged.next(true);

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

    loadPool(): void {
        this._tenantPoolMediaFilesGQL
            .watch()
            .valueChanges.subscribe(({ data, loading }) => {

                if (data && data.tenantPoolMediaFiles) {
                    this.poolFiles = data.tenantPoolMediaFiles;
                }
            });
    }

    patientFilterCleared(event): void {
        console.log(event);
        this._fileManagerService.onPatientFilterClear.next(true);
    }

    onPatientChanged(patientId): void {
        this._fileManagerService.onPatientFilter.next(patientId);
        // this.getPatientById(patientId)
    }

    // /**
    //   * Get Patient by id
    //   *
    //   * @returns {void}
    //   */
    // getPatientById(id): void {
    //     this._patientGql.watch({ id: id })
    //         .valueChanges
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .subscribe((response) => {
    //             if (response.data && response.data.patient) {
    //                 // this.patient = Object.assign({}, response.data.patient);
    //             }

    //             // this.onCurrentPatientChanged.next(this.patient);
    //         })
    // }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
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
                        let files: MediaFile[] = this.poolFiles;

                        if (ids && ids.length) {

                            // @ remove file from activityMediaFiles array
                            ids.map((id) => {
                                files = files.filter(obj => obj.id !== id);
                            });

                            this.poolFiles = files;
                            this._fileManagerService.onFilesChanged.next(true);
                        }

                        this.snackBar.open('File(s) deleted', 'CLOSE', {
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
                        // @ Reload files & update ui
                        this._fileManagerService.onFilesChanged.next(true);
                    }
                },

                error => { }
            );

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
        }

        return isValid;
    }

    // ----------------------------------------------------------------------
    //     Private methods
    // ----------------------------------------------------------------------

    private isPool(file: MediaFileBase) {

        if (!file.patientId) {
            return true;
        }

        return false;
    }

    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId);
    }
}
