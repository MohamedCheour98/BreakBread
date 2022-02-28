import React, { useState } from "react";
import { Container } from "react-bootstrap";


function ProfileForm(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }

  function handleChange(event) {
    const { name, value } = event.target; /* added id*/
    if (name === "password") setPerson({ username: person["username"], password: value });
    else setPerson({ username: value, password: person["password"] });
  }

  return (
    <container>
      <div className = "friends">
        <label htmlFor="friends">Friends</label>
          {/* <input
          type="text"
          name="friends"
          value={person.friends}
          onChange={handleChange}
          /> */}
        </div>
      <div className = "inventory">
      <label htmlFor="inventory">Inventory</label>
    
      </div>
    </container>
  );
}

export default ProfileForm;
