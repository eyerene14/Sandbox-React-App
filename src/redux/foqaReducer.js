import * as ActionTypes from './ActionTypes';

export const FoqaData = (state = {
    isLoading: true,
    errMess: null,
    foqaData: []
}, action) => {
switch (action.type) {
    case ActionTypes.FOQA_DATA:
        return {...state, isLoading: false, errMess: null, foqaData: action.payload};
    case ActionTypes.FOQA_LOADING:
        return {...state, isLoading: true, errMess: null, foqaData: []};
    case ActionTypes.FOQA_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};