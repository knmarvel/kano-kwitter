import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Spinner from "react-spinkit";
import UpdateIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Greeting } from '.'
import { patchUser } from "../../redux"


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateUser() {
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [about, setAbout] = useState('');
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loginUser.result)

    
    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value)
    }
    const handleAboutChange = (event) => {
        setAbout(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const patchUserData = {
        'password': password, 
        'about': about, 
        'displayName': displayName}
      console.log(patchUserData)
      dispatch(patchUser(patchUserData))
    }

  const classes = useStyles();
  const { result, loading, error } = useSelector(state => state.patchUserRedux)

//   const []
  if (result){
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Grid container justify="flex-end">
            <Grid item>
              <Link href={`/users/${loggedInUser.username}`} variant="body2">
                User updated successfully! Click here to go back to your profile. 
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    )}
  return (
    <Container component="main" maxWidth="xs">
    
      <CssBaseline />
      <Greeting />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UpdateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update user information
        </Typography>
        <form 
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate>
                      <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autofocus
                value={password}
                onChange={handlePasswordChange}              
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="about"
                variant="outlined"
                required
                fullWidth
                id="about"
                label="About"
                value={about}
                onChange={handleAboutChange}   
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                value={displayName}
                onChange={handleDisplayNameChange}   
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update User Information
          </Button>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          <Grid container justify="flex-end">
            <Grid item>
              {loggedInUser && 
              (<Link to={`/users/${loggedInUser.username}`} variant="body2">
                Go back to profile without making changes
              </Link>)
              }
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}