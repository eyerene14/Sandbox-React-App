import * as ActionTypes from './ActionTypes';

export const CCFormReducer = (state = {
    isLoading: true,
    errMess: null,
    ccData: []
}, action) => {
    switch (action.type) {
        case ActionTypes.CC_DATA:
            return { ...state, isLoading: false, errMess: null, ccData: action.payload };
        case ActionTypes.CC_LOADING:
            return { ...state, isLoading: true, errMess: null, ccData: [] };
        case ActionTypes.CC_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        case ActionTypes.INSERT_CC_ROW:
            const comment = action.payload;
            return { ...state, comments: state.comments.concat(comment) };
        default:
            return state;
    }
};