import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const EmsAuth = (state = {
    isLoading: false,
    isEmsAuthenticated: false,//localStorage.getItem('access_token') ? true : false,
    token_type: localStorage.getItem('token_type') ? true : false,
    access_token: null,
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.EMS_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isEmsAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.EMS_LOGIN_SUCCESS:
            return {
                isLoading: false,
                isEmsAuthenticated: true,
                errMess: '',
                access_token: action.payload,
            };
        case ActionTypes.EMS_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isEmsAuthenticated: false,
                errMess: action.payload
            };
        default:
            return state;
    }
}