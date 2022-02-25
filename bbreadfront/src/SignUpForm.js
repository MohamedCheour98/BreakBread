import React, { useState } from "react";
import { Redirect } from "react-router";
function SignUpForm(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });
  const [show, setShow] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  async function submitForm() {
    let signedIn = await props.handleSubmit(person);


    if (signedIn) {
      setShow(false);
      setRedirect(true);
    } else {
      setShow(true);
    }
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
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

      <input type="button" value="SignUp" onClick={submitForm} />
      {show ? (
        <div id="ip">
          <h2 style={{ color: "red" }}>Invalid Login</h2>
        </div>
      ) : null}

      {redirect ? <Redirect to="/home" /> : null}
    </form>
  );
}

export default SignUpForm;
