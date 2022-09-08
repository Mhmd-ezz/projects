import { Action, createReducer, on } from "@ngrx/store";
import { Tag } from "app/blocks/graphql/generated/gqlServices";
import { IFuzzyType } from "app/blocks/interface/IFuzztType";
import * as tagsActions from '../actions/tags.action';

export class TagsState {
    tags:{ data: Tag[], fromServer: boolean };
    tagsTotal:{ total: number, fromServer: boolean};
    error: any;
    deleteTag: any;
}

const initialState: TagsState = {  
    tags: { data: [], fromServer: false },
    tagsTotal:{ total: 0, fromServer: false },
    error: null,
    deleteTag: null,
};

const tagsReducer = createReducer(initialState,

       // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------
    on(tagsActions.loadAllTags, (state: TagsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(tagsActions.loadAllTagsSuccess, (state: TagsState, payload) => {
        return {
            ...state,
            tags:{data: payload.tags, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(tagsActions.loadAllTagsFailure, (state: TagsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    on(tagsActions.loadAllTagsTotal, (state: TagsState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(tagsActions.loadAllTagsTotalSuccess, (state: TagsState, payload) => {
        return {
            ...state,
            tagsTotal:{ total: payload.total, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(tagsActions.loadAllTagsTotalFailure, (state: TagsState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    // -------------------------------------
    // @ DELETE GRANTOR
    // -------------------------------------
    on(tagsActions.deleteTag, (state: TagsState, payload) => {
        return {
            ...state,
            deleteGrantor: null,
            error: null,
        };
    }),
    on(tagsActions.deleteTagSuccess, (state: TagsState, payload) => {
        return {
            ...state,
            deleteTag: payload.tag,
            error: null,
        };
    }),
    on(tagsActions.deleteTagFailure, (state: TagsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
   
    );
    export function reducer(
        state: TagsState,
        action: Action
    ): TagsState {
        return tagsReducer(state, action);
    }
    export const getTags = (state: TagsState) => state.tags;
    export const getTagsTotal = (state: TagsState) => state.tagsTotal;
