import * as ActionTypes from './ActionTypes';

export const SafetyData = (state = {
    isLoading: true,
    errMess: null,
    safetyData: []
}, action) => {
switch (action.type) {
    case ActionTypes.SAFETY_DATA:
        return {...state, isLoading: false, errMess: null, safetyData: action.payload};
    case ActionTypes.SAFETY_LOADING:
        return {...state, isLoading: true, errMess: null, safetyData: []};
    case ActionTypes.SAFETY_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};