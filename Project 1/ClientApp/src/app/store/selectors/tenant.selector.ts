import { createSelector } from '@ngrx/store';
import * as fromTenant from '../reducers/tenant.reducer';
import { AppState } from '@appStore/reducers';

export const getTenantState = (state: AppState) => state.tenant;

export const getTenant = createSelector(getTenantState, fromTenant.getTenant);
