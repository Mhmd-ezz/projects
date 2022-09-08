import { Injectable } from '@angular/core';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import { LocalDbStorenameInstanceEnum } from 'app/blocks/enum/local-db-storename-instance.enum';
import { MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { FlowFileMetadata } from 'app/blocks/interface/flow-file-metadata';
import { TenantsService } from 'app/blocks/services/tenants.service';
import imageCompression from 'browser-image-compression';
import { del, get, keys, set, Store } from 'idb-keyval';
import { BehaviorSubject, Subject } from 'rxjs';
import { StoredFile } from './../../interface/stored-file';
import { AppUtils } from './../../utils/index';
import * as fromRoot from '../../../store/reducers';
import * as fromSelectors from '../../../store/selectors';
import { Store as NgrxStore }  from '@ngrx/store';
import { filter } from 'rxjs/operators';

// @ Notes: 
//  1. Google chrome desktop indexeddb supports blob object type
//  2. IOS safari only 10+ support indexeddb
//  3. Safari doesn't support indexeddb blob object type, but accept arrayBuffer
//  4. This service will only store file as arrayBuffer if the browser supports indexeddb
@Injectable({
    providedIn: 'root'
})
export class QueueFileUploaderService {

    private fileAddedSubject$: Subject<StoredFile> = new Subject<StoredFile>();
    public fileAdded$ = this.fileAddedSubject$.asObservable();

    private filesSubject$: BehaviorSubject<StoredFile[]> = new BehaviorSubject<StoredFile[]>([]);
    public files$ = this.filesSubject$.asObservable();

    public fileUploadedSubject$: Subject<MediaFileBase> = new Subject<MediaFileBase>();
    public fileUploaded$ = this.fileUploadedSubject$.asObservable();

    public filesQueueStore;
    public isIndexedDbSupported: boolean;

    constructor(
        private _tenantsService: TenantsService,
        private _store: NgrxStore<fromRoot.AppState>,
    ) {

        this.isIndexedDbSupported = AppUtils.isIndexedDbSupported()

        this._store.select(fromSelectors.getTenant)
        .pipe(filter(x => x != null))
        .subscribe(tenant => {

            setTimeout(() => {
                this.filesQueueStore = new Store(
                    `${LocalDbInstances.MedciliaMedia}-${tenant.id}`,
                    `${LocalDbStorenameInstanceEnum.filesQueue}`
                );

                setTimeout(() => {
                    this.getFiles()
                }, 10000);
            }, 100);
        })

    }

    // @ Service entry point, components will call this method to add files
    async uploadFile(flowFile: FlowFileMetadata) {

        var options = {
            //maxSizeMB: 0.7,
            maxWidthOrHeight: 1500,
            useWebWorker: true
        }

        let imageBlob = await imageCompression(flowFile.file, options)

        // @ Convert file to arrayBuffer
        this.blobToArrayBuffer(imageBlob).then(blob => {

            // @ file will be stored as arrayBuffer
            let storedFile: StoredFile = {
                file: blob,
                metadata: {
                    id: flowFile.id,
                    name: flowFile.name,
                    patientId: flowFile.patientId,
                    speciality: flowFile.speciality,
                    conditionId: flowFile.conditionId,
                    activityType: flowFile.activityType,
                    activityId: flowFile.activityId,
                    isDeleted: flowFile.isDeleted,
                    type: flowFile.type,
                    tags: flowFile.tags,
                    systemTagging: flowFile.systemTagging,
                    ticketNumber:flowFile.ticketNumber
                }
            }

            // @ If browser supports indexeddb, then store the file
            if (this.isIndexedDbSupported) {
                set(storedFile.metadata.id, storedFile, this.filesQueueStore)
                    .then((value) => {
                        this.fileAddedSubject$.next(storedFile)
                        this.filesSubject$.next([...this.filesSubject$.getValue(), storedFile])
                    })
            } else {
                // @ Browser doesn't supports indexed, then by pass store and emit file to subscribers
                this.fileAddedSubject$.next(storedFile)
                this.filesSubject$.next([...this.filesSubject$.getValue(), storedFile])
            }

        })
    }


    /**
     * @REMARK : KEY SHOULD BE THE FILE NAME
     * 
     * @param {string} key 
     * @returns 
     * 
     * @memberOf QueueFileUploaderService
     */
    removeFile(key: string) {


        return new Promise<any>((resolve, reject) => {

            del(key, this.filesQueueStore)
                .then(() => {
                    let files = this.filesSubject$.getValue().filter((obj) => obj.metadata.id != key)
                    this.filesSubject$.next(files)
                    Promise.resolve()
                })
                .catch(function (err) {
                    // @ Even if file was not stored, we still need to emit update to subscribers to remove file
                    let files = this.filesSubject$.getValue().filter((obj) => obj.metadata.id != key)
                    this.filesSubject$.next(files)
                    // This code runs if there were any errors
                    console.error("[ERROR]: unable to remove file", err);
                    Promise.resolve()
                });
        });

    }


    getFiles() {

        return new Promise<StoredFile[]>((resolve, reject) => {

            this.iterateStore().then(files => {
                this.filesSubject$.next(files)
                resolve(files);
            })
        });
    }

    blobToArrayBuffer(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
                resolve(reader.result);
            });
            reader.addEventListener('error', reject);
            reader.readAsArrayBuffer(blob);
        });
    }

    private iterateStore() {

        return new Promise<StoredFile[]>((resolve, reject) => {

            let files: StoredFile[] = []

            keys(this.filesQueueStore)
                .then(async keys => {

                    for (const key of keys) {
                        let file: any = await get(key, this.filesQueueStore)
                        files.push(file)
                    }
                    resolve(files)
                })
        })
    }
}
