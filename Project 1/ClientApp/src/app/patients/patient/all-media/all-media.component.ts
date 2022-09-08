import { PatientService } from 'app/patients/patient.service';
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
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';
import { PatientMediaFilesTotalGQL,PatientMediaFilesGQL,MediaFile } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-all-media',
    templateUrl: './all-media.component.html',
    styleUrls: ['./all-media.component.scss']
})
export class AllMediaComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>; 
 
    patientId: string;
    page:number=1;
    size:number=10;
    length=0;
    allMediaFiles: Array<MediaFile> = [];


    constructor(
        
        private _route: ActivatedRoute,
        private _patientMediaFilesGQL: PatientMediaFilesGQL,
        private _patientMediaFilesTotalGQL:PatientMediaFilesTotalGQL



    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();     
    }

    ngOnInit() {

        // @ Get patient id from url path 
        this.getPatientId();

        // @ Load all patient media files
        this.loadAllPatientMediaFiles();

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


       

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


 

  
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

   

    private getPatientId() {

        // @ Extract patient id from URL
        this._route.parent.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params['id'];
                this.patientId = id;
            });

    }


    // @ Handle page/size  data from all-media-files-list-component
    notifyHandler(eventData: any): void {
      this.page=eventData.page;
      this.size=eventData.size;
        this.loadAllPatientMediaFiles();
    }

   
    private loadAllPatientMediaFiles(): void {
        if (this.patientId) {
            this._patientMediaFilesGQL
                .watch({
                    patientId: this.patientId,
                    page: this.page,
                    size: this.size,
                })
                .valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                    if (response.data && response.data.patientMediaFiles) {
                        const mediaFiles = response.data.patientMediaFiles;
                        this.allMediaFiles = mediaFiles;              
                    }
                });
            }
            this._patientMediaFilesTotalGQL
                .watch({
                    patientId: this.patientId,
                  
                })
                .valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                    if (response.data && response.data.patientMediaFilesTotal) {
                    this.length=response.data.patientMediaFilesTotal
                    }
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
