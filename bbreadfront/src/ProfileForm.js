import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";

function ProfileForm(props) {
  const [person, setPerson] = useState({
    name: "",
    password: ""
  });


  function submitForm() {
    props.handleSubmit(person);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }

  return (
    <container>
      <div className = "grocery">
      <Link to = "/grocery" className = "button"> New run </Link>    
      </div>
      
      <div className="form">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="username"
        value={person.username}
        onChange={handleChange}
      />
      </div>
    
    </container>

    
  );

}


export default ProfileForm;
