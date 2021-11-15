import axios from 'axios'; //used to make API calls

const url = 'http://localhost:5000/posts'; //URL pointing to backend route

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); //callback function which sends new post to database
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); //uses URL and currentId as need to know which post to update 
export const deletePost = (id) => axios.delete(`${url}/${id}`); //pass in URL and ID so it knows which post to delete and where from
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);