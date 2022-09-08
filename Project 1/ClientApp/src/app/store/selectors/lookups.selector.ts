import { createSelector } from '@ngrx/store';
import * as fromLookups from '../reducers/lookups.reducer';
import { AppState } from '@appStore/reducers';

export const getLookupsState = (state: AppState) => state.lookups;

export const getLookups = createSelector(getLookupsState, fromLookups.getLookups);

export const getLookupsTotal = createSelector(getLookupsState, fromLookups.getLookupsTotal);