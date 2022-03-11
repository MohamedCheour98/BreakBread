import React from 'react'
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'
import LoginFunc from './LoginFunc'
import SignUpFunc from './SignUpFunc'
import ProfileFunc from './ProfileFunc'
import GroceryFunc from './GroceryRun'

  export default function Landing() {
    return (
      <Router>
        <div>
        <div class = "topnav">
            <a><Link to="/">Home</Link></a>
            <a><Link to="/login">Login</Link></a>
            <a><Link to="/signup">SignUp</Link></a>
            <a><Link to ="/">Logout</Link></a>
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
              <Profile />
              <ProfileFunc />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path = "/grocery">
              <Grocery />
              <GroceryFunc/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function Home() {
    return(
      <div class = "home">
        <h3>Shop, Share, Enjoy!</h3>
        <p>Join the <p2>BreakBread</p2> community to revolutionize
        your grocery shopping and sharing experience.</p>
        <img id = "logo" src={require("./images/BreakBread@2x.png")} width = "162" height = "133.5" alt = "BreakBread Logo"/>
      </div>
    )
  }
  
  function Login() {
    return (
    <h2>Login</h2>
    )
  }
  
  function SignUp() {
    return <h2>SignUp</h2>;
  }

  function Profile(){
    return <h2>Profile</h2>
  }

  function Grocery(){
    return <h2>New Grocery Run</h2>
  }
