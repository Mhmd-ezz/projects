import { Action, createReducer, on } from "@ngrx/store";
import { Drug } from "app/blocks/graphql/generated/gqlServices";
import { IFuzzyType } from "app/blocks/interface/IFuzztType";
import * as drugssActions from '../actions/drugs.action';
export class DrugsState {

    drugs: Drug[];
    drugsFuzzySearch: IFuzzyType<Drug>[];
    error: any;
}

const initialState: DrugsState = {
    drugs: [],
    drugsFuzzySearch: [],
    error: null
};

const drugsReducer = createReducer(initialState,

    // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------
    on(drugssActions.loadDrugs, (state: DrugsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(drugssActions.loadDrugsSuccess, (state: DrugsState, payload) => {
        return {
            ...state,
            drugs: payload.drugs,
            error: null
        };
    }),
    on(drugssActions.loadDrugsFailure, (state: DrugsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // on(drugssActions.DrugsFuzzySearchSuccess, (state: DrugsState, payload) => {
    //     console.log('redcuer Fuzzy',payload)
    //     return {
    //         ...state,
    //         drugsFuzzySearch:payload.drugs,
    //         error: null
    //     };
    // }),
);
export function reducer(
    state: DrugsState,
    action: Action
): DrugsState {
    return drugsReducer(state, action);
}
export const getDrugs = (state: DrugsState) => state.drugs;
    //export const getDrugsFuzzySearch = (state: DrugsState) => state.drugsFuzzySearch;