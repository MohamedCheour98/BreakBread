import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

function ProfileForm(props) {
  const [person, setPerson] = useState({
    name: "",
    password: ""
  });
  //const [redirect, setRedirect] = React.useState(false);
  //const [userData, setUserData] = useState({});


  function submitForm() {
    props.handleSubmit(person);

    //setRedirect(true);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }
  /*
  return (
    <container>
      <div className = "grocery">
      <input type="button" value="New Run" onClick={submitForm} />
      {redirect  ? (<div>
        <Redirect to={{pathname: "/profile", state: {user: userData}}}  />
      </div> 
      ): null} 

  }

  return (
    <container>
      <div className = "grocery">
      <Link to = "/grocery" className = "button"> New run </Link>    
      </div>
    </container>

    
  );
  */
  return (
    <container>
      <div className = "grocery">
      <Link to = "/grocery" className = "button"> New run </Link>    
      </div>
    </container>
  );
}


export default ProfileForm;
