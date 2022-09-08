import { Action } from '@ngrx/store';

export enum IdentityClaimsTypes {
    LoadClaims = '[IdentityClaims] Load',
    SetUsername = '[IdentityClaims] Set User name'
}

export class LoadClaims implements Action {
    readonly type = IdentityClaimsTypes.LoadClaims;
}

export class SetUsername implements Action {
    readonly type = IdentityClaimsTypes.SetUsername;

    constructor(public payload: string) {}
}

export type IdentityClaimsActions = LoadClaims | SetUsername;
