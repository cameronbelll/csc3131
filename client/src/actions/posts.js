import * as api from '../api';
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE,  } from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => { //working with asynchronous data so syntax is funky using redux-thunk
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });       
    } catch(error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => { 
    try {
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        
        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data }); 
    } catch(error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post); //making a post API request to server and sending post as a param
        
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post); //collects updated post in a variable

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); //don't have to send this to a variable as above as not interested in returning data, just deleting

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id); //very similar to updatePost as it is essentially an update function

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}
