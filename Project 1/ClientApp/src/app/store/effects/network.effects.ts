import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'apollo-link';
import { Action } from '@ngrx/store';

import * as networkActions from '../actions/network.action';
import { merge, fromEvent, of } from 'rxjs';
import { mapTo, switchMap, map } from 'rxjs/operators';
import { SetIsOnline } from '../actions/network.action';

@Injectable()
export class NetworkEffects {

    constructor(
        private actions$: Actions
    ) {}

    @Effect()
    startOnlineOfflineCheck$ = 
        this.actions$.pipe(
            ofType(networkActions.NetworkActionTypes.StartOnlineOfflineCheck),
            switchMap( () => {
                return merge(
                    of(navigator.onLine),
                    fromEvent(window, 'online').pipe(mapTo(true)),
                    fromEvent(window, 'offline').pipe(mapTo(false))
                );
            }),
            map(isOnline => {
                return new SetIsOnline(isOnline);
            })
        );
}
