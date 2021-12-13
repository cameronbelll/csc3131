import React, {useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from './style';
import { createPost, updatePost } from '../../actions/posts';
import { PROFILE } from '../../constants/actionTypes';

//get current ID of post

const Form = ({currentId, setCurrentId}) => //creates the form for adding new tickets to the site
{
    const classes = makeStyles(); //comes from the style.js file in Form folder
    //below is a find method which checks if post's ID exists and if it does it returns the contents of the post
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); 
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''})
    const dispatch = useDispatch(); //allows us to dispatch actions - used in handleSubmit below
    const user = JSON.parse(localStorage.getItem(PROFILE)); //gets user from local storage

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]); //contains callback function and dependency array
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (currentId) {  //if currentId is not null, not going to create post but instead update
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name})); //uses updatePost method alongside currentId to update post
        }
        else {
            dispatch(createPost({...postData, name: user?.result?.name}));  
        }
        clear();

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: ''}); //sets all params to empty string
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h5" align="center">
                    Please sign in to create a ticket post or to purchase your own tickets
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit tickets' : 'Add tickets'}</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title:e.target.value})}></TextField> 
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={3} value={postData.message} onChange={(e) => setPostData({ ...postData, message:e.target.value})}></TextField> 
            <TextField name="tags" variant="outlined" label="Tags (separate with a comma)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags:e.target.value.split(',')})}></TextField> 
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