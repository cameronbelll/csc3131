//reducer for authentication

import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data})); //retrieves data from the profile and converts to string
            return {...state, authData: action.data}; //returns authentication data
            break;

        default:
            return state;
            break;

    }
}

export default authReducer;