//a reducer is a function that accepts the state and action
//return value based on the action type
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => { //state is always posts as this is a posts reducer
    switch (action.type) { //switch case used as many different possible types
        case FETCH_ALL:  //state always must equal something so state above defined as empty array initially
            return {
                ...state, //always spread state when working with object
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }; 
        case FETCH_BY_SEARCH:
            return { ...state,  posts: action.payload.data };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }; //first must spread posts then add a new post, stored in action.payload, in this return statement
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post ))}; 
            //maps post as an array but returns action.payload (the updated post) if the post ID is equal to the payload's ID
        case DELETE:
            return state.filter((post) => post._id !== action.payload); //return all posts, but filter out the deleted one
        default:
            return state;

    }
}