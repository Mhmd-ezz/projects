import { QueueFileUploaderService } from './../components/queue-file-uploader/queue-file-uploader.service';
import { AppUtils } from './index';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowFile } from '@flowjs/ngx-flow';
import { MediaFileBase } from '../graphql/generated/bases';
import { FileSystemTagsEnum } from '../enum/file-system-tags.enum';

@Injectable({
    providedIn: 'root'
})
export class FileUtilsService {

    constructor(
        private snackBar: MatSnackBar,
        private _queueFileUploaderService: QueueFileUploaderService,
    ) { }

    fileSubmitted(mediaFlow, event, mediaFile) {
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
                    mediaFlow.flowJs.removeFile(file);

                } else {

                    file = Object.assign(file, mediaFile);

                    file['id'] = AppUtils.GenerateObjectId();
                    file['name'] = AppUtils.GenerateObjectId() + '.' + file.getExtension();
                    file['type'] = file.file.type;

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
                        this._queueFileUploaderService.uploadFile(file);
                    }
                }
            });
        }
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

    isRelatedFileToCondition(mediafile: MediaFileBase, patientId, speciality, conditionId) {
        // @ if mediafile contain an activityId.. then its not related
        if (mediafile.activityType || mediafile.activityId) { return false; }

        if (
            mediafile.patientId === patientId &&
            mediafile.speciality === speciality &&
            mediafile.conditionId === conditionId
        ) {
            return true;
        }

        return false;
    }

    setup(mediaflow) {
        mediaflow.flowJs.opts.query = function (file, chunk) {

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
                ticketNumber:file['ticketNumber']           
            };
            return queryObj;
        };
    }
}
