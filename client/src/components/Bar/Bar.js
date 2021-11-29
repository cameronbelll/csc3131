import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logo.png';

const Bar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect (() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile'))); //sets active user after a login
    });

    return (
    <AppBar className={classes.appBar} positon="static" style={{background: "#BA0F0F"}}>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center" style={{color:"#000000"}}>TotalTix</Typography>
            <img className={classes.image} src={logo} alt="Ronaldoooo" height="80" />
        </div>

        <Toolbar className={classes.toolbar}>
            {user ? ( //block of code for if user is logged in; shows their avatar or a letter of their name as well as username
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary">Log out</Button>
                </div>

            ) : ( //code for if user is not logged in;
                <Button component={Link} to="/Auth" variant="contained" color="primary">Log in</Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Bar;