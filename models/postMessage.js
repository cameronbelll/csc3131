//in here we will utilise mongoose
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
{ //mongoose allows uniformity in documents; 
    //here we create a schema which specifies what all posts must have and the data types
    title: String,
    message: String,
    name: String,
    creatorId: String,
    tags: [String],
    selectedFile: String,
    likes: { //array of users who have liked the post
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage; //exporting a mongoose model from this file which is worked on later
