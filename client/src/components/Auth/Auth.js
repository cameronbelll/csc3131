import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import {AUTH} from '../../constants/actionTypes';
import {signIn, signUp} from '../../actions/auth';

const initialState = {firstName: '', surname: '', email: '', password: '', confirmPassword: ''}; //sets all variables to be empty initially

const Auth = () => {
    const classes = useStyles();
    const [isSignedUp, setIsSignedUp] = useState(false); //state field which is used to flip the state of a boolean variable
    const [showPassword, setShowPassword] = useState(false); // password initially hidden
    const [formData, setFormData] = useState();
    const dispatch = useDispatch(); //hooks must be declared like this
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the browser from refreshing

        if(isSignedUp) {
            dispatch(signUp(formData, navigate)); //pass navigate so can move when something changes
        }
        else {
            dispatch(signIn(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value}); //sets the values in the text fields to the variables
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword ); 
    //toggles whether password is shown by flipping from true to false

    const switchMode = () => {
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
        setShowPassword(false); //must ensure password stays hidden
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //?. is an optional chaining operator which doesn't throw an error if there is no access to res
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, data: {result, token}});
            navigate('/'); //redirects to homepage from login

        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Sign in with Google failed. Please try again");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}> 
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignedUp ? 'Sign Up' : 'Sign In'}</Typography> 
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { //code for if current user is signed up; this is the for the sign up form
                            isSignedUp && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="surname" label="Surname" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignedUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignedUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="876827324406-splqumjo44spkffb72g7aej7olj8drrl.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}  variant="contained">
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignedUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>

                    </Grid>

                </form>

            </Paper>

        </Container>
    )
};

export default Auth;
