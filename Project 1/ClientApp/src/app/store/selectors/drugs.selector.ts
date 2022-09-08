import { createSelector } from '@ngrx/store';
import * as fromDrugs from '../reducers/drugs.reducer';
import { AppState } from '@appStore/reducers';

export const getDrugsState = (state: AppState) => state.drugs;

//export const DrugsFuzzySearch = createSelector(getDrugsState, fromDrugs.getDrugsFuzzySearch);

export const GetDrugs = createSelector(getDrugsState, fromDrugs.getDrugs);
