import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
    switchMap,
    merge,
    mapTo,
    map,
    filter,
    distinctUntilChanged,
    tap
} from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';

import * as identityActions from '../actions/claims.action';
import { AuthService } from 'app/blocks/auth/auth.service';
import { LoadCurrentTenant,LoadRemoteTenant } from '../actions/tenant.action';

@Injectable()
export class ClaimsEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}

    @Effect()
    loadIdentityClaims$ = this.actions$.pipe(
        ofType(identityActions.IdentityClaimsTypes.LoadClaims),
        switchMap(() => {
            return this.authService.isAuthenticated$.pipe(
                filter(isAuthenticated =>
                         this.authService.identityClaims['tenantId'] !== undefined
                    ),
                distinctUntilChanged(),
                map(x => {
                    return this.authService.identityClaims['tenantId'];
                })
            );
        }),
        map(tenantId => {
            return new LoadRemoteTenant();
        })
    );
}
