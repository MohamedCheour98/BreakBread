import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import Table from "./Table"

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
      <div className = "friends">
        <label htmlFor="friends">Friends</label>
          {/* <input
          type="text"
          name="friends"
          value={person.friends}
          onChange={handleChange}
          /> */}

        <label htmlFor="inventory">Inventory</label>
      <Link to = "/grocery" className = "button"> New run </Link>
    
      </div>
    </container>
    
  );

}


export default ProfileForm;
