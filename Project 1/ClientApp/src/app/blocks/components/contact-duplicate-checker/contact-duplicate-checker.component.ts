import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';
import { IFuzzyType } from 'app/blocks/interface/IFuzztType';
import { ContactsStoreService } from 'app/blocks/graphql/store/contactsStore.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import FuzzySet from 'fuzzyset.js'
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ContactsParams } from '@appStore/model/contacts-params';
import { AppState } from '@appStore/reducers';
import { contactsSelector, contactsTotalSelector } from '@appStore/selectors';
import { Store } from '@ngrx/store';
import * as fromContactsActions from '@appStore/actions';
import { takeUntil } from 'rxjs/operators';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';

@Component({
    selector: 'app-contact-duplicate-checker',
    templateUrl: './contact-duplicate-checker.component.html',
    styleUrls: ['./contact-duplicate-checker.component.scss'],
    animations: fuseAnimations
})
export class ContactDuplicateCheckerComponent implements OnInit {

    private searchOptions: ISearchOptions = {
        keys: ['name'],
        extractOriginalItem: false,
        outputLimit: 10
    };
    private _unsubscribeAll: Subject<any>;
    // @ set defaults
    contact:any
    // @ will handle all possible matching duplicate contacts 
    private noDuplicateLocally = false;
    private noDuplicateOnline = false;
    duplicates: any[] = [];
    isDuplicateClean$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Output() duplicateCleanChange = new EventEmitter<boolean>();

    constructor(
        private _contactsStoreService: ContactsStoreService,
        private _router: Router,
        private _store: Store<AppState>,        
        private _fuzzySearch:FuzzySearchService,
    ) {
        this._unsubscribeAll = new Subject();
        this.contact=null;
       
    }

    ngOnInit() {
        

        this._store.select(contactsSelector)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response) => {
            if (response && response.data) {
                if(this.contact){
                   
                const fuzzyearch = this._fuzzySearch.search(
                    response.data,
                    this.contact.name,
                    this.searchOptions.keys,
                    this.searchOptions

                )
                
                if (fuzzyearch)
                    {
                          // @ duplicates
                    this.duplicates = [];

                    // @ check if any have the same phone or birthdate year
                    fuzzyearch.map((matchedContact) => {

                        // @ patient should not be created
                        if (this.contact.id) return;

                        let isMatching = this.scoring(this.contact, matchedContact)

                        if (isMatching) {
                            this.duplicates.push(matchedContact);
                        }
                    });

                    // @ no duplicates then save can proceed
                    if (!this.duplicates.length) {
                        if (!response.fromServer) { this.noDuplicateLocally = true; }
                        else { this.noDuplicateOnline = true; }
                    }

                    if (this.noDuplicateLocally && this.noDuplicateOnline) {
                        this.duplicates = [];
                        this.isDuplicateClean$.next(true);
                        // @ TODO EMIT CHANGES
                        // this.save();
                        this.duplicateCleanChange.emit(true)
                    }
                    }
                }
                      
        }
        
    });
    }

    /**
     * Check for contact duplication possiblity
     * 
     * 
     * @memberOf ContactDuplicateCheckerComponent
     */
    checkDuplicate(contact) {
        const variables: ContactsParams = {
            page:  1,
            filter: contact.name,
            sortBy: "",
            descending:  false,
            // size: this.pageSizeOptions[0]
            size: 10
        };
       
        this.contact=contact
        
        this._store.dispatch(fromContactsActions.loadContacts({ variables }));
        // this._contactsStoreService
        //     .search<IFuzzyType<Contact>>(contact.name, this.searchOptions)
        //     .subscribe(
        //         ({ data, loading }) => {

        //             // @ duplicates
        //             this.duplicates = [];

        //             // @ check if any have the same phone or birthdate year
        //             data.map((matchedContact) => {

        //                 // @ patient should not be created
        //                 if (contact.id) return;

        //                 let isMatching = this.scoring(contact, matchedContact)

        //                 if (isMatching) {
        //                     this.duplicates.push(matchedContact);
        //                 }
        //             });

        //             // @ no duplicates then save can proceed
        //             if (!this.duplicates.length) {
        //                 if (loading) { this.noDuplicateLocally = true; }
        //                 else { this.noDuplicateOnline = true; }
        //             }

        //             if (this.noDuplicateLocally && this.noDuplicateOnline) {
        //                 this.duplicates = [];
        //                 this.isDuplicateClean$.next(true);
        //                 // @ TODO EMIT CHANGES
        //                 // this.save();
        //                 this.duplicateCleanChange.emit(true)
        //             }

        //         }, (error) => {
        //             // @ skip duplicates check 
        //             this.duplicates = [];
        //             this.isDuplicateClean$.next(true);
        //             this.duplicateCleanChange.emit(true)

        //         },
        //         () => {
        //             this.duplicates = [];

        //             // @ skip duplicates check 
        //             this.isDuplicateClean$.next(true);
        //             this.duplicateCleanChange.emit(true)

        //         });
    }

    skipDupicateCheck() {
        this.duplicates = [];
        this.isDuplicateClean$.next(true);
        this.duplicateCleanChange.emit(true)
    }

    onDone() {
        this._router.navigate(['/patients']);
    }

    //-------------------------------------------------------------------------
    // Private methods
    //-------------------------------------------------------------------------
    private scoring(contact, matchingContact) {

        let fuzzy = FuzzySet([matchingContact.name])
        let result = fuzzy.get(contact.name)

        if (result) {
            let score = result[0][0];

            // @ mobile match & score as less as 0.3
            if (
                (matchingContact._item.telephone.indexOf(contact.telephone) > -1 ||
                    contact.telephone.indexOf(matchingContact._item.telephone) > -1) &&
                score > 0.2
            ) {
                return true
            } else if (score > 0.7) {
                // @ Only name matchs with high similarity score 
                return true;
            }
        }

        return false
    }
}
