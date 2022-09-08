import {Action} from '@ngrx/store';
import { Tenant } from 'app/blocks/common/tenant.model';

export enum TenantActionTypes {
    LoadTenant = '[Tenant] Load Tenant',
    LoadCurrentTenant = '[Tenant] Load Current Tenant',
    LoadRemoteTenant = '[Tenant] Load Remote Tenant',
    SetCurrentTenant = '[Tenant] Set Current Tenant',
    SetCurrentTenantFailed='[Tenant] Set Current Tenant Failed',
}

export class LoadTenant implements Action {
    readonly type = TenantActionTypes.LoadTenant;

    constructor(public payload: string) {}
}

export class LoadCurrentTenant implements Action {
    readonly type = TenantActionTypes.LoadCurrentTenant;

    constructor() {}
}
export class LoadRemoteTenant implements Action {
    readonly type = TenantActionTypes.LoadRemoteTenant;

    constructor() {}
}


export class LoadCurrentTenantLocally implements Action {
    readonly type = TenantActionTypes.LoadCurrentTenant;

    constructor() {}
}

export class SetCurrentTenant implements Action {
    readonly type = TenantActionTypes.SetCurrentTenant;

    constructor(public payload: Tenant) {}
}

export class SetCurrentTenantFailed implements Action {
    readonly type = TenantActionTypes.SetCurrentTenantFailed;

    constructor(public payload: Tenant) {}
}

export type TenantActions = LoadTenant | LoadCurrentTenant | LoadCurrentTenantLocally | SetCurrentTenant | LoadRemoteTenant | SetCurrentTenantFailed;
