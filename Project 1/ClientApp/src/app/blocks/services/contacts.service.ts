import { shareReplay } from 'rxjs/operators';
import { ContactGQL } from './../graphql/generated/gqlServices';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ContactsGQL } from '../graphql/generated/gqlServices';

@Injectable()
export class ContactsService {

    private baseUrl: string;

    constructor(
        private _httpClient: HttpClient,
        private _contactsGQL: ContactsGQL,
        private _contactGQL: ContactGQL,

    ) {
        this.baseUrl = environment.backEnd;
    }

    getContacts(filter = "", page: number = 1, size = 10, sortBy: string = "name", descending?: string | boolean, options: any = {}) {

        if (typeof descending == 'string') descending = descending == "desc" ? true : false;

        return this._contactsGQL.watch({ filter, page, size, sortBy, descending }, options)
            .valueChanges
            .pipe(shareReplay())

    }

    getContact(id: string) {
        return this._contactGQL.watch({ id: id }).valueChanges
    }



}
