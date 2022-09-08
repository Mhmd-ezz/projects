import { FlowFileMetadata } from '../../interface/flow-file-metadata';
import { AppUtils } from './../../utils/index';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FlowDirective, Transfer, FlowFile } from '@flowjs/ngx-flow';
import { QueueFileUploaderService } from './queue-file-uploader.service';
import { MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from '../confirm-action-sheet/confirm-action-sheet.component';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'app/blocks/auth/auth.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-queue-file-uploader',
    templateUrl: './queue-file-uploader.component.html',
    styleUrls: ['./queue-file-uploader.component.scss']
})
export class QueueFileUploaderComponent implements OnInit, AfterViewInit {

    @ViewChild('flowAdvanced', { static: true }) flow: FlowDirective;
    retryInterval = 45000; // Time in milliseconds 
    accessToken: string;
    mediaEndpoint: string;

    constructor(
        private _queueFileUploaderService: QueueFileUploaderService,
        private _apollo: Apollo,
        private _bottomSheet: MatBottomSheet,
        private _authService: AuthService,
    ) {

        this.accessToken = `Bearer ${this._authService.getaccessToken()}`;

        this.mediaEndpoint = environment.mediaEndpoint;
    }

    ngOnInit(): void {

        // @ New files comming from service
        this._queueFileUploaderService.fileAdded$.subscribe(file => {

            const blb = this.arrayBufferToBlob(file.file, file.metadata.type);
            const fileFromBlob: any = this.blobToFile(blb, file.metadata.name);
            fileFromBlob.metadata = file.metadata;
            this.flow.flowJs.addFile(fileFromBlob);
        });

        this._queueFileUploaderService.getFiles().then(storedFiles => {

            if (!storedFiles.length) { return; }

            storedFiles.forEach(storedFile => {

                const blb = this.arrayBufferToBlob(storedFile.file, storedFile.metadata.type);
                const fileFromBlob: any = this.blobToFile(blb, storedFile.metadata.name);
                fileFromBlob.metadata = storedFile.metadata;
                this.flow.flowJs.addFile(fileFromBlob);
            });
        });
    }


    ngAfterViewInit() {

        // @ Alter Flow Options
        this.flow.flowJs.opts.allowDuplicateUploads = true;
        
        // @ Media server
        this.flow.flowJs.opts.target = this.mediaEndpoint + '/files/uploads';
        // @ File server
        // this.flow.flowJs.opts.target = this.mediaEndpoint + '/api/Upload';

        this.flow.flowJs.opts.chunkSize = 2000000;
        this.flow.flowJs.opts.headers = {
            'Authorization': `Bearer ${this._authService.getaccessToken()}`
        };

        // this.flow.flowJs.opts.target = 'http://localhost:80/uploadfile.php';

        // @ Add file metadata to request (query)
        // @ File metadata were attached to each file via 'filesSubmitted' Event fn
        this.flow.flowJs.opts.query = function (file, chunk) {

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
                ticketNumber: file['ticketNumber'],
            };

            return queryObj;
        };

        this.flow.events$.subscribe(event => {

            if (event.type === 'fileError') {
                const flowFile: any = event.event[0];
                this.onFileError(flowFile);
            }

            if (event.type === 'filesSubmitted') {

                const files: FlowFile[] = Object.assign([], event.event[0]);

                if (!files.length) { return; }

                // @ Process file
                this.onFilesSubmitted(files);
            }

            if (event.type === 'fileSuccess') {

                const flowFile: any = event.event[0];
                this.onFileSuccess(flowFile);
            }
        });
    }

    trackTransfer(transfer: Transfer): string {
        return transfer.id;
    }

    getStatus(transfer: Transfer): string {

        if (transfer.error) {
            return 'Error';
        } else if (transfer.success) {
            return 'Uploaded';
        } else if (transfer.flowFile.isUploading()) {
            return 'Uploading';
        } else if (transfer.paused) {
            return 'Paused';
        } else {
            return 'Pending';
        }
    }

    isImage(value: string): boolean {
        if (value) {
            return AppUtils.RegexImage(value);
        }
        else {
            return false;
        }
    }

    onCancelFile(transfer: Transfer): void {
        this.confirmDeleteFile(transfer);
    }

    onRetryFile(transfer: Transfer): void {
        transfer.flowFile.retry();
    }

    onPauseFile(transfer: Transfer): void {
        transfer.flowFile.pause();
    }

    onResumeFile(transfer: Transfer): void {
        transfer.flowFile.resume();
    }

    onResumeAll(): void {
        this.flow.flowJs.resume();
    }

    onPauseAll(): void {
        this.flow.flowJs.pause();
    }

    // ------------------------------------------------------------------------
    // Private methods
    // ------------------------------------------------------------------------

    private onFileSuccess(flowFile: FlowFileMetadata) {

        const file_ = flowFile.file;
        const mediaFile = new MediaFileBase();

        mediaFile.id = flowFile.id || null;
        mediaFile.name = flowFile.name || null;
        mediaFile.path = '';
        mediaFile.size = (file_.size).toString() || null;
        mediaFile.type = file_.type || flowFile.type || null;
        mediaFile.patientId = flowFile.patientId || null;
        mediaFile.speciality = flowFile.speciality || null;
        mediaFile.conditionId = flowFile.conditionId || null;
        mediaFile.activityType = flowFile.activityType || null;
        mediaFile.activityId = flowFile.activityId || null;
        mediaFile.isDeleted = false;
        mediaFile.systemTagging = flowFile.systemTagging;
        mediaFile.ticketNumber = flowFile.ticketNumber || null;
        mediaFile.tags = flowFile.tags;
        mediaFile.isDeleted = false;

        // @ Remove file from Flowjs
        this.flow.flowJs.removeFile(flowFile as FlowFile);

        // @ Remove file From storage
        this._queueFileUploaderService.removeFile(mediaFile.id);

        // @ Notify listners
        this._queueFileUploaderService.fileUploadedSubject$.next(mediaFile);

        // @ Update cache
        this.GqlUpdate(mediaFile);
    }

    private onFilesSubmitted(files: FlowFile[]): void {

        files.map((file, index) => {

            const metadata = (file.file as any).metadata;

            file['id'] = metadata.id;
            file['name'] = metadata.name;
            file['patientId'] = metadata.patientId;
            file['speciality'] = metadata.speciality;
            file['conditionId'] = metadata.conditionId;
            file['activityType'] = metadata.activityType;
            file['activityId'] = metadata.activityId;
            file['isDeleted'] = false;
            file['type'] = metadata.type;
            file['tags'] = metadata.tags;
            file['systemTagging'] = metadata.systemTagging;
            file['ticketNumber'] = metadata.ticketNumber;

            this.flow.upload();
        });
    }

    onFileError(flowFile: FlowFileMetadata): void {
        setTimeout(() => {
            flowFile.retry();
        }, this.retryInterval);
    }

    private confirmDeleteFile(transfer: Transfer): void {

        const args: ConfirmActionSheetArgs = {
            yes: 'I am sure, I want to delete this file',
            no: 'Don\'t delete'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                this.deleteFileProccessor(transfer);
            }
        });
    }

    private deleteFileProccessor(transfer: Transfer): void {

        this._queueFileUploaderService.removeFile(transfer.flowFile['id'])
            .then(() => {

                transfer.flowFile.cancel();

                // @ Remove file from flow
                this.flow.flowJs.removeFile(transfer.flowFile as FlowFile);

            });
    }

    private GqlUpdate(mediaFile: MediaFileBase): void {

        createMediaFileGqlCallback.update(
            this._apollo.getClient().cache,
            {
                data: {
                    createMediaFile: mediaFile
                }
            }
        );
    }

    private blobToFile(theBlob: Blob, fileName: string): File {
        const b: any = theBlob;
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        // Cast to a File() type
        return <File>theBlob;
    }

    private arrayBufferToBlob(buffer, type) {
        return new Blob([buffer], { type: type });
    }
    
}
