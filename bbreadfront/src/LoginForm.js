import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
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
  const [userData, setUserData] = useState({});

  /*const message = this.state.displayErrorMessage ? null : <div> nice</div>; */
  // strange array prototype, making us use loggedIn[0], Joseph?
  async function submitForm() {
    
    let loggedIn = await props.handleSubmit(person);
    
    if (Object.keys(loggedIn).length != 0) {
      setShow(false);
      setUserData(loggedIn[0])
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
              <input type="button" value="Login" onClick={submitForm} />

{show ? (
  <div id="ip">
    <h5 style={{ color: "red" }}>Invalid Login</h5>
  </div>
) : null}
      </div>



{redirect  ? (<div>
        <Redirect to={{pathname: "/profile", state: {user: userData}}}  />
      </div> 
      ): null} 
    </form>
  );
}

export default LoginForm;
