import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({half, name, handleChange, label, autoFocus, type, handleShowPassword}) => { //want some inputs to take half of the width so use the half prop below
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null} //icon shown on right hand side of input; gives option to show password
            />
        </Grid>
    )
}

export default Input;
