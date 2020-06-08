import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import { LogIn, SignUp } from './components'
import { connect } from 'react-redux';
import { activateGeod, closeGeod, createUser, login, logout } from '../redux/';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
  }

  handleChange = (event) =>{
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmitLogin = (event) =>{
    event.preventDefault()
    this.props.login({
      username: this.state.loginUsername,
      password: this.state.loginPassword})
  }

  handleSubmitNewUser = (event) => {
    event.preventDefault()
    let data = {
      'username': this.state.signUpUsername,
      'displayName': this.state.signUpDisplayName,
      'password': this.state.signUpUsername,
    }
    this.props.createUser(data)
  }

  render() {
    return (
      <Router>
        <Route path="/">
          <div className="greeting">
            {this.props.loginUser ? (
                <div>
                  Hello, {this.props.loginUser.username}
                <button onClick={this.props.logout}>Log out</button>
                </div>
                ) : (
                  <div>
                    You are currently logged out. <Link to="/login">Log in?</Link>
                  </div>
              )}
          </div>
        </Route>
        <Route path='/login' >
            <LogIn 
              handleChange={this.handleChange}
              handleSubmitLogin={this.handleSubmitLogin}
              loginUsername={this.state.loginUsername}
              loginPassword={this.state.loginPassword}
            />
        </Route>
        <Route path="/signup">
          <SignUp 
            handleChange={this.handleChange}
            handleSubmitNewUser={this.handleSubmitNewUser}
            username={this.state.signUpUsername}
            displayName={this.state.signUpDisplayName}
            password={this.state.signUpPassword}
          />
        </Route>
        <div>
          <h1>{this.props.geod.title || 'Hello World!'}</h1>

          {this.props.geod.title ? (
            <button onClick={this.props.closeGeod}>Exit Geod</button>
          ) : (
            <button
              onClick={() =>
                this.props.activateGeod({ title: 'I am a geo dude!' })
              }
            >
              Click Me!
            </button>
          )}
        </div>

      </Router>
    );
  }
}

const mapStateToProps = state => ({
  geod: state.geod,
  loginUser: state.loginUser.result,
  createdUser: state.createUserRedux
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
  createUser,
  login,
  logout
};

export default (App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
