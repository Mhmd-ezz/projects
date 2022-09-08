import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LookupsByGroupGQL, LookupsByGroupTotalGQL } from "app/blocks/graphql/generated/gqlServices";
import { map, switchMap } from "rxjs/operators";

import * as fromLookupssActions from '../actions/lookups.action';
@Injectable()
export class LookupsEffects {

    constructor(
        private actions$: Actions,
        private _lookupsByGroupGQL: LookupsByGroupGQL,
        
        public _lookupsByGroupTotalGQL: LookupsByGroupTotalGQL,
    )
    {

    }

    @Effect()
    loadLookups$ = this.actions$.pipe(
        ofType(fromLookupssActions.loadLookups),
        switchMap((data) => this._lookupsByGroupGQL.watch({
            group: data.group,
            filter: data.filter,
            page: data.page,
            size: data.size,
            filterPredefined: data.filterPredefined })
        .valueChanges),
        map(({ data, errors }) => {
            
            const lookups = data && data.lookupsByGroup ? data.lookupsByGroup : [];            
            if (errors) {
                    return fromLookupssActions.loadLookupsFailure({ error: errors });
                }
                  
                else {
                    return fromLookupssActions.loadLookupsSuccess({ lookups: lookups});
                }
           
         } )
        
    );
    @Effect()
    loadLookupsTotal$ = this.actions$.pipe(
        ofType(fromLookupssActions.loadLookupsTotal),
        switchMap((data) => this._lookupsByGroupTotalGQL.watch({
            group: data.group,
            filter: data.filter,
            page: data.page,
            size: data.size,
            filterPredefined: data.filterPredefined })
        .valueChanges),
        map(({ data, errors }) => {
            
            const lookupsByGroupTotal = data && data.lookupsByGroupTotal ? data.lookupsByGroupTotal : [];            
            if (errors) {
                    return fromLookupssActions.loadLookupsTotalFailure({ error: errors });
                }
                  
                else {
                    return fromLookupssActions.loadLookupsTotalSuccess({ lookupsByGroupTotal: lookupsByGroupTotal});
                }
           
         } )
        
    );
}
