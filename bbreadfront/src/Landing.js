import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'
import LoginFunc from './LoginFunc'
import SignUpFunc from './SignUpFunc'
import ProfileFunc from './ProfileFunc'
import Button from 'react-bootstrap/Button';

// this was testing for sending things to the profile page.
// passed in a user in order to do testing with passing things to a table
  export default function Landing() {
    return (
      <Router>
        <div>
        <div class = "topnav">
            <a><Link to="/">Home</Link></a>
            <a><Link to="/login">Login</Link></a>
            <a><Link to="/signup">SignUp</Link></a>
            <a><Link to="/profile">Profile</Link></a>
            <h1>BreakBread</h1>
          </div>
          <Switch>
            <Route exact path="/login">
              <Login />
              <LoginFunc />
            </Route>
            <Route exact path="/signup">
              <SignUp />
              <SignUpFunc />
            </Route>
            <Route exact path="/profile">
              <Profile   name="1" password="123456"/>
              <ProfileFunc  />
            </Route>            
            <Route exact path="/">
              <Home />
            </Route>
            
                 
          </Switch>
        </div>
      </Router>
    );
  }
  
  function Home() {
    return <h2>Home</h2>;
    
  }
  
  function Login() {
    return <h2>Login</h2>;
  }
  
  function SignUp() {
    return <h2>SignUp</h2>;
  }

  function Profile(){
    return <h2>Profile</h2>
  }
