import * as api from '../api/index.js';
import {AUTH} from '../constants/actionTypes';

export const signIn = (formData, navigate) => async (dispatch) => {
    try { //will send data to the backend so that it knows the user is trying to sign in
        const {data} = await api.signIn(formData); //gets data from the form

        dispatch({type: AUTH, data}); //dispatch of type authenticate
        navigate('/');

    } catch (error) {
        console.log(error);
    }

}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, payload: data});
        navigate('/');

    } catch (error) {
        console.log(error);
    }

}