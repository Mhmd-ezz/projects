import { Action, createReducer, on } from "@ngrx/store";
import { Lookup } from "app/blocks/graphql/generated/gqlServices";
import * as lookupsActions from '../actions/lookups.action';
export class LookupsState {

    lookups:Lookup[];
    lookupsByGroupTotal:any;
    error:any;
}

const initialState: LookupsState = {
    lookups:[],
    lookupsByGroupTotal:0,
    error:null
};

const lookupsReducer = createReducer(initialState,

       // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------
    on(lookupsActions.loadLookups, (state: LookupsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(lookupsActions.loadLookupsSuccess, (state: LookupsState, payload) => {
        return {
            ...state,
            lookups:payload.lookups,
            error: null
        };
    }),
    on(lookupsActions.loadLookupsFailure, (state: LookupsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    on(lookupsActions.loadLookupsTotalSuccess, (state: LookupsState, payload) => {
        return {
            ...state,
            lookupsByGroupTotal:payload.lookupsByGroupTotal,
            error: null
        };
    }),
    on(lookupsActions.loadLookupsTotalFailure, (state: LookupsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    );
    export function reducer(
        state: LookupsState,
        action: Action
    ): LookupsState {
        return lookupsReducer(state, action);
    }
    export const getLookups = (state: LookupsState, props?) => {
        const res = !!state.lookups && !!props && !!props.groupKey && state.lookups[0]?.groupKey === props.groupKey ? state.lookups : null;
        // console.log(res, props);
        return res;
    };
    export const getLookupsTotal = (state: LookupsState) => state.lookupsByGroupTotal;