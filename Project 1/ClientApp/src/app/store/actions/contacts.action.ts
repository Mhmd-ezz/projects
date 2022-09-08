import { ContactsParams } from '@appStore/model/contacts-params';
import { createAction, props } from '@ngrx/store';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';

export const loadContacts = createAction('[Contacts] Load Contacts', props<{ variables: ContactsParams }>());
export const loadContactsSuccess = createAction('[Contacts] Load Contacts Success', props<{ contacts: Contact[], fromServer: boolean }>());
export const loadContactsFailure = createAction('[Contacts] Load Contacts Failure', props<{ error: readonly any[] }>());

export const loadContactsTotal = createAction('[Contacts] Load Contacts Total', props<{ variables: ContactsParams }>());
export const loadContactsTotalSuccess = createAction('[Contacts] Load Contacts Total Success', props<{ total: number, fromServer: boolean }>());
export const loadContactsTotalFailure = createAction('[Contacts] Load Contacts Total Failure', props<{ error: readonly any[] }>());

export const loadContact = createAction('[Contacts] Load Contact', props<{ id: string }>());
export const loadContactSuccess = createAction('[Contacts] Load Contact Success', props<{ contact: Contact, fromServer: boolean }>());
export const loadContactFailure = createAction('[Contacts] Load Contact Failure', props<{ error: readonly any[] }>());

export const createContact = createAction('[Contacts] Create Contact', props<{ contact: Contact }>());
export const createContactSuccess = createAction('[Contacts] Create Contact Success', props<{ contact: Contact }>());
export const createContactFailure = createAction('[Contacts] Create Contact Failure', props<{ error: readonly any[] }>());
export const createContactSavedLocally = createAction('[Contacts] Update Contact Saved Locally');


export const updateContact = createAction('[Contacts] Update Contact', props<{ contact: Contact }>());
export const updateContactSuccess = createAction('[Contacts] Update Contact Success', props<{ contact: Contact }>());
export const updateContactFailure = createAction('[Contacts] Update Contact Failure', props<{  error: readonly any[] }>());
export const updateContactSavedLocally = createAction('[Contacts] Update Contact Saved Locally');

export const contactSavedLocally = createAction('[Contacts] Contact Saved Locally');

