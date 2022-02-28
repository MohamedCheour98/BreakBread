import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Table from "./Table";
function ProfileForm(props) {
  const [person, setPerson] = useState({
    username: props.username,
    password: props.password
  });
  const [user, setUser] = useState({
     user: {}
  });

 

  function handleChange(event) {
    const { name, value } = event.target; /* added id*/
    if (name === "password") setPerson({ username: person["username"], password: value });
    else setPerson({ username: value, password: person["password"] });
  }
   
  return (

    <div className="container">
    
    <input type="button" value="Login" onClick={getUsers(person)} />

    
  </div>
   );
   //Trying to get the user to come before the console.log but every time it prints it just prints the undefined
   //Any ideas 
   function getUsers(person){
     props.getUserFromDB(person).then( user => {
        setUser(user);
     })
     console.log(user);
   }
   
   
}

export default ProfileForm;
