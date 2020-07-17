import React from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
    const loggedInUser = useSelector(state => state.loginUser.result)
    const classes = useStyles();


  return (

    <Card className={classes.root} variant="outlined">
      <CardContent>
        
         <Typography style={{display: 'flex'}} variant="h5" component="h2">
                  <span style={{display: 'flex', alignItems:'baseline'}} >
                    <Avatar alt={props.message.username} 
                            src={`https://cjkkwitter.herokuapp.com/users/${props.message.username}/picture` && `https://cjkkwitter.herokuapp.com/users/${props.message.username}/picture`}
                            className={classes.large} /> 
                     &nbsp; <Link to={`/users/${props.message.username}`}>@{props.message.username}</Link>
                     <Typography variant="body2" component="p">
                        &nbsp; {new Date(props.message.createdAt).toDateString()}
                    </Typography>
                </span>
        </Typography>
        <Typography variant="h6" component="p">
            {props.message.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
        {loggedInUser ? loggedInUser.username === props.message.username &&
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          :
          ""
        }
      </CardActions>
    </Card>

  );
}