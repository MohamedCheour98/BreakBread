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

  /*const message = this.state.displayErrorMessage ? null : <div> nice</div>; */

  async function submitForm() {
    let loggedIn = await props.handleSubmit(person);
    console.log("heress");
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
          type="text"
          name="password"
          value={person.password}
          onChange={handleChange}
        />
      </div>

      <input type="button" value="Login" onClick={submitForm} />

      {show ? (
        <div id="ip">
          <h2 style={{ color: "red" }}>Invalid Login</h2>
        </div>
      ) : null}

      {redirect ? <Redirect to="/profile" /> : null}
    </form>
  );
}

export default LoginForm;
