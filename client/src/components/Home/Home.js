import React, {useState, useEffect} from 'react';
import {Container, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux'; //allows us to dispatch an action
import {getPosts} from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    //const classes = makeStyles();
    const dispatch = useDispatch(); //this is a hook
    const [currentId, setCurrentId] = useState(null); //set to null initially if ID is not selected

    useEffect(() => {
        dispatch(getPosts()); //when action is dispatched from here, goes to posts reducer which handles logic of fetching all posts
    }, [currentId, dispatch]); //this is a successful dispatch

    return (
        <div>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>                        
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/> 
                        </Grid>
                        <Grid item xs={12} sm={4}> 
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;
