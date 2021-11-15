import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper, Toolbar} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './style';
import {createPost, updatePost} from '../../actions/posts';

//get current ID of post

const Form = ({currentId, setCurrentId}) => //creates the form for adding new tickets to the site
{
    const classes = makeStyles(); //comes from the style.js file in Form folder
    //below is a find method which checks if post's ID exists and if it does it returns the contents of the post
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); 
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: ''})
    const dispatch = useDispatch(); //allows us to dispatch actions - used in handleSubmit below

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]); //contains callback function and dependency array
    const handleSubmit = (e) => { 
        e.preventDefault();
        if (currentId) {  //if currentId is not null, not going to create post but instead update
            dispatch(updatePost(currentId, postData)); //uses updatePost method alongside currentId to update post
        }
        else {
            dispatch(createPost(postData));  
        }
        clear();

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: ''}); //sets all params to empty string
    }
    return (
        <Paper className={classes.paper}>
            <div className={classes.toolbar} />
            <div className={classes.toolbar} />
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit tickets' : 'Add tickets'}</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator:e.target.value})}></TextField> 
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title:e.target.value})}></TextField> 
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message:e.target.value})}></TextField> 
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags:e.target.value.split(',')})}></TextField> 
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            
            </form>
        </Paper> //onchange contains a callback function with event as parameter, setter method for state
        //and calls all params from postData
    )
} //mem.dev at 1:03:30 in first video

export default Form;