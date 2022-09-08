import { createSelector } from '@ngrx/store';
import * as fromContacts from '../reducers/contacts.reducer';
import { AppState } from '@appStore/reducers';

export const getContactsState = (state: AppState) => state.contacts;

export const contactsSelector = createSelector(getContactsState, fromContacts.getContacts);
export const contactsTotalSelector = createSelector(getContactsState, fromContacts.getContactsTotal);
export const selectedContactSelector = createSelector(getContactsState, fromContacts.getSelectedContact);

export const updateContactSelector = createSelector(getContactsState, fromContacts.getUpdatedContact);
export const updateContactLocallySelector = createSelector(getContactsState, fromContacts.getUpdatedContactLocally);
export const updateContactFailureSelector = createSelector(getContactsState, fromContacts.getUpdatedContactFailure);

export const createContactSelector = createSelector(getContactsState, fromContacts.getCreatedContact);
export const createContactLocallySelector = createSelector(getContactsState, fromContacts.getCreatedContactLocally);
export const createContactFailureSelector = createSelector(getContactsState, fromContacts.getCreatedContactFailure);

export const contactSavedLocallySelector = createSelector(getContactsState, fromContacts.getcontactSavedLocally);

