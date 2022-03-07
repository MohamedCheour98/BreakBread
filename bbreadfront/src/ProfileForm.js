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

    <div><input type="button" value="Add Friends" onClick={props.addFriend} />
    <input type="button" value="Delete Friends" onClick={props.deleteFriend} /></div>
    




    

  );

}


export default ProfileForm;
