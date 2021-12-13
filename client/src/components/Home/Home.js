import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'; //allows us to dispatch an action
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery() { //for searching posts
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    //const classes = makeStyles();
    const dispatch = useDispatch(); //this is a hook
    const [currentId, setCurrentId] = useState(null); //set to null initially if ID is not selected
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1; //finds out what page the post is on
    const searchQuery = query.get('searchQuery'); //gets the term being searched for
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]); //empty array for multiple tags

    /*useEffect(() => {
        dispatch(getPosts()); //when action is dispatched from here, goes to posts reducer which handles logic of fetching all posts
    }, [currentId, dispatch]); //this is a successful dispatch */

    const searchTickets = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') })) //search is passed as a string but have to render tags array to a string to make dispatch easier
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/'); //redirects as has searched for nothing
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) { //keycode for enter
            searchTickets();
        } 
    }

    const handleAddTag = (tag) => setTags([...tags, tag]) //state array must first spread tags then add new tag

    const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={2} className={classes.container}>                        
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/> 
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className={classes.toolbar} />
                        <div className={classes.toolbar} />
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search"
                            variant="outlined"
                            label="Search Tickets"
                            fullwidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                            onKeyDown={handleKeyPress} />

                            <ChipInput 
                                style={{ margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAddTag} 
                                onDelete={handleDeleteTag}
                                label="Search Tags (Enter to add tag)"
                                variant="outlined"
                            />

                            <Button onClick={searchTickets} className={classes.searchButton} color="primary" variant="contained">Search available tickets</Button>
                        </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;
