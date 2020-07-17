import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../../redux/';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Greeting(){
  const classes = useStyles();
  const loggedIn = useSelector(state => state.loginUser.result)
  const dispatch = useDispatch()
    return(
      <Container component="main" maxWidth="xs">
        <div className={`greeting ${classes.paper}`}>
            {loggedIn ? (
                <div>
                  <Button 
                      color="primary"
                      className={classes.submit}
                      component={Link} 
                      to={`/`}
                  >
                      Home 
                  </Button>
                  <Button 
                      color="primary"
                      className={classes.submit}
                      component={Link} 
                      to={`/users/${loggedIn.username}`}
                  >
                      Hello, {loggedIn.username}! 
                  </Button>
                  <Button 
                      to="/"
                      color="primary"
                      className={classes.submit}
                      onClick={()=>dispatch(logout())}
                  >
                      Log out
                  </Button>
                </div>
                ) : (
                  <div>
                  <Button 
                      color="primary"
                      className={classes.submit}
                      component={Link} 
                      to={`/`}
                  >
                      Home 
                  </Button>
                  <Button 
                      color="primary"
                      className={classes.submit}
                      component={Link} 
                      to={`/login`}
                  >
                      Log in 
                  </Button>
                </div>
              )}
        </div>
      </Container>
    )
}