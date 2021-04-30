import * as ActionTypes from './ActionTypes';
//import { CAMPSITES } from '../shared/campsites';
import { baseUrl, emsLoginUrl, emsdbGroups, boeingProfileUrls, airbusProfileUrls, p0ProfileUrls, lacodes } from '../shared/baseUrl';
import { urlencoded } from 'body-parser';
var qs = require('qs');

export const fetchSafetyData = () => dispatch => {
    //dispatch(campsitesLoading());

    return fetch(baseUrl + 'apiSafety')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(data => dispatch(getSafetyData(data)))
        .catch(error => dispatch(safetyDataFailed(error.message)));
};

export const getSafetyData = safetyData => ({
    type: ActionTypes.SAFETY_DATA,
    payload: safetyData
});

export const safetyDataFailed = errMess => ({
    type: ActionTypes.SAFETY_FAILED,
    payload: errMess
});

export const fetchFoqaData = () => dispatch => {

    //dispatch(campsitesLoading());

    return fetch(baseUrl + 'apiFoqa')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(data => dispatch(getFoqaData(data)))
        .catch(error => dispatch(foqaDataFailed(error.message)));
};

export const getFoqaData = foqaData => ({
    type: ActionTypes.FOQA_DATA,
    payload: foqaData
});

export const foqaDataFailed = errMess => ({
    type: ActionTypes.FOQA_FAILED,
    payload: errMess
});


export const postCCForm = (firstName, lastName, gatekeeper, email, fleet, fleetType, freighter, event, cause, contactDate, flightRecord, pilotFlying, location, origin, destination, rwy, caLOExperience, foLOExperience, roeCAHrs, roeCALandings, roeFOHrs, roeFOLandings, breakDuration, lastTraining, contibutingFactor, controlled, ccdetails) => dispatch => {

    const newCC = {
        firstName: firstName,
        lastName: lastName,
        gatekeeper: gatekeeper,
        email: email,
        fleet: fleet,
        fleetType: fleetType,
        freighter: freighter,
        event: event,
        cause: cause,
        contactDate: contactDate,
        flightRecord: flightRecord,
        pilotFlying: pilotFlying,
        location: location,
        origin: origin,
        destination: destination,
        rwy: rwy,
        caLOExperience: caLOExperience,
        foLOExperience: foLOExperience,
        roeCAHrs: roeCAHrs,
        roeCALandings: roeCALandings,
        roeFOHrs: roeFOHrs,
        roeFOLandings: roeFOLandings,
        breakDuration: breakDuration,
        lastTraining: lastTraining,
        contibutingFactor: contibutingFactor,
        controlled: controlled,
        ccdetails: ccdetails
    }
    //newCC.date = new Date().toISOString();

    return fetch(baseUrl + 'ccForm', {
        method: "POST",
        body: JSON.stringify(newCC),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(insertToCCForm(response)))
        .catch(error => {
            console.dir('CC error:', error.message);
            alert('Your CC could not be posted ' + error.message);
        });
};


export const insertToCCForm = cc => ({
    type: ActionTypes.INSERT_CC_ROW,
    payload: cc
});

export const fetchCCData = () => dispatch => {

    return fetch(baseUrl + 'ccForm')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(data => dispatch(getccFormData(data)))
        .catch(error => dispatch(foqaDataFailed(error.message)));
};

export const getccFormData = ccData => ({
    type: ActionTypes.CC_DATA,
    payload: ccData
});

export const getccFormDataFailed = errMess => ({
    type: ActionTypes.CC_FAILED,
    payload: errMess
});


export const postCC = feedback => () => {
    return fetch(baseUrl + 'ccForm', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => insertToCCForm(response))
        .then(response => {
            console.log('Feedback:', response);
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => {
            console.log('Feedback:', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};

//////// EMS LOGIN
export const emsLogin = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
//dispatch(requestEmsLogin(creds))

    return fetch(emsLoginUrl + '/token', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'ems-api-sdk R v0.2'
        },
        body: qs.stringify({
           'username': creds.username,
           'password': creds.password,
           'grant_type': 'password' 
           })
    }) 
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => { 
        localStorage.setItem('access_token', response.access_token);
        dispatch(receiveEmsLogin(response.access_token));
    })
    .catch(error => {
        dispatch(loginEmsError(error.message));
        //localStorage.removeItem('access_token');
    })
};

export const requestEmsLogin = creds => {
    return {
        type: ActionTypes.EMS_LOGIN_REQUEST,
        creds
    }
}

export const receiveEmsLogin = response => {
    return {
        type: ActionTypes.EMS_LOGIN_SUCCESS,
        payload: response
    }
}

export const loginEmsError = errMess => {
    return {
        type: ActionTypes.EMS_LOGIN_FAILURE,
        payload: errMess
    }
}

//////// USER LOGIN
export const loginUser = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    //dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('token_type', response.token_type);
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                //dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            } else {
                const error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

//////// USER LOGOUT

// Logs the user out
export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(logoutFailed('Error 401: Unauthorized'));
    dispatch(receiveLogout())
}

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutFailed = errMess => ({
    type: ActionTypes.LOGOUT_FAILURE,
    payload: errMess
});

///////////////////////////////////////////////////////////
//GET EMS Data
//////////////////////////////////////////////////////////
export const fetchDBGroups = groupid => dispatch => {
    //const url = 'https://asa-api.us.efoqa.com/api/v2/ems-systems/1/database-groups?groupId=[-hub-][entity-type-group][[ems-apm][event-type-tree-folder][events:folder-96c2038e9b9543a6a406b66f589e302f]]';

    let groupId = '';

        if (groupid == 'Airbus') {
            localStorage.setItem('selectedFleet', groupid);
            groupId = airbusProfileUrls;
        }
        else if (groupid == 'Boeing') {
            localStorage.setItem('selectedFleet', groupid);
            groupId = boeingProfileUrls;
        }
        else if (groupid == 'P0') {
            localStorage.setItem('selectedFleet', groupid);
            groupId = p0ProfileUrls;
        }        
        else {
            localStorage.setItem('selectedProfile', groupid); 
            groupId = groupid;
        }


    return fetch(emsdbGroups + groupId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(getEMSDataSuccess(response));
        })
        .catch(error => dispatch(getEMSDataFailed(error.message)));
};

export const getEMSDataSuccess = response => ({
    type: ActionTypes.EMS_GET_SUCCESS,
    payload: response
});

export const getEMSDataFailed = errMess => ({
    type: ActionTypes.EMS_GET_FAILURE,
    payload: errMess
});

export const fetchAirports = () => dispatch => {
    //const url = 'https://asa-api.us.efoqa.com/api/v2/ems-systems/1/database-groups?groupId=[-hub-][entity-type-group][[ems-apm][event-type-tree-folder][events:folder-96c2038e9b9543a6a406b66f589e302f]]';

    return fetch(lacodes, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(getAirportsSuccess(response));
        })
        .catch(error => dispatch(getAirportsFail(error.message)));
};

export const getAirportsSuccess = response => ({
    type: ActionTypes.EMS_AIRPORTS_SUCCESS,
    payload: response
});

export const getAirportsFail = errMess => ({
    type: ActionTypes.EMS_AIRPORTS_FAILURE,
    payload: errMess
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//NUCAMPSITE CODE
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchCampsites = () => dispatch => {

    //dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {

    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => {
            console.log('Feedback:', response);
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => {
            console.log('Feedback:', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};