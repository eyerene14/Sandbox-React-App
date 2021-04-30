import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const EmsAPI = (state = {
    isLoading: false,
    token: null,
    emsGetData: null,
    emsPostData: null,
    airports: [],
    params: {
        selectedFleet: localStorage.getItem('selectedFleet') ? localStorage.getItem('selectedFleet') : null,
        selectedProfile: localStorage.getItem('selectedProfile') ? localStorage.getItem('selectedProfile') : null
    },
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.EMS_REQUEST_PARAMS:
            return {
                ...state,
                isLoading: true,
                params: action.params
            };
        case ActionTypes.EMS_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: '',
                emsGetData: action.payload
            };
        case ActionTypes.EMS_GET_FAILURE:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };
        case ActionTypes.EMS_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: '',
                emsPostData: action.payload
            };
        case ActionTypes.EMS_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };
        case ActionTypes.EMS_AIRPORTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: '',
                airports: action.payload.discreteValues
            };
        case ActionTypes.EMS_AIRPORTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };
        default:
            return state;
    }
}