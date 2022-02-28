import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'
  import ProfileFunc from './ProfileFunc'
function LoginForm(props) {
  const [person, setPerson] = useState({
    username: "",
    password: "",
    transformResponse: [
      data => {
        return data;
      }
    ]
  });
  const [show, setShow] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  /*const message = this.state.displayErrorMessage ? null : <div> nice</div>; */
  //cant get to sending things into creating the profile page
  /* commenting this here since i cant in side html
  <Route exact path = "/home">{redirect ? <Redirect (
      <Router>
      <Route exact path = "/profile"> 
                  <Profile/> <ProfileFunc/>
      </Route>
      </Router>
    ):  null}</Route> */
    //this was the redirect
  async function submitForm() {
    let loggedIn = await props.handleSubmit(person);
    console.log(loggedIn);
    if (loggedIn) {
      setShow(false);
      setRedirect(true);

    } else {
      setShow(true);
    }
    setPerson({ username: "", password: "" }); /*  id: ''  this was added */
  }

  function handleChange(event) {
    const { name, value } = event.target; /* added id*/
    if (name === "password")
      setPerson({ username: person["username"], password: value });
    else setPerson({ username: value, password: person["password"] });
  }

  return (
    
    <form>
      <div className="form">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="username"
          value={person.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={person.password}
          onChange={handleChange}
        />
      </div>

      <input type="button" value="Login" onClick={submitForm} />
    
     
       </form>


       
      

  );
  function Profile(){
    return <h2>Profile</h2>
  }
}


export default LoginForm;
