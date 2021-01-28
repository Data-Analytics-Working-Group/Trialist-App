// src/components/App.js

import React, {
  Component,
  Fragment
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AppProvider, {
  Consumer
} from './components/AppProvider';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

import Navbar from './components/Navbar';
import FlashMessage from './components/FlashMessage';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Fragment>
            <Navbar />
            <FlashMessage />
            <Route exact path="/" component={() => 
              <h1 className="content">Welcome, Home!</h1>} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />
            <Router exact path="/dashboard" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <Dashboard /> :
                  <div className="content">
                    <h1>Access denied.</h1>
                    <p>You are not authorized to access this page.</p>
                  </div>
              }
            </Consumer>} />
            <Route exact path="/signedOut" component={() => 
              <h1 className="content">You're now signed out.</h1>} />
            <Route exact path="/accountCreated" component={() => 
              <h1 className="content">Account created. <Link to="/login">
              Proceed to Dashboard</Link></h1>} />
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;