import React, {useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import logo from '../../images/logo.jpg';
import logoText from '../../images/logoText.png';
import { PROFILE, LOGOUT } from '../../constants/actionTypes';

const Bar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(PROFILE)));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({type: LOGOUT});
        navigate('/auth');
        setUser(null);
    }

    useEffect (() => {
        const token = user?.token;

        if(token) { //if the user is logged in they will have a token; this decodes the token and check if it has expired and if it has then logs user out
            const decoded = decode(token);

            if(decoded.exp * 1000 < new Date().getTime()) logout(); //*1000 as the value is originally in ms
        }

        setUser(JSON.parse(localStorage.getItem(PROFILE))); //sets active user after a login
    }, [location]); //calling location sets user immediately after login

    return (
    <AppBar className={classes.appBar} positon="sticky" style={{background: "#BA0F0F"}}>
        <Link to="/" className={classes.brandContainer}>
            <img src={logoText} alt="logotext" height="80px"/>
            <img className={classes.image} src={logo} alt="logo" height="80px" />
        </Link>

        <Toolbar className={classes.toolbar}>
            {user ? ( //block of code for if user is logged in; shows their avatar or a letter of their name as well as username
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log out</Button>
                </div>

            ) : ( //code for if user is not logged in;
                <Button component={Link} to="/Auth" variant="contained" color="primary">Log in</Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Bar;