import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { deleteTagGqlCallback } from "app/blocks/graphql/callback/deleteTagGqlCallback";
import { DeleteTagGQL, TagsGQL, TagsTotalGQL } from "app/blocks/graphql/generated/gqlServices";
import { map, switchMap } from "rxjs/operators";

import * as fromTagsActions from '../actions/tags.action';
@Injectable()
export class TagsEffects {

    constructor(
        private actions$: Actions,
        private _tagsGQL: TagsGQL,
        private _tagsTotalGQL: TagsTotalGQL,
        private _deleteTagGQL: DeleteTagGQL,
    )
    {

    }

    @Effect()
    loadTags$ = this.actions$.pipe(
        ofType(fromTagsActions.loadAllTags),
        switchMap((data) => this._tagsGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size},
             data.options )
        .valueChanges),
        map(({ data, loading, errors }) => {
            
            const tags = data && data.tags ? data.tags : [];            
            if (errors) {
                return fromTagsActions.loadAllTagsFailure({ error: errors });
            }

            if(loading) {
                return fromTagsActions.loadAllTagsSuccess({ tags: tags, fromServer: false });
            } else {
                return fromTagsActions.loadAllTagsSuccess({ tags: tags, fromServer: true });
            }

         } )
        
    );

    @Effect()
    loadGrantorsTotal$ = this.actions$.pipe(
        ofType(fromTagsActions.loadAllTagsTotal),
        switchMap((data) => this._tagsTotalGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size},
            data.options )
        .valueChanges),
        map(({ data, errors, loading }) => {

            const total = data && data.tagsTotal ? data.tagsTotal : 0;

            if (errors) {
                return fromTagsActions.loadAllTagsFailure({ error: errors });
            }

            if (loading) {
                return fromTagsActions.loadAllTagsTotalSuccess({ total, fromServer: false });
            }
            else {
                return fromTagsActions.loadAllTagsTotalSuccess({ total, fromServer: true });
            }
        })
    );

    @Effect()
    deleteTag$ = this.actions$.pipe(
        ofType(fromTagsActions.deleteTag),
        switchMap((data) => this._deleteTagGQL.mutate({ id: data.id },
            {
                optimisticResponse: deleteTagGqlCallback.optimisticResponse(data.id),
                update: (proxy, ev) => deleteTagGqlCallback.update(proxy, ev)
            }
        )),
        map((data) => {
            const tag = data && data.data && data.data.deleteTag ? data.data.deleteTag : null;

            if (data['dataPresent']) {
                return fromTagsActions.tagSavedLocally();
            }

            if (data.errors) {
                return fromTagsActions.deleteTagFailure({ error: data.errors });
            }

            return fromTagsActions.deleteTagSuccess({ tag });
        })
    );
    
}

