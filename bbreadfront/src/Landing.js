import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'
import LoginFunc from './LoginFunc'
import SignUpFunc from './SignUpFunc'
import ProfileFunc from './ProfileFunc'
import Button from 'react-bootstrap/Button';


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
            <Route path="/login">
              <Login />
              <LoginFunc />
            </Route>
            <Route path="/signup">
              <SignUp />
              <SignUpFunc />
            </Route>
            <Route path="/profile">
              <Profile />
              <ProfileFunc />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function Home() {
    return(
      <div>
        <h3>Shop, Share, Enjoy!</h3>
        <p>Join the <p2>BreakBread</p2> community to revolutionize</p>
        <p>your grocery shopping and sharing experience.</p>
      </div>
    )

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
