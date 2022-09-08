import * as actions from '../actions/network.action';

export interface State {
    isOnline: boolean;
}

export const initialState: State = {
    isOnline: navigator.onLine
};

export function reducer(
    state = initialState,
    action: actions.NetworkActions
): State {
    switch (action.type) {
        case actions.NetworkActionTypes.SetIsOnline:
            return handleIsOnline(state, action);

        default:
            return state;
    }
}

function handleIsOnline(state: State, action: actions.SetIsOnline): State {
    return {
        ...state,
        isOnline: action.payload
    };
}

export const getIsOnline = (state: State) => state.isOnline;
