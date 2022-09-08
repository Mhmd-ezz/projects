import { createSelector } from '@ngrx/store';
import * as fromTags from '../reducers/tags.reducer';
import { AppState } from '@appStore/reducers';

export const getTagsState = (state: AppState) => state.tags;

export const getTags = createSelector(getTagsState, fromTags.getTags);
export const getTagsTotal = createSelector(getTagsState, fromTags.getTagsTotal);
