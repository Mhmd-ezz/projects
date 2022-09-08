import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { deleteGrantorGqlCallback } from "app/blocks/graphql/callback/deleteGrantorGqlCallback";
import { GrantorsGQL, DeleteGrantorGQL, GrantorsTotalGQL } from "app/blocks/graphql/generated/gqlServices";
import { data } from "app/dashboard/data";
import { map, switchMap } from "rxjs/operators";

import * as fromGrantorsActions from '../actions/grantors.action';
@Injectable()
export class GrantorsEffects {

    constructor(
        private actions$: Actions,
        private _grantorsGQL: GrantorsGQL,
        private _deleteGrantorGQL: DeleteGrantorGQL,
        private _grantorsTotalGQL: GrantorsTotalGQL,
    )
    {

    }

    @Effect()
    loadGrantors$ = this.actions$.pipe(
        ofType(fromGrantorsActions.loadAllGrantors),
        switchMap((data) => this._grantorsGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size},
            data.options )
        .valueChanges),
        map(({ data, errors, loading }) => {
            
            const grantors = data && data.grantors ? data.grantors : [];            
            if (errors) {
                return fromGrantorsActions.loadAllGrantorsFailure({ error: errors });
            }
            
            if(loading) {
                return fromGrantorsActions.loadAllGrantorsSuccess({ grantors: grantors, fromServer: false});
            } else {
                return fromGrantorsActions.loadAllGrantorsSuccess({ grantors: grantors, fromServer: true});
            }
           
         } )
        
    );

    @Effect()
    loadGrantorsTotal$ = this.actions$.pipe(
        ofType(fromGrantorsActions.loadAllGrantorsTotal),
        switchMap((data) => this._grantorsTotalGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size},
            data.options )
        .valueChanges),
        map(({ data, errors, loading }) => {

            const total = data && data.grantorsTotal ? data.grantorsTotal : 0;

            if (errors) {
                return fromGrantorsActions.loadAllGrantorsTotalFailure({ error: errors });
            }

            if (loading) {
                return fromGrantorsActions.loadAllGrantorsTotalSuccess({ total, fromServer: false });
            }
            else {
                return fromGrantorsActions.loadAllGrantorsTotalSuccess({ total, fromServer: true });
            }
        })
    );

    @Effect()
    deleteGrantor$ = this.actions$.pipe(
        ofType(fromGrantorsActions.deleteGrantor),
        switchMap((data) => this._deleteGrantorGQL.mutate({ id: data.id },
            {
                optimisticResponse: deleteGrantorGqlCallback.optimisticResponse(data.id),
                update: (proxy, ev) => deleteGrantorGqlCallback.update(proxy, ev)
            }
        )),
        map((data) => {
            const grantor = data && data.data && data.data.deleteGrantor ? data.data.deleteGrantor : null;

            if (data['dataPresent']) {
                return fromGrantorsActions.grantorSavedLocally();
            }

            if (data.errors) {
                return fromGrantorsActions.deleteGrantorFailure({ error: data.errors });
            }

            return fromGrantorsActions.deleteGrantorSuccess({ grantor });
        })
    );
}

