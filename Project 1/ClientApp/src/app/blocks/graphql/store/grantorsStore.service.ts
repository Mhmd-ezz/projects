import { grantorsQ } from './../gqlQueries';
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
// import { ApolloCache } from "apollo-cache";
import gql from "graphql-tag";
import { BehaviorSubject, Observable, empty } from "rxjs";

import { grantorFragment } from "../gqlFragments";
import { Grantor } from "../generated/gqlServices";
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { IDataResponse } from 'app/blocks/interface/IDataResponse';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { catchError, map } from 'rxjs/operators';
import { GrantorService } from 'app/settings/grantors/grantor.service';
import { ApolloCache, ApolloClient } from '@apollo/client/core';

@Injectable({
    providedIn: "root"
})
export class GrantorsStoreService {
    // @ key which lives in root_query that holds all grantors and args is empty
    private ObjectKey: string = "grantors({})";

    private client: ApolloClient<any>;
    private cache: ApolloCache<any>;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };


    private grantorsSubject: BehaviorSubject<Grantor[]> = new BehaviorSubject<Grantor[]>([]);



    constructor(
        private _apollo: Apollo,
        private _fuzzySearch: FuzzySearchService,
        private _grantorService: GrantorService
    ) {
        this.client = this._apollo.client;
        this.cache = this.client.cache;
    }

    /**
     * @DEPRICATED
     * 
     * @returns {Observable<Grantor[]>} 
     * 
     * @memberOf GrantorsStoreService
     */
    getGrantors(): Observable<Grantor[]> {
        // @ records found in store
        let StoredItems = this.getStoredGrantors();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryGrantors();

        // @ if RootQueryGrantors doesn't contain all grantors found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> grantors
            this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey] = StoredItems;

            // @ then update rootQuery
            this.updateRootQuery();

            let result: Grantor[] = this.readGrantors();

            if (result && result.length) {
                this.grantorsSubject.next(result);
                return this.grantorsSubject.asObservable();
            }
        } else {
            let result: Grantor[] = this.readGrantors();

            if (result && result.length) {
                this.grantorsSubject.next(result);
                return this.grantorsSubject.asObservable();
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
    public getStoredGrantors(): any[] {
        let storedRecords = [];

        let store: any[] = this.client.cache["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith("Grantor:"))
                storedRecords.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Grantor"
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
    public getRootQueryGrantors(): any[] {
        let rootQuery = [];
        let array_: Grantor[] | null | undefined = this.client.cache["data"]["data"][
            "ROOT_QUERY"
        ][this.ObjectKey];

        if (array_ && array_.length) rootQuery = Object.assign([], array_);

        return rootQuery;
    }

    /**
     * Read Grantors from ROOT_QUERY with no args (variables : {})
     *
     * @returns {Grantors[]}
     *
     */
    readGrantors(): Grantor[] {
        let grantors: Grantor[] = [];

        try {
            const grantorsObj: any = this.client.readQuery({
                query: grantorsQ,
                variables: {}
            });

            if (grantorsObj && grantorsObj.grantors) grantors = grantorsObj.grantors;
        } catch (err) {

            console.log(err);

            // @ if readQuery not found
            this.client.writeQuery({
                query: grantorsQ,
                variables: {},
                data: { grantors: [] }
            });
        }
        return grantors;
    }

    /**
     * @DEPRICATED
     * 
     * @param {Grantor[]} grantors 
     * @returns {void} 
     * 
     * @memberOf GrantorsStoreService
     */
    pushToStore(grantors: Grantor[]): void {
        if (!grantors.length) return;

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new grantors that are not found in store to be persisted in store later on
        let newGrantorssRef: any[] = [];

        grantors.map((grantor: Grantor, index) => {
            // @ check if grantor exists in store (fragment)
            if (FragmentsStore["Grantor:" + grantor.id]) {
            } else {
                // @ add the grantor to fragments store
                this.writeFragment(grantor);

                // @ then prepare this grantor object reference to be pushed
                newGrantorssRef.push({
                    generated: false,
                    id: "Grantor:" + grantor.id,
                    type: "id",
                    typename: "Grantor"
                });
            }
        });

        // @ new grantors need to be pushed to ROOT_QUERY
        if (newGrantorssRef.length) {
            // @ push new grantors to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey].push(...newGrantorssRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();

            // @ broadcast new list, bcs there are new grantors added to store
            let grantors_ = this.readGrantors();
            if (grantors_ && grantors_.length) this.grantorsSubject.next(grantors_);
        }
    }

    writeFragment(grantor: Grantor): void {
        this.client.writeFragment({
            id: "Grantor:" + grantor.id,
            fragment: gql`
                ${grantorFragment}
            `,
            data: grantor
        });
    }

    /**
     * 1. calling updateRootQuery() will update GrantorsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     */
    updateRootQuery(): void {
        // this.client.cache.writeData({ data: { GrantorsModfied: new Date().toISOString() } });
    }


    public search = <T>(filter: string, options?: ISearchOptions) =>

        new Observable<IDataResponse<T>>((observer) => {

            let grantors = this.getSerializedFromStore()

            let filtered: T[] = this.fuzzySearch(grantors, filter, options)

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
                    (grantors) => {

                        if (grantors) {

                            let grantors_ = this.deserializeGrantors(grantors)

                            if (!grantors_ || !grantors_.length) {

                                gqlResponse.loading = false

                                observer.next(gqlResponse)
                            } else {
                                let filtered: T[] = this.fuzzySearch(grantors_, filter, options)

                                gqlResponse.loading = false
                                gqlResponse.data = filtered

                                observer.next(gqlResponse)
                            }
                        }
                    }
                )
        })


    /**
    * @Remark : Update or add grantors to fragments store and return all grantors in store
    * 
    * @param {Grantor[]} grantors 
    * @returns {Grantor[]} 
    * 
    * @memberOf GrantorsStoreService
    */
    deserializeGrantors(grantors: Grantor[]): Grantor[] {
        if (!grantors.length) return [];

        let GeneratedObjectKey = this.ObjectKey

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new items that are not found in store to be persisted in store later on
        let newItemsRef: any[] = [];

        grantors.map((grantor: Grantor) => {

            // @ update or add fragment
            this.writeFragment(grantor);

            // @ check if grantor exists in store (fragment)
            if (FragmentsStore["Grantor:" + grantor.id]) {
            } else {

                // @ then prepare this grantor object reference to be pushed
                newItemsRef.push({
                    generated: false,
                    id: "Grantor:" + grantor.id,
                    type: "id",
                    typename: "Grantor"
                });
            }
        });


        // @ new items need to be pushed to ROOT_QUERY
        if (newItemsRef.length) {
            // @ push new grantors to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newItemsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();
        }

        // @ broadcast new list, bcs there might be changes on items
        let grantors_ = this.readGrantors();
        return grantors_ || [];
    }

    /**
     * Compare store grantors (ref) with query grantors according to group
     * if not equal will return will update query grantors with latest store items
     * then return all grantor of type grantor
     * 
     * 
     * @returns {Grantor[]} 
     * 
     * @memberOf GrantorsStoreService
     */
    getSerializedFromStore(): Grantor[] {

        let GeneratedObjectKey = this.ObjectKey

        // @ records found in store
        let StoredItems = this.getStoredGrantors();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryGrantors();

        // @ if RootQueryGrantors doesn't contain all grantors found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> grantors
            this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;


            // @ then update rootQuery
            this.updateRootQuery();

            let result: Grantor[] = this.readGrantors();

            if (result)
                return result

        } else {
            let result: Grantor[] = this.readGrantors();

            if (result)
                return result
        }
    }

    private getFormServer(filterStr: string) {
        return this._grantorService
            .getGrantors(filterStr, 1, 20, { fetchPolicy: "no-cache" })
            .pipe(
                map(({ data }) => data.grantors ? data.grantors : []),
                // catchError((error, source) => {
                //     console.error(error);
                //     return of([]);
                //     return source;
                // })
            )
    }


    private fuzzySearch(collection: Grantor[], filter: string, options?: ISearchOptions) {

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
