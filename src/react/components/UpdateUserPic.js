import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Spinner from "react-spinkit";
import UpdateIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Greeting } from '.'
import { putUserPic } from "../../redux"


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

export default function UpdateUserPic() {
    const [userPic, setUserPic] = useState('');
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loginUser.result)

    
    const handleUserPicChange = (event) => {
        setUserPic(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event.target)
      dispatch(putUserPic(event.target))
    }

  const classes = useStyles();
  const { result, loading, error } = useSelector(state => state.putUserPicRedux)

//   const []
  if (result){
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Grid container justify="flex-end">
            <Grid item>
              <Link to={`/users/${loggedInUser.username}`} variant="body2">
                User picture updated successfully! Click here to go back to your profile. 
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    )}
  else if(loggedInUser){
    return (
      <Container component="main" maxWidth="xs">
      
        <CssBaseline />
        <Greeting />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <UpdateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update user picture
          </Typography>
          <form 
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate>
                        <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  variant="outlined"
                  required
                  fullWidth
                  name="picture"
                  label="Picture"
                  type="file"
                  id="Picture"
                  autoFocus
                  value={userPic}
                  onChange={handleUserPicChange}              
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
              Update User Picture
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
  else {
    return(
      <Redirect to="/login"/>
    )
  }
}