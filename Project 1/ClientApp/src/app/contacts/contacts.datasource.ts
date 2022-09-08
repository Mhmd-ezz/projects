import { Injectable } from '@angular/core';
import { ContactsService } from 'app/blocks/services/contacts.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ContactsModule } from './contacts.module';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';

@Injectable({
    providedIn: 'root'
})
export class ContactsDatasource {

    private contactsSubject = new BehaviorSubject<Contact[]>([]);

    private totalSubject = new BehaviorSubject<number>(0);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    constructor(
        private _contactsService: ContactsService
    ) { }

    loadContacts(
        filterStr: string,
        // sortDirection: string,
        page: number | null,
        size: number | null,
        orderBy: string | null,
        descending: string | null
    ) {
        this._contactsService
            .getContacts(filterStr, page, size, orderBy, descending)
            .subscribe(
                ({ data, loading }) => {
                if (data && data.contacts) {
                    // @ Because of the difficulty of returning wrapped pageInfo from graphql
                    // @ then, try to handle total records from response
                    // @ just in case server responded
                    this.contactsSubject.next(data.contacts);

                    // if (!loading) {
                    // @ calc total where total is number of page (given) * size (given)
                    // @ hack : always add 1 to total until records returned are less than limit
                    if (data.contacts.length < size) this.totalSubject.next(page * size);
                    else this.totalSubject.next(page * size + 1);

                    // @ no recordss found
                    if (data.contacts.length > 0) this.noMoreRecordsSubject.next(false);
                    else this.noMoreRecordsSubject.next(true);

                }
            },
                error => {
                    console.log("error", error);
                }


            )
    }

    connect(): Observable<Contact[]> {
        return this.contactsSubject.asObservable();
    }

}
