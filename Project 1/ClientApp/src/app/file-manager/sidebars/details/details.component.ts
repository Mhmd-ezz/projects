import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Apollo } from 'apollo-angular';
import { AttachFilesService } from 'app/blocks/components/attach-files-dialog/attach-files.service';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';
import { DataPartitionBase, MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { DeleteMediaFilesGQL, MediaFileInput, UpdateMediaFilesGQL } from 'app/blocks/graphql/generated/gqlServices';
import { AppUtils } from 'app/blocks/utils';
import { AuthService } from 'app/blocks/auth/auth.service';
import { FileManagerService } from 'app/file-manager/file-manager.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaFile, PatientsMediaFiles } from './../../../blocks/graphql/generated/gqlServices';
import { DeleteMediaFileSheetComponent } from './../../delete-media-file.component';
import map from 'lodash/map';
import { IImage } from 'app/blocks/interface/IImage';
import { MdcPhotoSwipeService } from 'app/blocks/components/mdc-photo-swipe/mdc-photo-swipe.service';
import { WindowSize } from 'app/blocks/interface/window-size';
import { ResizeService } from 'app/blocks/services/resize.service';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';


@Component({
    selector: 'file-manager-details-sidebar',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    animations: fuseAnimations
})
export class FileManagerDetailsSidebarComponent
    implements OnInit, OnDestroy, AfterViewInit {
    selected: PatientsMediaFiles = <PatientsMediaFiles>{};

    // Private
    private _unsubscribeAll: Subject<any>;
    private isSingleClick: Boolean = true;
    public isUploadPopupOpened = false;
    public isLeftImagesDisabled: boolean;
    public isRightImagesDisabled: boolean;
    public isLeftVideosDisabled: boolean;
    public isRightVideosDisabled: boolean;
    public isRightPdfDisabled: boolean;
    public isLeftPdfDisabled: boolean;
    public isLeftPoolDisabled: boolean;
    public isRightPoolDisabled: boolean;
    public selectedRowSet: Set<any> = new Set();
    public selectMode: any;
    public mediaEndpoint: string;
    public imageFallback: string;
    public widowSize: WindowSize;


    @ViewChild('paneFlow', { static: false })
    paneFlow: FlowDirective;

    accessToken: string;
    public tenantId: string;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        public dialog: MatDialog,
        private _fuseSidebarService: FuseSidebarService,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _attachFilesService: AttachFilesService,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
        private _apollo: Apollo,
        public _authService: AuthService,
        private _mdcPhotoSwipeService: MdcPhotoSwipeService,
        private _resizeService: ResizeService,
        private _queueFileUploaderService: QueueFileUploaderService
    ) {
        // Set the private defaults
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.mediaEndpoint = environment.mediaEndpoint;
        this.imageFallback = environment.imageFallback;
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;
        this._resizeService.windowSizeChanged.subscribe(data => this.widowSize = data);
        this.setTenantId();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngAfterViewInit(): void {

        // @ Add file metadata to request (query)
        // @ File metadata were attached to each file via 'filesSubmitted' Event fn
        this.paneFlow.flowJs.opts.query = function (file, chunk) {

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
        this.paneFlow.events$
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
                            this.paneFlow.flowJs.removeFile(file);

                        } else {

                            file['id'] = AppUtils.GenerateObjectId();
                            file['name'] = AppUtils.GenerateObjectId() + '.' + file.getExtension();
                            file['patientId'] = this.selected.id;
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
     * On init
     */
    ngOnInit(): void {
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });


        // @ When a file was uploaded
        this._queueFileUploaderService.fileUploaded$.subscribe(mediaFile => {

            if (Object.keys(mediaFile).length > 0) {

                // @ Check if its pool file
                const isRelated = this.isPatientFile(mediaFile);

                if (isRelated) {
                    // @ emit to fileManagerService
                    this._fileManagerService.onFilesChanged.next(true);
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
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------


    typeStartsWith(files: MediaFile[], match: string): MediaFile[] {

        const filtered: MediaFile[] = [];
        if (files && files.length) {
            files.map((file) => {
                if (file.type.startsWith(match)) {
                    filtered.push(file);
                }
            });
        }

        return filtered;
    }

    previewPdf(file): void {
        // @ todo fix path
        const urlPath = this.mediaEndpoint + '/pdfs/' + file.path;
        // this._pdfViewerSideBarService.openPdf(urlPath);
    }

    previewPoolImages(item): void {
        this.isSingleClick = true;
        setTimeout(() => {
            if (this.isSingleClick) {
                this.previewPoolImages_(item);
            }
        }, 350);
    }

    previewPoolImages_(item: MediaFile): void {

        const images: IImage[] = [];

        let elementIndex: number = null;

        this.selected.pool.map((file, index) => {

            if (file.type.startsWith('image')) {
                images.push({
                    w: 0,
                    h: 0,
                    src:
                        this.mediaEndpoint +
                        '/photos/' +
                        this.tenantId +
                        '/' +
                        file.name.toLowerCase() +
                        `?width=${2000 || this.widowSize.width - 100}&quality=40`,
                    title: file.name,
                });

                if (item != null && file.id === item.id) {
                    elementIndex = index;
                }
            }
        });



        if (elementIndex > -1 && elementIndex != null) {
            this._mdcPhotoSwipeService.open(images, elementIndex);
        } else {
            this._mdcPhotoSwipeService.open(images, 0);
        }
    }

    previewImages(item): void {
        this.isSingleClick = true;
        setTimeout(() => {
            if (this.isSingleClick) {
                this.previewImages_(item);
            }
        }, 350);
    }

    previewImages_(item): void {

        const images: IImage[] = [];

        let elementIndex: number = null;

        this.selected.files.map((file, index) => {

            if (file.type.startsWith('image')) {
                images.push({
                    w: 0,
                    h: 0,
                    src:
                        this.mediaEndpoint +
                        '/photos/' +
                        this.tenantId +
                        '/' +
                        file.name.toLowerCase() +
                        `?width=${2000 || this.widowSize.width - 100}&quality=40`,
                    title: file.name,
                });

                if (item != null && file.id === item.id) {
                    elementIndex = index;
                }
            }
        });

        if (elementIndex > -1 && elementIndex != null) {
            this._mdcPhotoSwipeService.open(images, elementIndex);
        } else {
            this._mdcPhotoSwipeService.open(images, 0);
        }
    }

    attach(itemUrl): void {
        this.isSingleClick = false;
        this.attach_(itemUrl);
    }

    attach_(itemUrl): void {
        this.openAttachFilesDialog();
    }

    imagesLeftBound(event): void {
        // @ event: Reaches the left bound

        event === true
            ? (this.isLeftImagesDisabled = true)
            : (this.isLeftImagesDisabled = false);
    }

    imagesRighttBound(event): void {
        // @ event: Reaches the right bound

        event === true
            ? (this.isRightImagesDisabled = true)
            : (this.isRightImagesDisabled = false);
    }

    videosLeftBound(event): void {
        // @ event: Reaches the left bound

        event === true
            ? (this.isLeftVideosDisabled = true)
            : (this.isLeftVideosDisabled = false);
    }

    videosRighttBound(event): void {
        // @ event: Reaches the right bound

        event === true
            ? (this.isRightVideosDisabled = true)
            : (this.isRightVideosDisabled = false);
    }

    pdfLeftBound(event): void {
        // @ event: Reaches the left bound

        event === true
            ? (this.isLeftPdfDisabled = true)
            : (this.isLeftPdfDisabled = false);
    }

    pdfRighttBound(event): void {
        // @ event: Reaches the right bound

        event === true
            ? (this.isRightPdfDisabled = true)
            : (this.isRightPdfDisabled = false);
    }

    poolLeftBound(event): void {
        // @ event: Reaches the left bound

        event === true
            ? (this.isLeftPoolDisabled = true)
            : (this.isLeftPoolDisabled = false);
    }

    poolRighttBound(event): void {
        // @ event: Reaches the right bound

        event === true
            ? (this.isRightPoolDisabled = true)
            : (this.isRightPoolDisabled = false);
    }

    getSelectedFiles(): any[] {
        return Array.from(this.selectedRowSet);
    }

    selectFile(file: MatCheckboxChange, item): void {
        if (file.checked) {
            if (!this.selectedRowSet.has(item)) { this.selectedRowSet.add(item); }
        } else {
            if (this.selectedRowSet.has(item)) { this.selectedRowSet.delete(item); }
        }
    }

    toggleSelectMode(): void {
        this.selectMode = !this.selectMode;
        this.selectedRowSet.clear();
    }

    // deselectAll() {
    //     this.selectedRowSet.clear()
    // }

    deleteSelected(): void {
        const selectedFiles = Array.from(this.selectedRowSet);
        // @ pluck files ids
        const selectedFilesIds = map(selectedFiles, 'id');
        if (selectedFilesIds.length < 0) {
            return;
        }

        const sheet = this.bottomSheet.open(DeleteMediaFileSheetComponent);
        sheet.afterDismissed().subscribe(result => {
            const deleteConfirmed =
                typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {
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
                                // this._fileManagerService.refresh()
                                this._fileManagerService.onFilesChanged.next(true);
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
        });
    }

    attachSelected(): void {
        this.openAttachFilesDialog();
    }

    openAttachFilesDialog(): void {
        const selectedFiles = this.getSelectedFiles();
        const dialogRef = this._attachFilesService.open(selectedFiles);
        dialogRef.afterClosed().subscribe((result: Array<MediaFileInput>) => {
            if (result && result.length > 0) {
                this._updateMediaFilesGQL
                    .mutate(
                        { mediaFiles: result },
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
                            // this._fileManagerService.refresh()
                            this._fileManagerService.onFilesChanged.next(true);
                        },
                        error => { }
                    );
            }
        });
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

    private isPatientFile(file: MediaFileBase) {

        if (file.patientId && file.patientId === this.selected.id) {
            return true;
        }

        return false;
    }

    private setTenantId() {
        this._authService.tenantId$.subscribe(tenantId => this.tenantId = tenantId);
    }
}
