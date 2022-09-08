import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from 'app/blocks/auth/auth.service';
import { MediaFile, MediaFileInput } from 'app/blocks/graphql/generated/gqlServices';
import { IImage } from 'app/blocks/interface/IImage';
import { WindowSize } from 'app/blocks/interface/window-size';
import { ResizeService } from 'app/blocks/services/resize.service';
import { environment } from 'environments/environment';
import map from 'lodash/map';
import { Subject } from 'rxjs';

import { AttachFilesService } from '../attach-files-dialog/attach-files.service';
import { DeleteMediaFileSheetComponent } from '../confirm-delete-media-file-sheet/delete-media-file.component';
import { MdcPhotoSwipeService } from '../mdc-photo-swipe/mdc-photo-swipe.service';

interface GeneralConditionMediaFiles {
    other?: MediaFile[]
    physicalExam?: MediaFile[]
    radio?: MediaFile[]
    laboratory?: MediaFile[]
}


@Component({
    selector: 'media-file-view-list',
    templateUrl: './media-file-view-list.component.html',
    styleUrls: ['./media-file-view-list.component.scss']
})
export class MediaFileViewListComponent implements OnInit {

    @Input('files') public files: MediaFile[];
    @Input('autoTagName') public autoTagName: string = '';
    @Input('headerName') public headerName: string = '';

    @Output('onDeleteSelected') onDeleteSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output('onAttachedFiles') onAttachedFiles: EventEmitter<MediaFileInput[]> = new EventEmitter<MediaFileInput[]>();


    // Private
    private _unsubscribeAll: Subject<any>;

    public mediaEndpoint: string
    public tenantId: string;
    public accessToken: string;
    public isUploadPopupOpened = false
    public selectedRowSet: Set<any> = new Set()
    public mediaSelectMode = false
    public isRightMainMediaDisabled: boolean
    public isLeftMainMediaDisabled: boolean
    public conditionFiles: GeneralConditionMediaFiles = {}
    public imageFallback: string;
    public activityMediaFiles: Array<MediaFile>;
    public widowSize: WindowSize


    constructor(
        private _authService: AuthService,
        private _attachFilesService: AttachFilesService,
        private bottomSheet: MatBottomSheet,
        // private _pdfViewerSideBarService: PdfViewerSidebarService,
        private _mdcPhotoSwipeService: MdcPhotoSwipeService,
        private _resizeService: ResizeService

    ) {

        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.mediaEndpoint = environment.mediaEndpoint
        this.accessToken = `Bearer ${this._authService.getaccessToken()}`
        this.tenantId = this._authService.identityClaims["tenantId"];
        this.imageFallback = environment.imageFallback;
        this._resizeService.windowSizeChanged.subscribe(data => this.widowSize = data)

    }

    ngOnInit() {
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


    // ----------------
    //      MEDIA
    // ----------------

    mainMediaLeftBound(event): void {
        // @ event: Reaches the left bound
        event === true
            ? (this.isLeftMainMediaDisabled = true)
            : (this.isLeftMainMediaDisabled = false)
    }

    mainMediaRighttBound(event): void {
        // @ event: Reaches the right bound
        event === true
            ? (this.isRightMainMediaDisabled = true)
            : (this.isRightMainMediaDisabled = false)
    }

    getSelectedFiles(): any[] {
        return Array.from(this.selectedRowSet)
    }

    selectFile(file: MatCheckboxChange, item): void {
        if (file.checked) {
            if (!this.selectedRowSet.has(item)) {
                this.selectedRowSet.add(item)
            }
        } else {
            if (this.selectedRowSet.has(item)) {
                this.selectedRowSet.delete(item)
            }
        }
    }

    toggleViewMode(): void {
        this.mediaSelectMode = !this.mediaSelectMode
        this.selectedRowSet.clear()
    }

    attachSelected(): void {
        this.openAttachFilesDialog();
    }

    openAttachFilesDialog(): void {
        const selectedFiles = this.getSelectedFiles();
        const dialogRef = this._attachFilesService.open(selectedFiles);

        dialogRef.afterClosed().subscribe((result: Array<MediaFileInput>) => {
            if (result && result.length > 0)
                this.onAttachedFiles.emit(result)
            this.toggleViewMode()
        });


    }

    deleteSelected(): void {
        const selectedFiles = Array.from(this.selectedRowSet);
        // @ pluck files ids
        const selectedFilesIds = map(selectedFiles, 'id');
        if (selectedFilesIds.length < 0) {
            return;
        }

        // @ confirm deletion
        const sheet = this.bottomSheet.open(DeleteMediaFileSheetComponent);
        sheet.afterDismissed().subscribe(result => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {
                this.onDeleteSelected.emit(selectedFilesIds);
                this.toggleViewMode()
            }

        });
    }

    previewImage(clickedFile, fromCollection: string): void {

        const images: IImage[] = []

        let elementIndex: number = null
        const mediaFiles: Array<MediaFile> = this.files

        mediaFiles.map((file, index) => {

            if (file.type.startsWith("image")) {
                images.push({
                    w: 0,
                    h: 0,
                    src:
                        this.mediaEndpoint +
                        "/photos/" +
                        this.tenantId +
                        "/" +
                        file.name.toLowerCase() +
                        `?width=${  2000 || this.widowSize.width - 100}&quality=40`,
                    title: file.name,
                })
                if (
                    clickedFile.path != null &&
                    file.path === clickedFile.path
                ) {
                    elementIndex = index
                }
            }
        })

        if (elementIndex > -1 && elementIndex != null) {
            this._mdcPhotoSwipeService.open(images, elementIndex)

        } else {
            this._mdcPhotoSwipeService.open(images, 0)
        }
    }

    previewPdf(file): void {
        // this._pdfViewerSideBarService.openPdf(file)
    }

}
