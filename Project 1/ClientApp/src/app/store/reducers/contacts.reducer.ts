import { updateContactFailure, createContactFailure } from './../actions/contacts.action';
import { ContactsTotalResponse } from './../model/contacts-total-response';
import { createReducer, on, Action } from '@ngrx/store';
import * as contactsActions from '../actions';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';

export class ContactsState {
    // page: number;
    // size: number;
    // total: number;
    contacts: { data: Contact[], fromServer: boolean };
    contactsTotal: { total: number, fromServer: boolean };
    fromServer: boolean;
    // error: any;
    // loading: boolean;
    // loaded: boolean;
    selectedContact: { data: Contact, fromServer: boolean };

    updateContact: Contact;
    updateContactLocally: boolean;
    updateContactFailure: any;

    createContact: Contact;
    createContactLocally: boolean;
    createContactFailure: any;

    contactSavedLocally: boolean;

}

const initialState: ContactsState = {
    contacts: { data: [], fromServer: false },
    contactsTotal: { total: 0, fromServer: false },

    fromServer: false,

    selectedContact: { data: null, fromServer: false },

    createContact: null,
    createContactLocally: false,
    createContactFailure: [],

    updateContact: null,
    updateContactLocally: false,
    updateContactFailure: [],

    contactSavedLocally: true
};

const contactsReducer = createReducer(initialState,

    // -------------------------------------
    // @ READ CONTACT
    // -------------------------------------

    on(contactsActions.loadContactsSuccess, (state: ContactsState, payload) => {
        return {
            ...state,
            contacts: { data: payload.contacts, fromServer: payload.fromServer }
        };
    }),
    on(contactsActions.loadContactsTotalSuccess, (state: ContactsState, payload) => {
        return {
            ...state,
            contactsTotal: { total: payload.total, fromServer: payload.fromServer }
        };
    }),

    on(contactsActions.loadContactSuccess, (state: ContactsState, payload) => {
        return {
            ...state,
            selectedContact: { data: payload.contact, fromServer: payload.fromServer }
        };
    }),

    // -------------------------------------
    // @ UPDATE CONTACT
    // -------------------------------------

    on(contactsActions.updateContactSuccess, (state: ContactsState, payload) => {
        return {
            ...state,
            updateContact: payload.contact
        };
    }),

    on(contactsActions.updateContactFailure, (state: ContactsState) => {
        return {
            ...state,
            updateContactFailure: true,
        };
    }),

    // -------------------------------------
    // @ CREATE CONTACT
    // -------------------------------------

    on(contactsActions.createContactSuccess, (state: ContactsState, payload) => {
        return {
            ...state,
            createContactFailure: false,
            createContact: payload.contact
        };
    }),

    on(contactsActions.contactSavedLocally, (state: ContactsState) => {
        return {
            ...state,
            contactSavedLocally: true,
        };
    }),

    on(contactsActions.createContactFailure, (state: ContactsState) => {
        return {
            ...state,
            createContactFailure: true,
        };
    }),

);



export function reducer(
    state: ContactsState,
    action: Action
): ContactsState {
    return contactsReducer(state, action);
}


export const getContacts = (state: ContactsState) => state.contacts;
export const getContactsTotal = (state: ContactsState) => state.contactsTotal;
export const getSelectedContact = (state: ContactsState) => state.selectedContact;

export const getUpdatedContact = (state: ContactsState) => state.updateContact;
export const getUpdatedContactFailure = (state: ContactsState) => state.updateContactFailure;
export const getUpdatedContactLocally = (state: ContactsState) => state.updateContactLocally;

export const getCreatedContact = (state: ContactsState) => state.createContact;
export const getCreatedContactFailure = (state: ContactsState) => state.createContactFailure;
export const getCreatedContactLocally = (state: ContactsState) => state.createContactLocally;

export const getcontactSavedLocally = (state: ContactsState) => state.contactSavedLocally;

