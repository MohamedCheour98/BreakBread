import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'
import MyApp from './MyApp'

  export default function Landing() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/login">
              <Login />
              <MyApp />
            </Route>
            <Route path="/signup">
              <SignUp />
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
    return <h2>Home</h2>;
    
  }
  
  function Login() {
    return <h2>Login</h2>;
  }
  
  function SignUp() {
    return <h2>SignUp</h2>;
  }
