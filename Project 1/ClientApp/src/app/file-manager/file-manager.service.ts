import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import flow from 'lodash/fp/flow';
import values from 'lodash/fp/values';
import map from 'lodash/fp/map';
import groupBy from'lodash/fp/groupBy';
import { MediaFile, MediaFilesGQL } from 'app/blocks/graphql/generated/gqlServices';

export interface PatientMediaObject {
    patientId: string;
    patientName: string;
    pool?: (MediaFile)[] | null;
    categorizedFiles?: (MediaFile)[] | null;
    imagesCount: number;
    pdfCount: number;
}
export interface Files {
    images?: (MediaFile)[] | null;
    pdf?: (MediaFile)[] | null;
}

@Injectable()
export class FileManagerService implements Resolve<any> {
    onFilesChanged: Subject<any>;
    onFileSelected: BehaviorSubject<any>;
    onPatientsFilesChanged: BehaviorSubject<any>;
    onPoolFilesChanged: BehaviorSubject<any>;
    onFilesStatisticsChanged: BehaviorSubject<any>;
    onPatientFilter: Subject<any>;
    onPatientFilterClear: Subject<any>;

    // @ backup the files
    private files: MediaFile[] = [];
    // @ always retrive filteredFiles
    private filteredFiles: MediaFile[] = [];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private _mediaFilesGQL: MediaFilesGQL) {
        // Set the defaults
        this.onFilesChanged = new Subject();
        this.onFileSelected = new BehaviorSubject({});
        this.onPatientsFilesChanged = new BehaviorSubject({});
        this.onPoolFilesChanged = new BehaviorSubject({});
        this.onFilesStatisticsChanged = new BehaviorSubject({});
        this.onPatientFilter = new Subject();
        this.onPatientFilterClear = new Subject();

        // this.onPatientFilter.subscribe((patientId: string) => {
        //     if (patientId) {
        //         const _filtered: Array<MediaFile> = this.files.filter(obj => obj.patientId === patientId);
        //         if (_filtered.length) {
        //             this.filteredFiles = _filtered;
        //             this.restructureFiles();
        //         } else {
        //             // @ reset
        //             this.filteredFiles = [];
        //             this.restructureFiles();
        //         }
        //     }
        // });
    }

    /**
     * Resolver
     * @DEPRECATED
     * 
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getFiles()]).then(([files]) => {
                Promise.resolve();
            }, reject);
        });
    }

    /**
     * Get files
     * @DEPRECATED
     * @returns {Promise<any>}
     */
    getFiles() {
        this._mediaFilesGQL.watch().valueChanges.subscribe(response => {
            if (response.data && response.data.mediaFiles) {
                this.files = response.data.mediaFiles;

                // @ todo : temporary remove " uploads/ "
                const differed = this.files.map(_file => {
                    const file = Object.assign({}, _file);
                    if (file.path.startsWith('uploads/')) { 
                        file.path = file.path.split('uploads/')[1]; 
                    }

                    return file;
                });

                Promise.all(differed).then(files => {
                    this.files = files;
                    this.filteredFiles = files;
                    this.restructureFiles();
                });
            }
        });
    }

    

    /**
     *
     *
     * @ REMARK : DEPRECATED
     * @memberOf FileManagerService
     * Recall files from server
     */
    refresh() {
        this.getFiles();
    }


    /**
     *
     *
     * @DEPRECATED
     * @memberOf FileManagerService
     * emits :  1. patients with media files
     *          2. tenant pool media files
     *          3. patient media files statistics
     */
    restructureFiles() {
        const patientsFiles = [];
        const pool: MediaFile[] = [];
        const statistics = { images: 0, pdf: 0 };

         flow(
             values,
            groupBy('patientId'),
            map((files, patientId, collection) => {
                // @ this group is existing patient
                if (files.length > 0 && patientId !== 'null' && patientId != null && patientId !== '') {
                    const patientObj: PatientMediaObject = <PatientMediaObject>{ pool: [], categorizedFiles: [], imagesCount: 0, pdfCount: 0 };
                    patientObj.patientId = files[0].patientId;
                    patientObj.patientName = files[0].patientName;
                    flow(
                        values,
                        map(_file => {
                            // console.log(file)
                            const file = Object.assign({}, _file);

                            // @ seperate files between pool/categorized
                            if (file.speciality == null || file.speciality === '') {
                                patientObj.pool.push(file);
                            } else {
                                patientObj.categorizedFiles.push(file);
                            }

                            // @ calculate statistics
                            if (file.type != null) {
                                if (file.type.startsWith('image')) {
                                    statistics.images++;
                                    patientObj.imagesCount++;
                                }

                                if (!file.type != null && file.type.startsWith('application/pdf')) {
                                    patientObj.pdfCount++;
                                    statistics.pdf++;
                                }
                            }
                        })
                        )(files)
                    patientsFiles.push(patientObj);
                }
                // @ this group is pool group
                else {
                    pool.push(...files);
                }
            })
         )(this.filteredFiles)

        // chain(this.filteredFiles)
        //     .groupBy('patientId')
        //     .map((files, patientId, collection) => {
        //         // @ this group is existing patient
        //         if (files.length > 0 && patientId !== 'null' && patientId != null && patientId !== '') {
        //             const patientObj: PatientMediaObject = <PatientMediaObject>{ pool: [], categorizedFiles: [], imagesCount: 0, pdfCount: 0 };
        //             patientObj.patientId = files[0].patientId;
        //             patientObj.patientName = files[0].patientName;
        //             chain(files)
        //                 .map(_file => {
        //                     // console.log(file)
        //                     const file = Object.assign({}, _file);

        //                     // @ seperate files between pool/categorized
        //                     if (file.speciality == null || file.speciality === '') {
        //                         patientObj.pool.push(file);
        //                     } else {
        //                         patientObj.categorizedFiles.push(file);
        //                     }

        //                     // @ calculate statistics
        //                     if (file.type != null) {
        //                         if (file.type.startsWith('image')) {
        //                             statistics.images++;
        //                             patientObj.imagesCount++;
        //                         }

        //                         if (!file.type != null && file.type.startsWith('application/pdf')) {
        //                             patientObj.pdfCount++;
        //                             statistics.pdf++;
        //                         }
        //                     }
        //                 })
        //                 .value();
        //             patientsFiles.push(patientObj);
        //         }
        //         // @ this group is pool group
        //         else {
        //             pool.push(...files);
        //         }
        //     })
        //     .value();

        this.onPatientsFilesChanged.next(patientsFiles);
        this.onPoolFilesChanged.next(pool);
        this.onFilesStatisticsChanged.next(statistics);
    }
}
