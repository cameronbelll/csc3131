//create all handlers for our routes here
//don't want logic in the posts.js file in routes as the routes file will become long and complicated
//so execute functions here and see all routes in other file

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => //function is async as the below .find() method takes time
    { //callback function to be executed whenever someone visits localhost:5000/
        const { page } = req.query;
        try {
            const LIMIT = 6; //number of posts per page
            const startIndex = (Number(page) - 1) * LIMIT; //always gets start index of first post on any page
            const totalPosts = await PostMessage.countDocuments({});
            console.log(startIndex);
            const postMessages = await PostMessage.find().sort({ id: -1 }).skip(startIndex).limit(LIMIT); //need await as finding something in a model is asynch so must make function so
            console.log(postMessages);
            res.status(200).json({ data: postMessages, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts/LIMIT) }); //returning status 200 means everything worked
        } catch (error) {
            res.status(404).json({message: error.message}); //returning status 404 means an error has been found
        }
    }; //needs to be exported so it can be used in posts.js in routes

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    
    try {
        const title = new RegExp(searchQuery, 'i'); //convert title of post into regular expression as easier for querying
        //find all posts which match either title search or match at least one tag from tag array
        const posts = await PostMessage.find({ $or: [ {title}, {tags: { $in: tags.split(',') } } ]}); //or means either find title or tags
        
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createPost = async (req, res) =>
    {
        const post = req.body;
        //creates new post along with creator's ID and date of creation
        const newPost = new PostMessage({...post, creatorId: req.userId, createdAt: new Date().toISOString()}); 

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
    
    if(!req.userId) return res.json({message: 'You are not authorised to complete this action.'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this ID.');

    const post = await PostMessage.findById(id); //finds post by ID and commits to variable
    const index = post.likes.findIndex((id) => id === String(req.userId)); //this checks if the user has already liked the post
    if (index === -1) { //if the user has not liked the post then their ID will not be found
        post.likes.push(req.userId);
    }
    else { //if the current user has already liked the post...
        post.likes = post.likes.filter((id) => id != String(req.userId)); //filters out the like from the current user 
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}