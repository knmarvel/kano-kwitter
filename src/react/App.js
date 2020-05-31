import React from 'react';

import { connect } from 'react-redux';
import SignIn from "./components/SignIn"
import { activateGeod, closeGeod, login, logout } from '../redux/';

// App.js
class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.authenticate.user}
          {this.props.authenticate.user ? (
             <button onClick={this.props.logout}>Log out</button>
             ) : (
               <button
                 onClick={() =>
                   this.props.login({ user: 'Kano' })
                 }
               >
                 Click Me!
               </button>
          )}
        </div>
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
      <SignIn />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  geod: state.geod,
  authenticate: state.authenticate,
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
  login,
  logout
};

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
