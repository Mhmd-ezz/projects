import { createAction, props } from "@ngrx/store";
import { LookupBase } from "app/blocks/graphql/generated/bases";

export const loadLookups = createAction('[Patients] Load Lookups', props<{ group: string,filter: string, page: number, size: number, filterPredefined: boolean }>());
export const loadLookupsSuccess = createAction('[Patients] Load Lookups Success', props<{ lookups: LookupBase[]}>());
export const loadLookupsFailure = createAction('[Patients] Load Lookups Failure', props<{ error: readonly any[] }>());

export const loadLookupsTotal = createAction('[Patients] Load Lookups Total', props<{ group: string,filter: string, page: number, size: number, filterPredefined: boolean }>());
export const loadLookupsTotalSuccess = createAction('[Patients] Load Lookups Total Success', props<{ lookupsByGroupTotal: any}>());
export const loadLookupsTotalFailure = createAction('[Patients] Load Lookups Total Failure', props<{ error: readonly any[] }>());

