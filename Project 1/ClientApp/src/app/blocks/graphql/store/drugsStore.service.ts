import { drugsQ } from './../gqlQueries';
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
// import { ApolloCache } from "apollo-cache";
// import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { BehaviorSubject, Observable, empty } from "rxjs";
import { Drug } from "../generated/gqlServices";
import { drugFragment } from '../gqlFragments';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { IDataResponse } from 'app/blocks/interface/IDataResponse';
import { catchError, map } from 'rxjs/operators';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { DrugsService } from 'app/settings/durgs/drugs.service';
import { ApolloCache, ApolloClient } from '@apollo/client/core';

@Injectable({
    providedIn: "root"
})
export class DrugsStoreService {
    // @ key which lives in root_query that holds all drugs and args is empty
    private ObjectKey: string = "drugs({})";

    private client: ApolloClient<any>;
    private cache: ApolloCache<any>;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };

    private drugsSubject: BehaviorSubject<Drug[]> = new BehaviorSubject<Drug[]>([]);

    constructor(
        private _apollo: Apollo,
        private _fuzzySearch: FuzzySearchService,
        private _drugsService: DrugsService,

    ) {
        this.client = this._apollo.getClient();
        this.cache = this.client.cache;
    }


    /**
     * @DEPRICATED
     * 
     * @returns {Observable<Drug[]>} 
     * 
     * @memberOf DrugsStoreService
     */
    getDrugs(): Observable<Drug[]> {
        // @ records found in store
        let StoredItems = this.getStoredDrugs();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryDrugs();

        // @ if RootQueryDrugs doesn't contain all drugs found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> drugs
            this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey] = StoredItems;

            // @ then update rootQuery
            this.updateRootQuery();

            let result: Drug[] = this.readDrugs();

            if (result && result.length) {
                this.drugsSubject.next(result);
                return this.drugsSubject.asObservable();
            }
        } else {
            let result: Drug[] = this.readDrugs();

            if (result && result.length) {
                this.drugsSubject.next(result);
                return this.drugsSubject.asObservable();
            }
        }
    }

    /**
     *
     * Returns all records found in store as array of object reference
     *
     * @private
     * @returns {any[]}
     *
     */
    public getStoredDrugs(): any[] {
        let storedRecords = [];

        let store: any[] = this.client.cache["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith("Drug:"))
                storedRecords.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Drug"
                });
        }

        return storedRecords;
    }

    /**
     * return array of objects refernces found in root query 
     *
     * @private
     * @returns {any[]}
     *
     */
    public getRootQueryDrugs(): any[] {
        let rootQuery = [];
        let array_: Drug[] | null | undefined = this.client.cache["data"]["data"][
            "ROOT_QUERY"
        ][this.ObjectKey];

        if (array_ && array_.length) rootQuery = Object.assign([], array_);

        return rootQuery;
    }

    /**
     * Read Drugs from ROOT_QUERY with no args (variables : {})
     *
     * @returns {Drugs[]}
     *
     */
    readDrugs(): Drug[] {
        let drugs: Drug[] = [];

        try {
            const drugsObj: any = this.client.readQuery({
                query: drugsQ,
                variables: {}
            });

            if (drugsObj && drugsObj.drugs) drugs = drugsObj.drugs;
        } catch (err) {

            console.log(err);

            // @ if readQuery not found
            this.client.writeQuery({
                query: drugsQ,
                variables: {},
                data: { drugs: [] }
            });
        }
        return drugs;
    }

    /**
     * @DEPRICATED
     * 
     * @param {Drug[]} drugs 
     * @returns {void} 
     * 
     * @memberOf DrugsStoreService
     */
    pushToStore(drugs: Drug[]): void {
        if (!drugs.length) return;

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new drugs that are not found in store to be persisted in store later on
        let newDrugsRef: any[] = [];

        drugs.map((drug: Drug, index) => {
            // @ check if drug exists in store (fragment)
            if (FragmentsStore["Drug:" + drug.id]) {
            } else {
                // @ add the drug to fragments store
                this.writeFragment(drug);

                // @ then prepare this drug object reference to be pushed
                newDrugsRef.push({
                    generated: false,
                    id: "Drug:" + drug.id,
                    type: "id",
                    typename: "Drug"
                });
            }
        });

        // @ new drugs need to be pushed to ROOT_QUERY
        if (newDrugsRef.length) {
            // @ push new drugs to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey].push(...newDrugsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();

            // @ broadcast new list, bcs there are new drugs added to store
            let drugs_ = this.readDrugs();
            if (drugs_ && drugs_.length) this.drugsSubject.next(drugs_);
        }
    }

    writeFragment(drug: Drug): void {
        this.client.writeFragment({
            id: "Drug:" + drug.id,
            fragment: gql`
                ${drugFragment}
            `,
            data: drug
        });
    }

    /**
     * 1. calling updateRootQuery() will update DrugsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     */
    updateRootQuery(): void {
        // this.client.cache.writeData({ data: { DrugsModfied: new Date().toISOString() } });
    }


    public search = <T>(filter: string, options?: ISearchOptions) =>

        new Observable<IDataResponse<T>>((observer) => {

            let drugs = this.getSerializedFromStore()

            let filtered: T[] = this.fuzzySearch(drugs, filter, options)

            var gqlResponse: IDataResponse<T> = {
                loading: true,
                data: filtered,
            }

            observer.next(gqlResponse)

            this.getFormServer(filter)
                .pipe(
                    catchError((error, source) => {
                        observer.error([])
                        return empty()
                    })
                )
                .subscribe(
                    (drugs) => {

                        if (drugs) {

                            let drugs_ = this.deserializeDrugs(drugs)

                            if (!drugs_ || !drugs_.length) {

                                gqlResponse.loading = false

                                observer.next(gqlResponse)
                            } else {
                                let filtered: T[] = this.fuzzySearch(drugs_, filter, options)

                                gqlResponse.loading = false
                                gqlResponse.data = filtered

                                observer.next(gqlResponse)
                            }
                        }
                    }
                )
        })

        /**
    * @Remark : Update or add drugs to fragments store and return all drugs in store
    * 
    * @param {Drug[]} drugs 
    * @returns {Drug[]} 
    * 
    * @memberOf DrugsStoreService
    */
    deserializeDrugs(drugs: Drug[]): Drug[] {
        if (!drugs.length) return [];

        let GeneratedObjectKey = this.ObjectKey

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new items that are not found in store to be persisted in store later on
        let newItemsRef: any[] = [];

        drugs.map((drug: Drug) => {

            // @ update or add fragment
            this.writeFragment(drug);

            // @ check if drug exists in store (fragment)
            if (FragmentsStore["Drug:" + drug.id]) {
            } else {

                // @ then prepare this drug object reference to be pushed
                newItemsRef.push({
                    generated: false,
                    id: "Drug:" + drug.id,
                    type: "id",
                    typename: "Drug"
                });
            }
        });


        // @ new items need to be pushed to ROOT_QUERY
        if (newItemsRef.length) {
            // @ push new drugs to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newItemsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();
        }

        // @ broadcast new list, bcs there might be changes on items
        let drugs_ = this.readDrugs();
        return drugs_ || [];
    }

    /**
     * Compare store drugs (ref) with query drugs according to group
     * if not equal will return will update query drugs with latest store items
     * then return all drug of type drug
     * 
     * 
     * @returns {Drug[]} 
     * 
     * @memberOf DrugsStoreService
     */
    getSerializedFromStore(): Drug[] {

        let GeneratedObjectKey = this.ObjectKey

        // @ records found in store
        let StoredItems = this.getStoredDrugs();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryDrugs();

        // @ if RootQueryDrugs doesn't contain all drugs found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> drugs
            this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;


            // @ then update rootQuery
            this.updateRootQuery();

            let result: Drug[] = this.readDrugs();

            if (result)
                return result

        } else {
            let result: Drug[] = this.readDrugs();

            if (result)
                return result
        }
    }

    private getFormServer(filterStr: string) {
        return this._drugsService
            .getDrugs(filterStr, 1, 20, { fetchPolicy: "no-cache" })
            .pipe(
                map(({ data }) => data.drugs ? data.drugs : []),
                // catchError((error, source) => {
                //     console.error(error);
                //     return of([]);
                //     return source;
                // })
            )
    }

    private fuzzySearch(collection: Drug[], filter: string, options?: ISearchOptions) {

        let searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        return this._fuzzySearch.search(
            collection,
            filter,
            searchOptions.keys,
            searchOptions,

        );
    }

}
