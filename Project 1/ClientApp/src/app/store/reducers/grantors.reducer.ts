import { Action, createReducer, on } from "@ngrx/store";
import { Grantor } from "app/blocks/graphql/generated/gqlServices";
import * as grantorsActions from '../actions/grantors.action';

export class GrantorsState {
    grantors: { data: Grantor[], fromServer: boolean };
    grantorsTotal:{ total: number, fromServer: boolean};
    error:any;
    deleteGrantor: any;
}

const initialState: GrantorsState = {  
    grantors:{ data: [], fromServer: false },
    grantorsTotal:{ total: 0, fromServer: false },
    error:null,
    deleteGrantor: null,
};

const grantorsReducer = createReducer(initialState,

       // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------
    on(grantorsActions.loadAllGrantors, (state: GrantorsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(grantorsActions.loadAllGrantorsSuccess, (state: GrantorsState, payload) => {
        return {
            ...state,
            grantors: {data: payload.grantors, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(grantorsActions.loadAllGrantorsFailure, (state: GrantorsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    on(grantorsActions.loadAllGrantorsTotal, (state: GrantorsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(grantorsActions.loadAllGrantorsTotalSuccess, (state: GrantorsState, payload) => {
        return {
            ...state,
            grantorsTotal:{ total: payload.total, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(grantorsActions.loadAllGrantorsTotalFailure, (state: GrantorsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    // -------------------------------------
    // @ DELETE GRANTOR
    // -------------------------------------
    on(grantorsActions.deleteGrantor, (state: GrantorsState, payload) => {
        return {
            ...state,
            deleteGrantor: null,
            error: null,
        };
    }),
    on(grantorsActions.deleteGrantorSuccess, (state: GrantorsState, payload) => {
        return {
            ...state,
            deleteGrantor: payload.grantor,
            error: null,
        };
    }),
    on(grantorsActions.deleteGrantorFailure, (state: GrantorsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
);

export function reducer(
    state: GrantorsState,
    action: Action
): GrantorsState {
    return grantorsReducer(state, action);
}
export const getGrantors = (state: GrantorsState) => state.grantors;
export const getGrantorsTotal = (state: GrantorsState) => state.grantorsTotal;

