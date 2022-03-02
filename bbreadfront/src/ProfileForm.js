import React, { useState } from "react";
import { Container } from "react-bootstrap";


function ProfileForm(props) {
  
  console.log("we in here?");
  console.log(props);
  const [person, setPerson] = useState({
    name: "",
    password: ""
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
      <label htmlFor="inventory">Inventory</label>
    
      </div>
    </container>
  );
}

export default ProfileForm;
