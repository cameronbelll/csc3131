//a reducer is a function that accepts the state and action
//return value based on the action type

export default (posts = [], action) => { //state is always posts as this is a posts reducer
    switch (action.type) { //switch case used as many different possible types
        case 'FETCH_ALL':  //state always must equal something so state above defined as empty array initially
            return action.payload; //payload is our actual posts
        case 'CREATE':
            return [...posts, action.payload]; //first must spread posts then add a new post, stored in action.payload, in this return statement
        case 'UPDATE':
        case 'LIKE': //identical to update function so just reuse code to save space
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); 
            //maps post as an array but returns action.payload (the updated post) if the post ID is equal to the payload's ID
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload); //return all posts, but filter out the deleted one
        default:
            return posts;



    }
}