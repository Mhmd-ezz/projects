import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
// import { ApolloCache } from "apollo-cache";
// import ApolloClient from "apollo-client";
import { LookupsService } from 'app/settings/lookups/lookups.service';
import gql from "graphql-tag";
import { BehaviorSubject, Observable, of, empty } from "rxjs";
import { lookupFragment } from '../gqlFragments';
import { lookupsByGroupQ, lookupsQ, patientQ, tagsQ } from './../gqlQueries';
import { AppUtils } from 'app/blocks/utils';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import keyBy from 'lodash/keyBy';
import { Lookup } from '../generated/gqlServices';
import { ApolloCache, ApolloClient } from '@apollo/client/core';

@Injectable()
export class LookupsStoreService {
    // @ key which lives in root_query that holds all lookups and args is empty
    private ObjectKey: string = "lookupsByGroup({\"group\":\"custom\"})";

    /**
     *  Generate apollo cache Query key based on provided group name
     * @private
     * @memberOf LookupsStoreService
     */
    private GetObjectKey = (groupKey: string): string => { return `lookupsByGroup({"group":"${groupKey}"})` };


    private client: ApolloClient<any>;
    private cache: ApolloCache<any>;

    private lookupsSubject: BehaviorSubject<Lookup[]> = new BehaviorSubject<Lookup[]>([]);

    private searchOptionsDefaults: ISearchOptions = {
        keys: ["text"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 2000
    };

    constructor(
        private _apollo: Apollo,
        private _lookupsService: LookupsService,
        private _fuzzySearch: FuzzySearchService,

    ) {
        this.client = this._apollo.client;
        this.cache = this.client.cache;
    }

    public search = (group: string, filter: string, options?: ISearchOptions) =>

        new Observable<Lookup[]>((observer) => {

            let lookups = this.getSerializedFromStore(group)

            let filtered = this.fuzzySearch(lookups, filter, options)

            observer.next(filtered)

            this.getLookupsFromServer(filter, group)
                .pipe(
                    tap((lookups: any) => {
                        if (lookups && lookups.length)
                            this.deserializeLookups(lookups, group)
                    }),
                    catchError((error, source) => {
                        return empty()
                        return source
                    })
                )
                .subscribe(
                    (lookups) => {
                        if (lookups && lookups.length) {

                            // @  may return empty array if no new lookups added to store 
                            let lookups_ = this.deserializeLookups(lookups, group)

                            if (!lookups_ || !lookups_.length) {

                                observer.next(filtered)

                            } else {

                                let filtered = this.fuzzySearch(lookups_, filter, options)

                                observer.next(filtered)
                            }

                            // let filtered = this.fuzzySearch(lookups, filter, options)
                            // console.log(filtered, lookups)
                            // observer.next(filtered)

                        }
                    }
                )
        })

    /**
     *
     * Returns all records found in store as array of reference
     *
     * @private
     * @returns {any[]}
     *
     */
    public getStoredLookups(group): any[] {
        let storedRecords = [];

        let store: any[] = this.client.cache["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith(`Lookup:${group}`) && this.client.cache["data"]["data"][keys[j]].groupKey == group)
                storedRecords.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Lookup"
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
    public getRootQueryLookups(group: string): any[] {

        let GeneratedObjectKey = this.GetObjectKey(group)

        let rootQuery = [];
        let array_: Lookup[] | null | undefined = this.client.cache["data"]["data"][
            "ROOT_QUERY"
        ][GeneratedObjectKey];

        if (array_ && array_.length) rootQuery = Object.assign([], array_);

        return rootQuery;
    }

    /**
     * Read Lookups from ROOT_QUERY with  args (variables : {group: "xxx" })
     *
     * @returns {Lookup[]}
     *
     */
    readLookups(group): Lookup[] {

        let lookups: Lookup[] = [];

        try {

            const lookupsObj: any = this.client.cache.readQuery({
                query: lookupsByGroupQ,
                variables: { group: group, filter:"",page:1,size:1,filterPredefined:0}
            });

            const lookups__: any = this.client.cache.readQuery({
                query: lookupsQ,
                variables: null
            });

            const patient: any = this.client.cache
            .readQuery({ query: patientQ, variables: { id: '5e056509e4a7de5ec89794cf' } });

            const tags: any = this.client.cache
            .readQuery({ query: tagsQ, variables: { filter: "patient",page:1,size:300} });

               this.client.cache.writeQuery({
            query: gql`
              query updateRoot {
                LookupsModfied
              }
            `,
            data: {
                LookupsModfied: new Date().toISOString() 
            }
          });


            console.log(tags);
            console.log(patient);
            console.log(lookups__);
            console.log(lookupsObj,group);
            
            if (lookupsObj && lookupsObj.lookupsByGroup) lookups = lookupsObj.lookupsByGroup;
            
        } catch (err) {

            console.log(err)

            // @ if readQuery not found
            this.client.writeQuery({
                query: lookupsByGroupQ,
                variables: { group: group },
                data: { lookupsByGroup: [] }
            });

        }
        return lookups;
    }

    writeFragment(lookup: Lookup): void {
        this.client.writeFragment({
            id: `Lookup:${lookup.groupKey}:${lookup.text}`,
            fragment: gql`
                ${lookupFragment}
            `,
            data: lookup
        });
    }

    /**
     * 1. calling updateRootQuery() will update lookupsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     */
    updateRootQuery(): void {

        //    this.client.cache.writeQuery({
        //     query: gql`
        //       query updateRoot {
        //         LookupsModfied
        //       }
        //     `,
        //     data: {
        //         LookupsModfied: new Date().toISOString() 
        //     }
        //   });

        // this.client.cache.writeData({ data: { LookupsModfied: new Date().toISOString() } });
    }


    /**
     * Compare store lookups (ref) with query lookups according to group
     * if not equal will return will update query lookupByGroup with latest store items
     * then return all lookups of type Lookup
     * 
     * @param {string} group 
     * @returns {Lookup[]} 
     * 
     * @memberOf LookupsStoreService
     */
    getSerializedFromStore(group: string): Lookup[] {

        let GeneratedObjectKey = this.GetObjectKey(group)

        // @ records found in store
        let StoredItems = this.getStoredLookups(group);

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryLookups(group);

        // @ if RootQueryLookups doesn't contain all lookups found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> lookups
            this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;

            // @ then update rootQuery
            this.updateRootQuery();

            let result: Lookup[] = this.readLookups(group);

            if (result)
                return result

        } else {
            let result: Lookup[] = this.readLookups(group);

            if (result)
                return result
        }
    }

    getLookupsFromServer(filter: string, group: string) {
        return this._lookupsService
            .getLookupsByGroup(group, filter, 1, 20, false, { fetchPolicy: "no-cache" })
            .pipe(
                map(({ data }) => data.lookupsByGroup ? data.lookupsByGroup : null),
                catchError((error, source) => {
                    console.error(error);
                    return of([]);
                    return source;
                })
            )
    }

    /**
     * deserialize Lookups and add none existing lookups to store 
     * 
     * @param {Lookup[]} lookups 
     * @param {string} group 
     * @returns {Lookup[]} 
     * 
     * @memberOf LookupsStoreService
     */
    deserializeLookups(lookups: Lookup[], group: string): Lookup[] {
        if (!lookups.length) return;

        let GeneratedObjectKey = this.GetObjectKey(group)

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new lookups that are not found in store to be persisted in store later on
        let newLookupsRef: any[] = [];

        lookups.map((lookup: Lookup, index) => {

            // @ check if lookup exists in store (fragment)
            if (FragmentsStore[`Lookup:${lookup.groupKey}:${lookup.text}`]) {
            } else {
                // @ add the lookup to fragments store
                this.writeFragment(lookup);

                // @ then prepare this lookup object reference to be pushed
                newLookupsRef.push({
                    generated: false,
                    id: `Lookup:${lookup.groupKey}:${lookup.text}`,
                    type: "id",
                    typename: "Lookup"
                });
            }
        });

        // @ new lookups need to be pushed to ROOT_QUERY
        if (newLookupsRef.length) {
            // @ push new lookups to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newLookupsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();
        }

        // @ broadcast new list, bcs there might be changes on lookups
        let lookups_ = this.readLookups(group);
        return lookups_ || [];
    }

    private fuzzySearch(collection: Lookup[], filter: string, options?: ISearchOptions) {

        let searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        return this._fuzzySearch.search(
            collection,
            filter,
            searchOptions.keys,
            searchOptions
        );
    }



    // @ Skip For Testing purpose
    protected addNonPatientDummyData() {
        let dataCache = this.cache["data"];
        for (let i = 0; i < 2000; i++) {
            dataCache.set(`Dummy:${AppUtils.GenerateObjectId()}`, { data: i });
        }
    }

    // @ Skip For Testing purpose
    protected addDummyData(count) {

        let lookupkey = Object.keys(this.client.cache["data"]["data"]).find(x =>
            x.startsWith("Lookup:")
        );

        if (!lookupkey) return;

        let Extractedlookup: Lookup = this.client.readFragment({
            fragment: gql`
                ${lookupFragment}
            `,
            id: lookupkey
        });

        for (let i = 0; i < count; i++) {
            let lookup: Lookup = Object.assign({}, Extractedlookup);

            lookup.id = AppUtils.GenerateObjectId();

            let groups = [
                { value: "allergies", text: "Allergies" },
                { value: "family_history", text: "Family History" },
                { value: "medical_issues", text: "Medical Issues" },
                { value: "physical_exam", text: "Physical Exam" },
                { value: "other_treatments", text: "Treatments" },
                { value: "diagnosis", text: "Diagnosis" },
                { value: "radio", text: "Radio" },
                { value: "laboratory", text: "Laboratory" },
                { value: "consultation", text: "Consultation" },
                { value: "note", text: "note" },
                { value: "cheif_complaint", text: "Cheif complaint" },
            ]

            lookup.groupKey = groups[Math.floor(Math.random() * 11)].value

            this.client.writeFragment({
                id: "Lookup:" + lookup.id,
                fragment: gql`
                    ${lookupFragment}
                `,
                data: lookup
            });
        }
    }

}
