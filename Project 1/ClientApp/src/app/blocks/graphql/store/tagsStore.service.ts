import { tagsQ } from '../gqlQueries';
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
// import { Apollo } from "@apollo/client";
// import { ApolloCache } from "apollo-cache";
// import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { BehaviorSubject, Observable, empty } from "rxjs";

import { tagFragment } from "../gqlFragments";
import { Tag } from "../generated/gqlServices";
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { IDataResponse } from 'app/blocks/interface/IDataResponse';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { catchError, map } from 'rxjs/operators';
import { TagService } from 'app/settings/tags/tag.service';
import { ApolloCache, ApolloClient } from '@apollo/client/core';

@Injectable({
    providedIn: "root"
})
export class TagsStoreService {
    // @ key which lives in root_query that holds all tags and args is empty
    private ObjectKey: string = "tags({})";

    private client: ApolloClient<any>;
    private client_: ApolloClient<any>;
    private cache: ApolloCache<any>;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };

    private tagsSubject: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

    constructor(
        private _apollo: Apollo,
        private _fuzzySearch: FuzzySearchService,
        private _tagService: TagService
    ) {
        this.client = this._apollo.client;
        this.cache = this.client.cache;
    }

    /**
     * @DEPRICATED
     * 
     * @returns {Observable<Tag[]>} 
     * 
     * @memberOf TagsStoreService
     */
    getTags(): Observable<Tag[]> {
        // @ records found in store
        let StoredItems = this.getStoredTags();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryTags();

        // @ if RootQueryTags doesn't contain all tags found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> tags
            this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey] = StoredItems;

            // @ then update rootQuery
            this.updateRootQuery();

            let result: Tag[] = this.readTags();

            if (result && result.length) {
                this.tagsSubject.next(result);
                return this.tagsSubject.asObservable();
            }
        } else {
            let result: Tag[] = this.readTags();

            if (result && result.length) {
                this.tagsSubject.next(result);
                return this.tagsSubject.asObservable();
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
    public getStoredTags(): any[] {
        let storedRecords = [];

        let store: any[] = this.client.cache["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith("Tag:"))
                storedRecords.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Tag"
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
    public getRootQueryTags(): any[] {
        let rootQuery = [];
        let array_: Tag[] | null | undefined = this.client.cache["data"]["data"][
            "ROOT_QUERY"
        ][this.ObjectKey];

        if (array_ && array_.length) rootQuery = Object.assign([], array_);

        return rootQuery;
    }

    /**
     * Read Tags from ROOT_QUERY with no args (variables : {})
     *
     * @returns {Tags[]}
     *
     */
    readTags(): Tag[] {
        let tags: Tag[] = [];

        try {
            const tagsObj: any = this.client.readQuery({
                query: tagsQ,
                variables: {}
            });

            if (tagsObj && tagsObj.tags) tags = tagsObj.tags;
        } catch (err) {

            console.log(err);

            // @ if readQuery not found
            this.client.writeQuery({
                query: tagsQ,
                variables: {},
                data: { tags: [] }
            });
        }
        return tags;
    }

    /**
     * @DEPRICATED
     * 
     * @param {Tag[]} tags 
     * @returns {void} 
     * 
     * @memberOf TagsStoreService
     */
    pushToStore(tags: Tag[]): void {
        if (!tags.length) return;

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new tags that are not found in store to be persisted in store later on
        let newTagssRef: any[] = [];

        tags.map((tag: Tag, index) => {
            // @ check if tag exists in store (fragment)
            if (FragmentsStore["Tag:" + tag.id]) {
            } else {
                // @ add the tag to fragments store
                this.writeFragment(tag);

                // @ then prepare this tag object reference to be pushed
                newTagssRef.push({
                    generated: false,
                    id: "Tag:" + tag.id,
                    type: "id",
                    typename: "Tag"
                });
            }
        });

        // @ new tags need to be pushed to ROOT_QUERY
        if (newTagssRef.length) {
            // @ push new tags to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey].push(...newTagssRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();

            // @ broadcast new list, bcs there are new tags added to store
            let tags_ = this.readTags();
            if (tags_ && tags_.length) this.tagsSubject.next(tags_);
        }
    }

    writeFragment(tag: Tag): void {
        this.client.writeFragment({
            id: "Tag:" + tag.id,
            fragment: gql`
                ${tagFragment}
            `,
            data: tag
        });
    }

    /**
     * 1. calling updateRootQuery() will update TagsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     */
    updateRootQuery(): void {
        // this.client.cache.writeData({ data: { TagsModfied: new Date().toISOString() } });
    }

    public search = <T>(filter: string, options?: ISearchOptions) =>

        new Observable<IDataResponse<T>>((observer) => {

            let tags = this.getSerializedFromStore()

            let filtered: T[] = this.fuzzySearch(tags, filter, options)

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
                    (tags) => {

                        if (tags) {

                            let tags_ = this.deserializeTags(tags)

                            if (!tags_ || !tags_.length) {

                                gqlResponse.loading = false

                                observer.next(gqlResponse)
                            } else {
                                let filtered: T[] = this.fuzzySearch(tags_, filter, options)

                                gqlResponse.loading = false
                                gqlResponse.data = filtered

                                observer.next(gqlResponse)
                            }
                        }
                    }
                )
        })


    /**
    * @Remark : Update or add tags to fragments store and return all tags in store
    * 
    * @param {Tag[]} tags 
    * @returns {Tag[]} 
    * 
    * @memberOf TagsStoreService
    */
    deserializeTags(tags: Tag[]): Tag[] {
        if (!tags.length) return [];

        let GeneratedObjectKey = this.ObjectKey

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new items that are not found in store to be persisted in store later on
        let newItemsRef: any[] = [];

        tags.map((tag: Tag) => {

            // @ update or add fragment
            this.writeFragment(tag);

            // @ check if tag exists in store (fragment)
            if (FragmentsStore["Tag:" + tag.id]) {
            } else {

                // @ then prepare this tag object reference to be pushed
                newItemsRef.push({
                    generated: false,
                    id: "Tag:" + tag.id,
                    type: "id",
                    typename: "Tag"
                });
            }
        });


        // @ new items need to be pushed to ROOT_QUERY
        if (newItemsRef.length) {
            // @ push new tags to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newItemsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();
        }

        // @ broadcast new list, bcs there might be changes on items
        let tags_ = this.readTags();
        return tags_ || [];
    }

    /**
     * Compare store tags (ref) with query tags according to group
     * if not equal will return will update query tags with latest store items
     * then return all tag of type tag
     * 
     * 
     * @returns {Tag[]} 
     * 
     * @memberOf TagsStoreService
     */
    getSerializedFromStore(): Tag[] {

        let GeneratedObjectKey = this.ObjectKey

        // @ records found in store
        let StoredItems = this.getStoredTags();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryTags();

        // @ if RootQueryTags doesn't contain all tags found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> tags
            this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;


            // @ then update rootQuery
            this.updateRootQuery();

            let result: Tag[] = this.readTags();

            if (result)
                return result

        } else {
            let result: Tag[] = this.readTags();

            if (result)
                return result
        }
    }

    private getFormServer(filterStr: string) {
        return this._tagService
            .getTags(filterStr, 1, 20, { fetchPolicy: "no-cache" })
            .pipe(
                map(({ data }) => data.tags ? data.tags : []),
                // catchError((error, source) => {
                //     console.error(error);
                //     return of([]);
                //     return source;
                // })
            )
    }


    private fuzzySearch(collection: Tag[], filter: string, options?: ISearchOptions) {

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
