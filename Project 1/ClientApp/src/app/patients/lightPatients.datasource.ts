// import { CollectionViewer } from '@angular/cdk/collections';
// import { Injectable } from '@angular/core';
// import { Subscription ,  BehaviorSubject ,  Observable ,  of } from 'rxjs';
// import { catchError, filter, tap } from 'rxjs/operators';
// import { LightPatientsStoreService } from '../blocks/graphql/store/lightPatientsStore.service';
// import { LightPatient } from '../blocks/models/LightPatient';
// import { PatientService } from './patient.service';
// import { ISearchOptions } from 'app/blocks/interface/search-options';

// @Injectable()
// export class LightPatientsDataSource {
//     private patientsSubject = new BehaviorSubject<LightPatient[]>([]);

//     private loadingSubject = new BehaviorSubject<boolean>(false);
//     public loading$ = this.loadingSubject.asObservable();

//     private isNetworkSubject = new BehaviorSubject<boolean>(false);
//     public isNetwork$ = this.isNetworkSubject;

//     private totalFilteredPatientsSubject = new BehaviorSubject<number>(0);
//     public totalFilteredPatients$ = this.totalFilteredPatientsSubject.asObservable();

//     private totalSubject = new BehaviorSubject<number>(0);
//     public total$ = this.totalSubject.asObservable();

//     private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
//     public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

//     // @ user isSearchStatus to unsubscribe either loadPatients or searchPatient
//     private isSearchStatus = false;
//     private filtered: LightPatient[] = [];
//     private _patientsService$: Subscription;
//     private _patientsStoreService$: Subscription;
//     private searchOptionsDefaults: ISearchOptions = {
//         keys: ['name', 'telephone'],
//         fuzzySearchOptions: {},
//         extractOriginalItem: true,
//         outputLimit: 5000
//     };

//     constructor(
//         private _patientsService: PatientService,
//         private _lightPatientsStoreService: LightPatientsStoreService,
//     ) { }

//     loadPatients(
//         filterStr: string,
//         // sortDirection: string,
//         page: number | null,
//         size: number | null,
//         orderBy: string | null,
//         descending: string | null
//     ) {
//         // @ update status to prevent searchpatient from subscribing
//         // @ filter observable by isSearchStatus to prevent overwrite search data
//         this.isSearchStatus = false;

//         this.loadingSubject.next(true);

//         // @ Get patients
//         this._patientsService
//             .getLightPatients(filterStr, page, size, orderBy, descending)
//             .pipe(
//                 filter(() => !this.isSearchStatus),
//                 tap((res: any) => { }),
//                 catchError((error, source) => {
//                     this.loadingSubject.next(false)
//                     return of([]);
//                     return source;
//                 }),
//             )
//             .subscribe(
//                 ({ data, loading }) => {
//                     if (data && data.patients) {

//                         // @ Loading will be active until server return a response
//                         if (!loading)
//                             this.loadingSubject.next(false)

//                         // @ Because of the difficulty of returning wrapped pageInfo from graphql
//                         // @ then, try to handle total records from response
//                         // @ just in case server responded
//                         this.patientsSubject.next(data.patients);

//                         // @ no recordss found
//                         if (data.patients.length > 0) { this.noMoreRecordsSubject.next(false); }
//                         else { this.noMoreRecordsSubject.next(true); }

//                     }
//                 },
//                 error => {
//                     console.log('error', error);
//                 }
//             );

//         this._patientsService
//             .getPatientsTotal(filterStr, page, size, orderBy, descending)
//             .pipe(
//                 filter(() => !this.isSearchStatus),
//             )
//             .subscribe(({ data, loading }) => {

//                 // // @ Over all patients count when filter is empty
//                 // if (!filterStr && data && data.patientsTotal >= 0)
//                 //     this.totalFilteredPatientsSubject.next(data.patientsTotal)

//                 if (data && data.patientsTotal) {
//                     this.totalSubject.next(data.patientsTotal);
//                 }

//             })
//     }

//     /**
//      *
//      * @REMARK
//      * step 1: read patients from store as fragments then filter result by filterStr
//      * step 2: read patients from server and push result to store and emit result back to ui
//      *
//      * @param {string} filterStr
//      * @param {(number | null)} [page=0]
//      * @param {(number | null)} [size=30]
//      *
//      * @memberOf PatientsDataSource
//      */
//     searchPatient(
//         filterStr: string,
//         options?: ISearchOptions,
//         page: number | null = 1,
//         size: number | null = 20,
//     ) {

//         this.loadingSubject.next(true)

//         // @ update status to prevent loadPatients from subscribing
//         this.isSearchStatus = true;

//         const searchOptions = this.searchOptionsDefaults;
//         Object.assign(searchOptions, this.searchOptionsDefaults, options);

//         this._lightPatientsStoreService
//             .search<LightPatient>(filterStr, searchOptions)
//             .pipe(
//                 // tap(() => this.loadingSubject.next(false)),
//                 filter(() => this.isSearchStatus),
//                 catchError((error, source) => {
//                     return of({ data: null, loading: null });
//                     return source;
//                 }),
//             )
//             .subscribe(({ data, loading }) => {
//                 if (!loading)
//                     this.loadingSubject.next(false)

//                 if (data != null) {
//                     this.totalSubject.next(data.length);
//                     this.patientsSubject.next(data);
//                 }
//             });
//     }

//     connect(): Observable<LightPatient[]> {
//         return this.patientsSubject.asObservable();
//     }

//     disconnect(collectionViewer: CollectionViewer): void {
//         this.noMoreRecordsSubject.complete();
//         this.patientsSubject.complete();
//         this.loadingSubject.complete();
//         this.totalSubject.complete();
//     }
// }
