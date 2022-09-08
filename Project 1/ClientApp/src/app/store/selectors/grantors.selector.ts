import { createSelector } from '@ngrx/store';
import * as fromGrantors from '../reducers/grantors.reducer';
import { AppState } from '@appStore/reducers';

export const getGrantorsState = (state: AppState) => state.grantors;

export const getGrantors = createSelector(getGrantorsState, fromGrantors.getGrantors);
export const getGrantorsTotal = createSelector(getGrantorsState, fromGrantors.getGrantorsTotal);
