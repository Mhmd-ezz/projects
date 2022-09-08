import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromActions from '@appStore/actions';
import * as fromRoot from '@appStore/reducers';

import { AppUtils } from 'app/blocks/utils';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { DataPartitionBase, MediaFileBase, TicketBase } from 'app/blocks/graphql/generated/bases';
import * as fromSelectors from '@appStore/selectors';
import { environment } from 'environments/environment';
import { FlowDirective, FlowFile } from '@flowjs/ngx-flow';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { QueueFileUploaderService } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.service';
import { MediaFile } from 'app/blocks/graphql/generated/gqlServices';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralActivityMediaFiles } from 'app/patients/patient/general/generalActivityMediaFiles';
import { createMediaFileGqlCallback } from 'app/blocks/graphql/callback/createMediaFileGqlCallback';
import { Apollo } from 'apollo-angular';
import { AngularEditorConfiguration } from '@appStore/model/editor-config';
import {TicketStatus} from 'app/blocks/enum/ticket-status';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {
  @ViewChild('form', { static: true }) public form: NgForm;  
  @ViewChild('mediaFlow', { static: false }) mediaFlow: FlowDirective;

  private _unsubscribeAll: Subject<any>;
  private savingDelay = 3000;
  public onTicketChange: Subject<any>;
  public ticket: TicketBase = new TicketBase();
  public errors = [];
  public isDirty = false;
  public mediaSelectMode = false;
  public mediaEndpoint: string;
  private activityMediaFiles$ = new BehaviorSubject<MediaFile[]>([]);
  public activityFiles=[];
  FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;
  public config:AngularEditorConfiguration;
  ticketStatus: TicketStatus;

  constructor(
    private _router: Router,
    private _store: Store<fromRoot.AppState>,
    private _formUtilsService: FormUtilsService,
    private _activatedRoute: ActivatedRoute,    
    private _queueFileUploaderService: QueueFileUploaderService,
    private snackBar: MatSnackBar,
    private _apollo: Apollo,
  ) { 
    this.config=AngularEditorConfiguration.config;
    this._unsubscribeAll = new Subject();
    this.onTicketChange = new Subject();
    this.mediaEndpoint = environment.mediaEndpoint;
    this._store.dispatch(fromActions.resetTicket());
    this.ticketStatus = TicketStatus.status;
  }

  ngOnInit(): void {

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
      // @ On save locally
      this._store.select(fromSelectors.TicketSavedLocallySelector)
      .pipe(
          takeUntil(this._unsubscribeAll),
          filter(data => !!data)

      )
      .subscribe(_ => {
          this._formUtilsService.formSavedLocally();
          this._formUtilsService.popup('No internet access, Saved locally');
      });
        // @ On  failure
        this._store.select(fromSelectors.TicketError)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((errors) => this._formUtilsService.handleErrors(errors));
        
        // @ On update
        this._store.select(fromSelectors.updateTicketSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (this.ticket.id) {
                    this.onUpdateTicketCallback(data);
                }
            });

        // @ On create patient success
        this._store.select(fromSelectors.createTicketSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(data => {
                if (data.id) {
                    this.onCreateTicketCallback(data);
                }

            });
             

    this.watchFormChangesProcessor();
    this.watchTicketChangesProcessor();
  }
  ngAfterViewInit(): void {

    // @ Add file metadata to request (query)
    // @ File metadata were attached to each file via 'filesSubmitted' Event fn
    this.mediaFlow.flowJs.opts.query = function (file) {

        const queryObj = {
            id: file['id'],
            name: file['name'],
            patientId: file['patientId'],
            speciality: file['speciality'],
            conditionId: file['conditionId'],
            activityType: file['activityType'],
            ticketNumber:file['ticketNumber'],
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

                files_.map((file) => {

                    // @ should be (image or pdf ) and condition id is set
                    const isValidFile = this.isValidFile(file);

                    // @ file is not valid then removefile
                    if (!isValidFile) {
                        this.mediaFlow.flowJs.removeFile(file);

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
                        file['ticketNumber'] = this.ticket.ticketNumber;
                        file['tags'] = new DataPartitionBase();
                        file['systemTagging'] = [
                            FileSystemTagsEnum.ticket
                        ];

                        // @ push tags like (physicalexam, radio , lab ) to systemTags
                        if (event.event[1]) {

                            const event_ = event.event[1];
                            const element = event_.target;

                            // @ case button add file clicked, the button hold the tag name
                            if (event_.type === 'change') {
                                // @ Ticket tag
                                if (element && element.id === FileSystemTagsEnum.ticket) {
                                    file['systemTagging'].push(FileSystemTagsEnum.ticket);
                                }                              
                            }

                            // @ case the file was dropped then handle the tag name
                            if (element && event_.type === 'drop') {
                                // @ get the element that handle the tag name
                                // let taggedElement = $(element).closest('.auto-tagged-file')
                                // if (taggedElement.length) taggedElement = taggedElement[0]

                                const taggedElement = element.closest('.auto-tagged-file');

                                // @  physical exam tag
                                if (taggedElement && taggedElement.id === FileSystemTagsEnum.ticket) {
                                    file['systemTagging'].push(FileSystemTagsEnum.ticket);
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
                    mediaFile.ticketNumber = file.ticketNumber || null;
                    mediaFile.isDeleted = false;
                    mediaFile.systemTagging = file.systemTagging;
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
    this.onTicketChange.complete();
  }
 
  onDone(): void {
//this.ticket.isRead=false;
    if (this.ticket.id) {
      this._store.dispatch(fromActions.updateTicket({ ticket: this.ticket,broadcast:true }))
    } else {
      //this.ticket.id = AppUtils.GenerateObjectId();
      this.ticket.ticketNumber = AppUtils.GenerateObjectId();
      this._store.dispatch(fromActions.createTicket({ ticket: this.ticket }))
    }

    this._router.navigate(['..'], { relativeTo: this._activatedRoute });
  }

  private watchFormChangesProcessor(): void {
    this.form
      .valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.save();
      });
  }
  save() {
    setTimeout(() => {
      if (this.form.dirty) {
        this.onTicketChange.next(this.ticket);
      }
    }, 0);
  }
  
  private watchTicketChangesProcessor(): void {
    this.onTicketChange
      .pipe(takeUntil(this._unsubscribeAll))
      .pipe(
        // @ validate the form and skip if invalid
        filter(() => this._formUtilsService.isValid(this.form)),
        tap(_ => this.formPendingProcessor()),
        debounceTime(this.savingDelay),
        tap(() => {
            this.sendXhrProcessor();
        })
    )
    .subscribe();
        
  }

  private formPendingProcessor() {
    this._formUtilsService.formPending();
    this.isDirty = true;
  }

  private sendXhrProcessor() {
    this._formUtilsService.formSaving();

    if (this.ticket.id) {
      this.ticket.isReadByAdmin=false;
      this.ticket.isReadByClient=true;
      this._store.dispatch(fromActions.updateTicket({ ticket: this.ticket,broadcast:true }))
    } else {
      this.ticket.ticketNumber = AppUtils.GenerateObjectId();
      const ticket = Object.assign({}, this.ticket);
      ticket.status=this.ticketStatus[0].id;   //  id: 0,  name: 'Opened',
      ticket.isReadByAdmin=false;
      ticket.isReadByClient=true;
      this._store.dispatch(fromActions.createTicket({ ticket: ticket }))

    }
  }

  private onCreateTicketCallback(response) {
    this.errors=[];
    this._formUtilsService.formSaved();
    //AppUtils.SetFormPrestine(this.form);
    this._formUtilsService.popup('Ticket created.');
    // @ Set form as prestine to avoid update conflicts
    this.ticket = AppUtils.mergeForForms(this.ticket, response);
    console.log('ticket Created',this.ticket)
  }

  private onUpdateTicketCallback(response) {
    this.errors=[];
    this._formUtilsService.formSaved();
    AppUtils.SetFormPrestine(this.form);
    this.ticket = AppUtils.mergeForForms(this.ticket, response);
    // @ Set form as prestine to avoid update conflicts
    AppUtils.SetFormPrestine(this.form);
    console.log('ticket updated',this.ticket)
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
    } else if (!this.ticket.id) {
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
  if (mediafile.activityType || mediafile.activityId || mediafile.conditionId) { return false; }

  if (
      mediafile.ticketNumber === this.ticket.ticketNumber 
  ) {
      return true;
  }

  return false;
}
rebuildMediaFiles(files: MediaFile[]) {

  const conditionFiles=[];
   

  if (!files || !files.length) { return conditionFiles; }

  files.map((file) => {

      if (file.systemTagging.indexOf(FileSystemTagsEnum.ticket) > -1) {
          conditionFiles.push(file);
      }

     
  });
  this.ticket.attachFile=true;
  this.onTicketChange.next();
  return conditionFiles;

}

}
