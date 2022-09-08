import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer, createSelector } from '@ngrx/store';

import * as fromNetwork from './network.reducer';
import * as fromTenant from './tenant.reducer';
import * as fromClaims from './claims.reducer';
import * as fromContacts from './contacts.reducer';
import * as fromPatients from './patients.reducer';
import * as fromLookups from './lookups.reducer';
import * as fromDrugs from './drugs.reducer';
import * as fromGrantors from './grantors.reducer';
import * as fromTags from './tags.reducer';
import * as fromAppointments from './appointments.reducer';
import * as fromTodos from './todos.reducer';
import * as fromTickets from './tickets.reducer';
export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface AppState {
    contacts: fromContacts.ContactsState;
    patients:fromPatients.PatientsState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    network: fromNetwork.State;
    tenant: fromTenant.TenantState;
    claims: fromClaims.State;
    lookups: fromLookups.LookupsState;
    drugs: fromDrugs.DrugsState;
    grantors: fromGrantors.GrantorsState;
    tags: fromTags.TagsState;
    appointments: fromAppointments.AppointmentsState;
    todos: fromTodos.TodosState;
    tickets:fromTickets.TicketsState
}

export const reducers: ActionReducerMap<AppState> = {
    contacts: fromContacts.reducer,
    patients:fromPatients.reducer,
    routerReducer: fromRouter.routerReducer,
    network: fromNetwork.reducer,
    tenant: fromTenant.tenantReducer,
    claims: fromClaims.claimsReducer,
    lookups:fromLookups.reducer,
    drugs:fromDrugs.reducer,
    grantors:fromGrantors.reducer,
    tags:fromTags.reducer,
    appointments:fromAppointments.reducer,
    todos:fromTodos.reducer,
    tickets:fromTickets.reducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): RouterStateUrl {

        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;

        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;

        return {
            url,
            queryParams,
            params
        };
    }
}

export const getNetworkState = createFeatureSelector<fromNetwork.State>('network');

export const getIsOnline = createSelector(getNetworkState, fromNetwork.getIsOnline);

export const getTenantState = createFeatureSelector<fromTenant.TenantState>('tenant');

export const getCurrentTenant = createSelector(getTenantState, fromTenant.getTenant);

export const getClaimsState = createFeatureSelector<fromClaims.State>('claims');



