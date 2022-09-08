import { createAction, props } from "@ngrx/store";
import {  TagBase } from "app/blocks/graphql/generated/bases";

export const tagSavedLocally = createAction('[TAGS] Tag Saved Locally');

export const loadAllTags = createAction('[TAGS] Load Tags', props<{filter: string, page: number, size: number, options:any }>());
export const loadAllTagsSuccess = createAction('[TAGS] Load Tags Success', props<{ tags: TagBase[], fromServer: boolean }>());
export const loadAllTagsFailure = createAction('[TAGS] Load Tags Failure', props<{ error: any }>());

export const loadAllTagsTotal = createAction('[TAGS] Load Tags Total', props<{filter: string, page: number, size: number, options:any }>());
export const loadAllTagsTotalSuccess = createAction('[TAGS] Load Tags Total Success', props<{ total: number, fromServer: boolean}>());
export const loadAllTagsTotalFailure = createAction('[TAGS] Load Tags Total Failure', props<{ error: any }>());

export const deleteTag = createAction('[TAGS] Delete Tag', props<{id: string}>());
export const deleteTagSuccess = createAction('[TAGS] Delete Tag Success', props<{ tag: any }>());
export const deleteTagFailure = createAction('[TAGS] Delete Tag Failure', props<{ error: readonly any[] }>());
