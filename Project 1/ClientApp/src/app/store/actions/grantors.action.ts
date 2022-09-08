import { createAction, props } from "@ngrx/store";
import {  GrantorBase } from "app/blocks/graphql/generated/bases";

export const grantorSavedLocally = createAction('[GRANTORS] Grantor Saved Locally');

export const loadAllGrantors = createAction('[GRANTORS] Load Grantors', props<{filter: string, page: number, size: number, options:any }>());
export const loadAllGrantorsSuccess = createAction('[GRANTORS] Load Grantors Success', props<{ grantors: GrantorBase[], fromServer: boolean}>());
export const loadAllGrantorsFailure = createAction('[GRANTORS] Load Grantors Failure', props<{ error: any }>());

export const loadAllGrantorsTotal = createAction('[GRANTORS] Load Grantors Total', props<{filter: string, page: number, size: number, options:any }>());
export const loadAllGrantorsTotalSuccess = createAction('[GRANTORS] Load Grantors Total Success', props<{ total: number, fromServer: boolean}>());
export const loadAllGrantorsTotalFailure = createAction('[GRANTORS] Load Grantors Total Failure', props<{ error: any }>());

export const deleteGrantor = createAction('[GRANTORS] Delete Grantor', props<{id: string}>());
export const deleteGrantorSuccess = createAction('[GRANTORS] Delete Grantor Success', props<{ grantor: any }>());
export const deleteGrantorFailure = createAction('[GRANTORS] Delete Grantor Failure', props<{ error: readonly any[] }>());