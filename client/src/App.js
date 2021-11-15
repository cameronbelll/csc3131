//App that is imported by the index.js file
import React, {useState, useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid, Toolbar} from '@material-ui/core';
import {useDispatch} from 'react-redux'; //allows us to dispatch an action
import {getPosts} from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import logo from './images/logo.png';
import makeStyles from './style';

const App = () => {
    const classes = makeStyles();
    const dispatch = useDispatch(); //this is a hook
    const [currentId, setCurrentId] = useState(null); //set to null initially if ID is not selected

    useEffect(() => {
        dispatch(getPosts()); //when action is dispatched from here, goes to posts reducer which handles logic of fetching all posts
    }, [currentId, dispatch]); //this is a successful dispatch
    
    return (
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} positon="sticky" style={{background: "#BA0F0F"}}>
                <Typography className={classes.heading} variant="h2" align="center" style={{color:"#000000"}}>TotalTix</Typography>
                <img className={classes.image} src={logo} alt="memories" height="80" />
            </AppBar>
            
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
        </Container>
    );
}

export default App;