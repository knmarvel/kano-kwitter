import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Spinner from "react-spinkit";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function LogIn(props) {
    const classes = useStyles();
    const history = useHistory()
    const {result, loading, error } = useSelector(state => state.loginUser)
    if(result){
        if(result.statusCode === 200){
            history.goBack()
        }
    }
    return (
        <div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <form 
                    className={classes.form} 
                    noValidate
                    onSubmit={props.handleSubmitLogin}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="loginUsername"
                        autoFocus
                        onChange={props.handleChange}
                        value={props.loginUsername || ""}
                        autoComplete="off"
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="loginPassword"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={props.handleChange}
                        value={props.loginPassword || ""}
                        autoComplete="off"
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    {loading && <Spinner name="circle" color="blue" />}
                    {error && <p style={{ color: "red" }}>{error.message}</p>} 
                </form>
                <Button 
                    href="/signup"
                    color="primary"
                    className={classes.submit}
                >
                    Don't have an account? Sign up here.
                </Button>
                
            </div>
        </Container>
        
        </div>
        )
  }

export default LogIn