//posts class, for displaying all posts from the database
import React from 'react';
import { useSelector } from 'react-redux'; //selectors used to retrieve data from global redux store
import {Toolbar, Grid, CircularProgress} from '@material-ui/core';
import Post from './Post/Post';
import makeStyles from './style';


const Posts = ({setCurrentId}) => //creates the form for adding new tickets to the site
{
    const classes = makeStyles(); //with this all classes are imported, now can just do className={classes.something}
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    //
    return (
        !posts.length ? <CircularProgress /> : ( //if all posts are not loaded present a loading wheel, else run code below
            <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                {posts.map((post) => (
                    <Grid key={post.i_id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid> //this code loops through all posts in the database and displays them in a grid
        )
    )
}

export default Posts;