//contains everything to do with posts: where something is added to the website
import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js' //functions imported from controllers/posts.js file

const router = express.Router();
router.get('/', getPosts); 
router.post('/', createPost); //this route runs createPost function which is imported from controllers above
router.patch('/:id', updatePost); //used for updating existing documents
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost); //patch used here as liking a post is also an update

export default router;