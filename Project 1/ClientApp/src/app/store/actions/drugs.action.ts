import { createAction, props } from "@ngrx/store";
import { DrugBase } from "app/blocks/graphql/generated/bases";
import { Drug } from "app/blocks/graphql/generated/gqlServices";
import { IFuzzyType } from "app/blocks/interface/IFuzztType";
import { ISearchOptions } from "app/blocks/interface/search-options";

export const loadDrugs = createAction('[DRUGS] Load Drugs', props<{ filter: string, page: number, size: number, options: any }>());
export const loadDrugsSuccess = createAction('[DRUGS] Load Drugs Success', props<{ drugs: DrugBase[] }>());
export const loadDrugsFailure = createAction('[DRUGS] Load Drugs Failure', props<{ error: any }>());

export const DrugsFuzzySearch = createAction('[DRUGS]  Drugs Fuzzy Search', props<{ drugs: Drug[], filter: string, options: ISearchOptions }>());
export const DrugsFuzzySearchSuccess = createAction('[DRUGS]  Drugs Fuzzy Success', props<{ drugs: IFuzzyType<Drug>[] }>());
export const DrugsFuzzySearchFailure = createAction('[DRUGS]  Drugs Fuzzy Failure', props<{ error: any }>());