import * as actions from '../actions/claims.action';

export interface State {
    username: string;    
}

export const initialState: State = {
    username: null
};

export function claimsReducer(state = initialState, action: actions.IdentityClaimsActions): State {

    switch (action.type) {
        case actions.IdentityClaimsTypes.LoadClaims:
            return {
                ...state
            };
        case actions.IdentityClaimsTypes.SetUsername:
            return {
                ...state,
                username: action.payload
            };
        
        default:
            return state;
    }
}
