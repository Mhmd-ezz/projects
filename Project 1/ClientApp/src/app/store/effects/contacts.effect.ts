import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactGQL, ContactsGQL, CreateContactGQL, UpdateContactGQL } from 'app/blocks/graphql/generated/gqlServices';
import { map, switchMap } from 'rxjs/operators';

import * as fromContactsActions from '../actions';
import { ContactInput, ContactsTotalGQL } from './../../blocks/graphql/generated/gqlServices';

@Injectable()
export class ContactsEffects {
    constructor(
        private actions$: Actions,
        private _contactsGQL: ContactsGQL,
        private _contactsTotalGQL: ContactsTotalGQL,
        private _contactGQL: ContactGQL,
        private _updateContactGQL: UpdateContactGQL,
        private _createContactGQL: CreateContactGQL,

    ) { }

    @Effect()
    loadContacts$ = this.actions$.pipe(
        ofType(fromContactsActions.loadContacts),
        switchMap((data) => this._contactsGQL.watch({ ...data.variables }).valueChanges),
        map(({ data, errors, loading }) => {

            const contacts = data && data.contacts ? data.contacts : [];

            if (errors) {
                return fromContactsActions.loadContactsFailure({ error: errors });
            }

            if (loading) {
                return fromContactsActions.loadContactsSuccess({ contacts, fromServer: false });
            }
            else {
                return fromContactsActions.loadContactsSuccess({ contacts, fromServer: true });
            }
        })
    );

    @Effect()
    loadContactsTotal$ = this.actions$.pipe(
        ofType(fromContactsActions.loadContactsTotal),
        switchMap((data) => this._contactsTotalGQL.watch({ ...data.variables }).valueChanges),
        map(({ data, errors, loading }) => {

            const total = data && data.contactsTotal ? data.contactsTotal : null;

            if (errors) {
                return fromContactsActions.loadContactsTotalFailure({ error: errors });
            }

            if (loading) {
                return fromContactsActions.loadContactsTotalSuccess({ total, fromServer: false });
            }
            else {
                return fromContactsActions.loadContactsTotalSuccess({ total, fromServer: true });
            }
        })
    );

    @Effect()
    loadContact$ = this.actions$.pipe(
        ofType(fromContactsActions.loadContact),
        switchMap((data) => this._contactGQL.watch({ id: data.id }).valueChanges),
        map(({ data, errors, loading }) => {

            const contact = data && data.contact ? data.contact : null;

            if (errors) {
                return fromContactsActions.loadContactFailure({ error: errors });
            }

            if (loading) {
                return fromContactsActions.loadContactSuccess({ contact, fromServer: false });
            }
            else {
                return fromContactsActions.loadContactSuccess({ contact, fromServer: true });
            }
        })
    );

    @Effect()
    updateContact$ = this.actions$.pipe(
        ofType(fromContactsActions.updateContact),
        switchMap((data) => this._updateContactGQL.mutate({ contact: data.contact as ContactInput })),
        map((data) => {

            const contact = data && data.data.updateContact ? data.data.updateContact : null;
            if (data['dataPresent']) {
                return fromContactsActions.contactSavedLocally();
            }

            if (data.errors) {
                return fromContactsActions.updateContactFailure({ error: data.errors });
            }

            return fromContactsActions.updateContactSuccess({ contact });
        })
    );

    @Effect()
    createContact$ = this.actions$.pipe(
        ofType(fromContactsActions.createContact),
        switchMap((data) => this._createContactGQL.mutate({ contact: data.contact as ContactInput })),
        map((data) => {

            const contact = data && data.data.createContact ? data.data.createContact : null;

            if (data['dataPresent']) {
                return fromContactsActions.contactSavedLocally();
            }

            if (data.errors) {
                return fromContactsActions.createContactFailure({ error: data.errors });
            }

            return fromContactsActions.createContactSuccess({ contact });
        })
    );

}
