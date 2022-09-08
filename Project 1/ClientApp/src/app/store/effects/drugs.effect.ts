import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { DrugsGQL } from "app/blocks/graphql/generated/gqlServices";
import { FuzzySearchService } from "app/blocks/pipes/fuzzy-search.service";
import { map, switchMap } from "rxjs/operators";

import * as fromDrugsActions from '../actions/drugs.action';
@Injectable()
export class DrugsEffects {

    constructor(
        private actions$: Actions,
        private _drugsGQL: DrugsGQL,
        private _fuzzySearch: FuzzySearchService,

    ) {

    }

    @Effect()
    loadDrugs$ = this.actions$.pipe(
        ofType(fromDrugsActions.loadDrugs),
        switchMap((data) => this._drugsGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size
        },
            data.options)
            .valueChanges),
        map(({ data, errors }) => {

            const drugs = data && data.drugs ? data.drugs : [];
            if (errors)
                return fromDrugsActions.loadDrugsFailure({ error: errors });
            else
                return fromDrugsActions.loadDrugsSuccess({ drugs: drugs });
        })
    );


    // @Effect()
    // DrugsFuzzySearch$ = this.actions$.pipe(
    //     ofType(fromDrugsActions.DrugsFuzzySearch),
    //     switchMap((data) => this._fuzzySearch.search(
    //         data.drugs,
    //         data.filter,
    //         data.options.keys,
    //         data.options,

    //     )),
    //     map(( drugs:any[]  ) => {   
    //         const results = drugs;               
    //                 return fromDrugsActions.DrugsFuzzySearchSuccess({ drugs: results });                

    //      } )

    // );



}

