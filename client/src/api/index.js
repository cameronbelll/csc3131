import axios from 'axios'; //used to make API calls
import { PROFILE } from '../constants/actionTypes';

const API = axios.create({baseURL: 'http://localhost:5000'}); //base URL pointing to backend

API.interceptors.request.use((req) => { //needed to send token back to backend so middleware can verify user is logged in
    if (localStorage.getItem(PROFILE)) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(PROFILE)).token}`; //gets the token from the profile in local storage
    }
    return req;
});


export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); //queries database for certain post via name or tags
export const createPost = (newPost) => API.post('/posts', newPost); //callback function which sends new post to database
export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost); //uses URL and currentId as need to know which post to update 
export const deletePost = (id) => API.delete(`posts/${id}`); //pass in URL and ID so it knows which post to delete and where from
export const likePost = (id) => API.patch(`posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signIn', formData); //API calls for sign in and sign up
export const signUp = (formData) => API.post('/user/signUp', formData);