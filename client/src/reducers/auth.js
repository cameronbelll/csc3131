//reducer for authentication
import { PROFILE, AUTH, LOGOUT } from '../constants/actionTypes';


const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem(PROFILE, JSON.stringify({...action?.data})); //retrieves data from the profile and converts to string
            return {...state, authData: action.data}; //returns authentication data
        
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};


        default:
            return state;

    }
}

export default authReducer;