//create all handlers for our routes here
//don't want logic in the posts.js file in routes as the routes file will become long and complicated
//so execute functions here and see all routes in other file

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => //function is async as the below .find() method takes time
    { //callback function to be executed whenever someone visits localhost:5000/
        try {
            const postMessages = await PostMessage.find(); //need await as finding something in a model is asynch so must make function so
            console.log(postMessages);
            res.status(200).json(postMessages); //returning status 200 means everything worked
        } catch (error) {
            res.status(404).json({message: error.message}); //returning status 404 means an error has been found
        }
    }; //needs to be exported so it can be used in posts.js in routes

export const createPost = async (req, res) =>
    {
        const post = req.body;
        const newPost = new PostMessage(post); //create a new object of type PostMessage and pass it the post being requested

        try {
            await newPost.save();
            res.status(201).json(newPost); //201 means creation successful
        } catch (error) {
            res.status(409).json({message: error.message}); //409 means creation unsuccessful
        }
    }

export const updatePost = async (req, res) =>
{
    const {id: _id} = req.params; //rename id to _id as this is the mongoose object ID
    const post = req.body;  //updated post passed from front end

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this ID.');

    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true}); //passes all params of post and adds ID

    res.json(updatedPost); //sends updated post
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this ID.');
    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted.'})
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this ID.');

    const post = await PostMessage.findById(id); //finds post by ID and commits to variable
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);
}