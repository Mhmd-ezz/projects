import * as actions from '../actions/tenant.action';
import { Tenant } from '../../blocks/common/tenant.model';

export interface TenantState {
    tenantId: string;
    Tenant: Tenant;
    loading: boolean;
    loaded: boolean;
}

export const initialState: TenantState = {
    tenantId: null,
    Tenant: null,
    loading: false,
    loaded: false
};
export function tenantReducer(state = initialState, action: actions.TenantActions): TenantState {
    switch (action.type) {
        case actions.TenantActionTypes.LoadTenant:
            return {
                ...state,
                tenantId: action.payload,
                loading: true,
                loaded: false
            };
            break;
        case actions.TenantActionTypes.LoadCurrentTenant:
            return {
                ...state,
                loading: true,
                loaded: false
            };
            break;
        case actions.TenantActionTypes.SetCurrentTenant:
            return {
                ...state,
                Tenant: action.payload,
                loading: false,
                loaded: true
            };
            case actions.TenantActionTypes.SetCurrentTenantFailed:
            return {
                ...state,
                //loading: true,
                //loaded: false
            };
            break;
        default:
            return state;
    }

}

export const getTenant = (state: TenantState) => state.Tenant;
