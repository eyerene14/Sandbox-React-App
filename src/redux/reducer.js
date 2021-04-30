import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
};

export const Reducer = (state = initialState, action) => {
    return state;
};