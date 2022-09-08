// import { Injectable } from "@angular/core";
// import { Apollo } from "apollo-angular";
// // import { ApolloCache } from "apollo-cache";
// // import ApolloClient from "apollo-client";
// import { lightPatientsQ } from "app/blocks/graphql/gqlQueries";
// import { AppUtils } from "app/blocks/utils";
// import gql from "graphql-tag";
// import { BehaviorSubject, Observable, of, empty } from "rxjs";
// import { LightPatient } from "../../models/LightPatient";
// import { lightPatientFragment } from "../gqlFragments";
// import { ISearchOptions } from "app/blocks/interface/search-options";
// import { FuzzySearchService } from "app/blocks/pipes/fuzzy-search.service";
// import { catchError, tap, map } from "rxjs/operators";
// import { PatientService } from "app/patients/patient.service";
// import { IFuzzyType } from "app/blocks/interface/IFuzztType";
// import { IDataResponse } from "app/blocks/interface/IDataResponse";
// import { ApolloCache, ApolloClient } from "@apollo/client/core";

// @Injectable({
//     providedIn: "root"
// })
// export class LightPatientsStoreService {
//     // @ key which lives in root_query that holds all patients and args is empty
//     private ObjectKey: string = "lightPatients({})";


//     private client: ApolloClient<any>;
//     private cache: ApolloCache<any>;
//     private searchOptionsDefaults: ISearchOptions = {
//         keys: ["name","telephone"],
//         fuzzySearchOptions: {},
//         extractOriginalItem: false,
//         outputLimit: 5000
//     };

//     private patientsSubject: BehaviorSubject<LightPatient[]> = new BehaviorSubject<LightPatient[]>([]);

//     constructor(
//         private _apollo: Apollo,
//         private _fuzzySearch: FuzzySearchService,
//         private _patientService: PatientService,

//     ) {
//         this.client = this._apollo.getClient();
//         this.cache = this.client.cache;
//     }


//     /**
//      *
//      * Returns all patients found in store as array of object reference
//      *
//      * @private
//      * @returns {any[]}
//      *
//      * @memberOf PatientsStoreService
//      */
//     public getStoredPatients(): any[] {
//         let storedPatients = [];

//         let store: any[] = this.client.cache["data"]["data"];

//         for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
//             if (keys[j].startsWith("LightPatient:"))
//                 storedPatients.push({
//                     generated: false,
//                     id: keys[j],
//                     type: "id",
//                     typename: "Patient"
//                 });
//         }

//         // console.time("readPatients-loop3")
//         // //@ read store and find for patients
//         // Object.keys(this.client.cache["data"]["data"]).map((key, index) => {
//         //     // @ looking for patients
//         //     if (key.startsWith("LightPatient:"))
//         //         storedPatients.push({
//         //             generated: false,
//         //             id: key,
//         //             type: "id",
//         //             typename: "Patient"
//         //         })
//         // })
//         // console.timeEnd("readPatients-loop3")

//         return storedPatients;
//     }

//     /**
//      * return array of objects refernces found in root query (patients)
//      *
//      * @private
//      * @returns {any[]}
//      *
//      * @memberOf PatientsStoreService
//      */
//     public getRootQueryPatients(): any[] {

//         let rootQuery = [];
//         let patientsArray: LightPatient[] | null | undefined = this.client.cache["data"]["data"][
//             "ROOT_QUERY"
//         ][this.ObjectKey];

//         if (patientsArray && patientsArray.length) rootQuery = Object.assign([], patientsArray);

//         return rootQuery;
//     }

//     /**
//      * Read patients from ROOT_QUERY with no args (variables : {}) and create lightPatient query if not found in ROOTQUERY
//      *
//      * @returns {LightPatient[]}
//      *
//      * @memberOf PatientsStoreService
//      */
//     readPatients(): LightPatient[] {
//         let patients: LightPatient[] = [];

//         try {
//             const patientsObj: any = this.client.readQuery({
//                 query: lightPatientsQ,
//                 variables: {}
//             });

//             if (patientsObj && patientsObj.patients) patients = patientsObj.patients;
//         } catch (err) {
//             console.log(err);
//             // @ if patients rootQuery not found
//             this.client.writeQuery({
//                 query: lightPatientsQ,
//                 variables: {},
//                 data: { lightPatients: [] }
//             });
//         }
//         return patients;
//     }

//     writeFragment(patient: LightPatient): void {
//         this.client.writeFragment({
//             id: "LightPatient:" + patient.id,
//             fragment: gql`
//                 ${lightPatientFragment}
//             `,
//             data: patient
//         });
//     }

//     /**
//      * 1. calling updateRootQuery() will update PatientsModfied date in rootQuery
//      * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
//      *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
//      *         then call updateRootQuery()
//      *
//      *
//      * @memberOf PatientsStoreService
//      */
//     updateRootQuery(): void {
//         // this.client.cache.writeData({ data: { PatientsModfied: new Date().toISOString() } });
//     }

//     /**
//      * 
//      * @Remark : its very important to specifiy ISearchOptions.extractOriginalItem : boolean
//      * @Remark : its very important to specifiy Generic type IfuzzyType<LightPatient> | LightPatient
//      * 
//      * 
//      * @param {string}  filter
//      * @param {ISearchOptions} options 
//      * @returns {IDataResponse<T>}  T could be IfuzzyType<LightPatient> or LightPatient
//      * 
//      * 
//      * @memberOf LightPatientsStoreService
//      */
//     public search = <T>(filter: string, options?: ISearchOptions) =>

//         new Observable<IDataResponse<T>>((observer) => {

//             var gqlResponse: IDataResponse<T> = {
//                 loading: false,
//                 data: [],
//             }

//             // ----------------------------------------
//             // GET DATA FROM LOCAL STORAGE
//             // ----------------------------------------

//             if (this.isCacheValid()) {

//                 try {
//                     let lightPatients = this.getSerializedFromStore()
                   
//                     let filteredPatients: T[] = this.fuzzySearch(lightPatients, filter, options)
//                     console.log("GET DATA FROM LOCAL STORAGE After fuzzySearch",filteredPatients)
//                     var gqlResponse: IDataResponse<T> = {
//                         loading: true,
//                         data: filteredPatients,
//                     }
//                     observer.next(gqlResponse)
//                 } catch (error) {
//                     console.error('[ERROR]: LightPatientsStoreService > search ' + error);
//                 }


//             } else {
//                 this.validateCache()
//             }

//             // ----------------------------------------
//             // GET DATA FROM SERVER
//             // ----------------------------------------
//             this.getFormServer(filter)
//                 .pipe(
//                     catchError((error, source) => {
//                         observer.error(error)
//                         return empty()
//                     })
//                 )
//                 .subscribe(
//                     (patients) => {
                       
//                         if (patients) {
//                             console.log("get data from server-patients",patients)
//                             // @ deserializeLightPatients may return empty array if no new patients added to store 
//                             let patients_ = this.deserializeLightPatients(patients)                            
//                             if (!patients_ || !patients_.length) {

//                                 gqlResponse.loading = false

//                                 observer.next(gqlResponse)
//                             } else {
//                                 let filtered: T[] = this.fuzzySearch(patients_, filter, options)
//                                 console.log("get data from server-filtered after fuzzy Search",filtered)
//                                 gqlResponse.loading = false
//                                 gqlResponse.data = filtered
//                                 observer.next(gqlResponse)
//                             }
//                         }
//                     }
//                 )
//         })

//     /**
//      * @Remark : Update or add Lightpatients to fragments store and return all Lightpatients in store
//      * 
//      * 
//      * 
//      * @param {LightPatient[]} lightPatients 
//      * @returns {LightPatient[]} 
//      * 
//      * @memberOf LightPatientsStoreService
//      */
//     deserializeLightPatients(lightPatients: LightPatient[]): LightPatient[] {
//         if (!lightPatients.length) return [];

//         let GeneratedObjectKey = this.ObjectKey

//         // @ load all fragments
//         let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

//         // @ this array will hold new patients that are not found in store to be persisted in store later on
//         let newItemsRef: any[] = [];

//         lightPatients.map((patient: LightPatient, index) => {

//             // @ update or add fragment
//             this.writeFragment(patient);

//             // @ check if patient exists in store (fragment)
//             if (FragmentsStore["LightPatient:" + patient.id]) {
//             } else {

//                 // @ then prepare this patient object reference to be pushed
//                 newItemsRef.push({
//                     generated: false,
//                     id: "LightPatient:" + patient.id,
//                     type: "id",
//                     typename: "Patient"
//                 });
//             }
//         });


//         // @ new patients need to be pushed to ROOT_QUERY
//         if (newItemsRef.length) {
//             // @ push new lighPatients to ROOT_QUERY
//             this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newItemsRef);

//             // @ Important : update in order changes take effect
//             this.updateRootQuery();
//         }

//         // @ broadcast new list, bcs there might be changes on patients
//         let patients_ = this.readPatients();
//         return patients_ || [];
//     }

//     /**
//      * Compare store lightPatient (ref) with query lightPatients according to group
//      * if not equal will return result and update query lightPatient with latest store items
//      * then return all patients of type patient
//      * 
//      * @returns {LightPatient[]} 
//      * 
//      * @memberOf LightPatientsStoreService
//      */
//     getSerializedFromStore(): LightPatient[] {

//         let GeneratedObjectKey = this.ObjectKey

//         // @ records found in store
//         let StoredItems = this.getStoredPatients();

//         // @ Items found in RootQuery
//         let RootQueryItems = this.getRootQueryPatients();

//         // @ if RootQueryLightPatients doesn't contain all Lightpatients found in store
//         if (StoredItems.length != RootQueryItems.length) {
//             // @ update root query -> Lightpatients
//             this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;


//             // @ then update rootQuery
//             this.updateRootQuery();

//             let result: LightPatient[] = this.readPatients();

//             if (result)
//                 return result

//         } else {
//             let result: LightPatient[] = this.readPatients();

//             if (result)
//                 return result
//         }
//     }

//     private getFormServer(filterStr: string) {      
//         return this._patientService
//             .getLightPatients(filterStr, 1, 10, "", false, { fetchPolicy: "no-cache" })
//             .pipe(
//                 map(({ data }) => data.patients ? data.patients : []),
//                 // catchError((error, source) => {
//                 //     console.error(error);
//                 //     return of([]);
//                 //     return source;
//                 // })
//             )
//     }

//     /**
//      * 
//      * 
//      * @private
//      * @returns 
//      * 
//      * @memberOf LightPatientsStoreService
//      */
//     private isCacheValid(): boolean {
//         if (this.cache["data"] &&
//             this.cache["data"]["data"] &&
//             this.cache["data"]["data"]["ROOT_QUERY"] &&
//             this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey])
//             return true

//         return false
//     }

//     private validateCache() {
//         // @ If cache is totaly empty then data.data and data.data.ROOT_QUERY is empty
//         // @ To avoid throwing blocking error
//         // @ Write a custom value to cache to fill with some data
//         this.updateRootQuery()
//         this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey] = []
//         // @ write custom value to update cache
//         this.updateRootQuery()
//     }


//     private fuzzySearch(collection: LightPatient[], filter: string, options?: ISearchOptions) {

//         let searchOptions = this.searchOptionsDefaults;
//         Object.assign(searchOptions, this.searchOptionsDefaults, options);

//         return this._fuzzySearch.search(
//             collection,
//             filter,
//             searchOptions.keys,
//             searchOptions,

//         );
//     }

//     private addNonPatientDummyData() {
//         let dataCache = this.cache["data"];
//         for (let i = 0; i < 30000; i++) {
//             dataCache.set(`LightData:${i}`, { data: i });
//         }
//     }

//     private addDummyPatientsData(count) {
//         // @ at least 1 patient in store to clone
//         let PatientKey = Object.keys(this.client.cache["data"]["data"]).find(x =>
//             x.startsWith("LightPatient:")
//         );

//         if (!PatientKey) return;

//         let ExtractedPatient: LightPatient = this.client.readFragment({
//             fragment: gql`
//                 ${lightPatientFragment}
//             `,
//             id: PatientKey
//         });

//         for (let i = 0; i < count; i++) {
//             let patient: LightPatient = Object.assign({}, ExtractedPatient);

//             patient.id = AppUtils.GenerateObjectId();

//             this.client.writeFragment({
//                 id: "LightPatient:" + patient.id,
//                 fragment: gql`
//                     ${lightPatientFragment}
//                 `,
//                 data: patient
//             });
//         }
//     }
// }
