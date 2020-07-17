import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from "../../redux/messages"
import { Kweet } from "."
import Container from "@material-ui/core/Container";
import Spinner from "react-spinkit";
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

export default function Feed(props){
    const dispatch = useDispatch()
    const [username] = React.useState(props.feedType)
    const [limit] = React.useState(100);
    const [offset] = React.useState(0);
    const classes = useStyles();
    let data
 
    if(username){
        data = {
            'limit': limit,
            'offset': offset,
            'username': username
        }
    }
    else {
        data = {
            'limit': limit,
            'offset': offset,
        }
    }
    useEffect(() => {
        dispatch(getMessages(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { result, loading, error } = useSelector(state => state.getMessagesRedux)
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography variant='h3'>
                            {props.feedType === "all" ? "All Kweets" : "@" + props.feedType +"'s Kweets"}
                        </Typography>
                {result && result.messages.map(message => {
                    return <Kweet message={message} key={"KF" + message.id}></Kweet>
                })}
                {loading && <Spinner name="circle" color="blue" />}
                {error && <p style={{ color: "red" }}>{error.message}</p>} 
                </div>
                </Container>
            </div>
        )
        
}