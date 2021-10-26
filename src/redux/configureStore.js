import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsitesReducer';
import { Comments } from './commentsReducer';
import { CCFormReducer } from './ccFormReducer';
import { SafetyData } from './safetyReducer';
import { FoqaData } from './foqaReducer';
import { Auth } from './authenticationReducer';
import { EmsAuth } from './emsAuthenticationReducer';
import { EmsAPI } from './emsDataReducer';
import { InitialCCForm } from './forms';
import { createForms } from 'react-redux-form';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            /*...createForms({
                ccSurveryForm: InitialCCForm
            }),*/
            safetyData: SafetyData,
            foqaData: FoqaData,
            ccForm: CCFormReducer,
            ...createForms({
                ccSurveryForm: InitialCCForm
            }),
            auth: Auth,
            emsAuth: EmsAuth,
            emsData: EmsAPI
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};