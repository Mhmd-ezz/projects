import { contactsQ } from './../gqlQueries';
import { contactFragment } from './../gqlFragments';
import { Contact } from './../generated/gqlServices';
import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { BehaviorSubject, Observable, of, empty } from "rxjs";
import { ISearchOptions } from "app/blocks/interface/search-options";
import { FuzzySearchService } from "app/blocks/pipes/fuzzy-search.service";
import { catchError, tap, map } from "rxjs/operators";
import { PatientService } from "app/patients/patient.service";
import { IFuzzyType } from "app/blocks/interface/IFuzztType";
import { IDataResponse } from "app/blocks/interface/IDataResponse";
import FuzzySet from 'fuzzyset.js'
import { Apollo } from 'apollo-angular';
import { ApolloCache, ApolloClient } from '@apollo/client/core';


@Injectable({
    providedIn: "root"
})
export class ContactsStoreService {
    // @ key which lives in root_query that holds all contacts and args is empty
    private ObjectKey: string = "contacts({})";


    private client: ApolloClient<any>;
    private cache: ApolloCache<any>;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };

    constructor(
        private _apollo: Apollo,
        private _fuzzySearch: FuzzySearchService,
        private _patientService: PatientService,

    ) {
        this.client = this._apollo.client;
        this.cache = this.client.cache;
    }


    /**
     *
     * Returns all contacts found in store as array of object reference
     *
     * @private
     * @returns {any[]}
     *
     * @memberOf ContactsStoreService
     */
    public getStoredContacts(): any[] {
        let storedContacts = [];

        let store: any[] = this.client.cache["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith("Contact:"))
                storedContacts.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Contact"
                });
        }
        return storedContacts;
    }

    /**
     * return array of objects refernces found in root query (contacts)
     *
     * @private
     * @returns {any[]}
     *
     * @memberOf ContactsStoreService
     */
    public getRootQueryContacts(): any[] {
        let rootQuery = [];
        let contactsArray: Contact[] | null | undefined = this.client.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey];

        if (contactsArray && contactsArray.length) rootQuery = Object.assign([], contactsArray);

        return rootQuery;
    }

    /**
     * Read contacts from ROOT_QUERY with no args (variables : {})
     *
     * @returns {contacts[]}
     *
     * @memberOf ContactsStoreService
     */
    readContacts(): Contact[] {
        let contacts: Contact[] = [];

        try {
            const contactsObj: any = this.client.readQuery({
                query: contactsQ,
                variables: {}
            });

            if (contactsObj && contactsObj.contacts) contacts = contactsObj.contacts;
        } catch (err) {
            console.log(err);
            // @ if contacts rootQuery not found
            this.client.writeQuery({
                query: contactsQ,
                variables: {},
                data: { contacts: [] }
            });
        }
        return contacts;
    }

    writeFragment(contact: Contact): void {
        this.client.writeFragment({
            id: "Contact:" + contact.id,
            fragment: gql`
                ${contactFragment}
            `,
            data: contact
        });
    }

    /**
     * 1. calling updateRootQuery() will update ContactsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     * @memberOf ContactsStoreService
     */
    updateRootQuery(): void {

        // this.client.cache.writeQuery({
        //     query: gql`
        //       query updateRoot {
        //         Modfied
        //       }
        //     `,
        //     data: {
        //         Modfied: new Date().toISOString() 
        //     }
        //   });

        // this.client.cache.writeData({ data: { ContactsModfied: new Date().toISOString() } });
    }

    /**
     * 
     * @Remark : its very important to specifiy ISearchOptions.extractOriginalItem : boolean
     * @Remark : its very important to specifiy Generic type IfuzzyType<Contact> | Contact
     * 
     * 
     * @param {string}  filter
     * @param {ISearchOptions} options 
     * @returns {IDataResponse<T>}  T could be IfuzzyType<Contact> or Contact
     * 
     * 
     * @memberOf ContactsStoreService
     */
    public search = <T>(filter: string, options?: ISearchOptions) =>

        new Observable<IDataResponse<T>>((observer) => {

            let contacts = this.getSerializedFromStore()

            let filteredContacts: T[] = this.fuzzySearch(contacts, filter, options)

            var gqlResponse: IDataResponse<T> = {
                loading: true,
                data: filteredContacts,
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
                    (contacts) => {

                        if (contacts) {

                            // @ deserializeContacts may return empty array if no new contacts added to store 
                            let contacts_ = this.deserializeContacts(contacts)

                            if (!contacts_ || !contacts_.length) {

                                gqlResponse.loading = false

                                observer.next(gqlResponse)
                            } else {
                                let filtered: T[] = this.fuzzySearch(contacts_, filter, options)

                                gqlResponse.loading = false
                                gqlResponse.data = filtered

                                observer.next(gqlResponse)
                            }
                        }
                    }
                )
        })


    /**
     * @Remark : Update or add contacts to fragments store and return all contacts in store
     * 
     * 
     * 
     * @param {Contact[]} contacts 
     * @returns {Contact[]} 
     * 
     * @memberOf ContactsStoreService
     */
    deserializeContacts(contacts: Contact[]): Contact[] {
        if (!contacts.length) return [];

        let GeneratedObjectKey = this.ObjectKey

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"]);

        // @ this array will hold new contacts that are not found in store to be persisted in store later on
        let newItemsRef: any[] = [];

        contacts.map((contact: Contact, index) => {

            // @ update or add fragment
            this.writeFragment(contact);

            // @ check if contact exists in store (fragment)
            if (FragmentsStore["Contact:" + contact.id]) {
            } else {

                // @ then prepare this contact object reference to be pushed
                newItemsRef.push({
                    generated: false,
                    id: "Contact:" + contact.id,
                    type: "id",
                    typename: "Contact"
                });
            }
        });


        // @ new contacts need to be pushed to ROOT_QUERY
        if (newItemsRef.length) {
            // @ push new contacts to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey].push(...newItemsRef);

            // @ Important : update in order changes take effect
            this.updateRootQuery();
        }

        // @ broadcast new list, bcs there might be changes on contacts
        let contact_ = this.readContacts();
        return contact_ || [];
    }

    /**
     * Compare store Contact (ref) with query Contacts according to group
     * if not equal will return result and update query contacts with latest store items
     * then return all contacts of type contact
     * 
     * @returns {Contact[]} 
     * 
     * @memberOf contactsStoreService
     */
    getSerializedFromStore(): Contact[] {

        let GeneratedObjectKey = this.ObjectKey

        // @ records found in store
        let StoredItems = this.getStoredContacts();

        // @ Items found in RootQuery
        let RootQueryItems = this.getRootQueryContacts();

        // @ if RootQueryContacts doesn't contain all Contacts found in store
        if (StoredItems.length != RootQueryItems.length) {
            // @ update root query -> Contacts
            this.cache["data"]["data"]["ROOT_QUERY"][GeneratedObjectKey] = StoredItems;

            // @ then update rootQuery
            this.updateRootQuery();

            let result: Contact[] = this.readContacts();

            if (result)
                return result

        } else {
            let result: Contact[] = this.readContacts();

            if (result)
                return result
        }
    }

    private getFormServer(filterStr: string) {
        return this._patientService
            .getContacts(filterStr, 1, 10, "", false, { fetchPolicy: "no-cache" })
            .pipe(
                map(({ data }) => data.contacts ? data.contacts : []),
            )
    }


    private fuzzySearch(collection: Contact[], filter: string, options?: ISearchOptions) {

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
