import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Spinner from "react-spinkit";
import Typography from "@material-ui/core/Typography";

import { Greeting } from '.'
import { getUser } from '../../redux/';


const useStyles = makeStyles((theme)=>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

export default function SimpleCard(props) {
  const username = useLocation().pathname.slice(7);
  const loggedInUser = useSelector(state => state.loginUser.result)
  const classes = useStyles();
  const dispatch = useDispatch()

  const profileBelongsToLoggedInUser = () => {
    if(loggedInUser){
      return (loggedInUser.username === username )
    }
    return false
  }

  useEffect(() => {
    dispatch(getUser(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {result, loading, error } = useSelector(state => state.getUserRedux)

  return (
    <Container component="main" maxWidth="xs">
      <Greeting />
      <div className={classes.paper}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              @{username}
            </Typography>
            {result && (
              <div>
                <Typography style={{display: 'flex'}} variant="h5" component="h2">
                  <span style={{display: 'flex', alignItems:'center'}} >
                    <Avatar alt={result.user.displayName} src={`https://cjkkwitter.herokuapp.com${result.user.pictureLocation.slice(0,19)}`} className={classes.large} /> {result.user.displayName}</span>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  User created: {new Date(result.user.createdAt).toDateString()}
                  <br />
                  User last updated: {new Date(result.user.updatedAt).toDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                  About: {result.user.about}
                </Typography>
              </div>
            )}
            {loading && <Spinner name="circle" color="blue" />}
            {error && <p style={{ color: "red" }}>{error.message}</p>} 
            
          </CardContent>
          <CardActions>
            {profileBelongsToLoggedInUser() &&(
              <div classname="update-buttons">
                <Button component={Link} to="/update-user" size="small">
                  Update User
                </Button> 
                <Button component={Link} to="/update-user-pic" size="small">
                  Update User Picture
                </Button> 
              </div>
           )}
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}
