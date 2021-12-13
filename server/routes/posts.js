//contains everything to do with posts: where something is added to, deleted from the website etc
import express from 'express';
import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js' //functions imported from controllers/posts.js file
import auth from '../middleware/auth.js'; //added to the routes below if you would need to be logged in to perform an action

const router = express.Router();

router.get('/', getPosts); 
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost); //this route runs createPost function which is imported from controllers above
router.patch('/:id', auth, updatePost); //used for updating existing documents
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); //patch used here as liking a post is also an update

export default router;