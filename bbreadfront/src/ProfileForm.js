import React, { useState } from "react";
import FormFriend from './FormFriend'
import GroceryRun from "./GroceryRun";
import { Redirect } from "react-router";

function ProfileForm(props) {
  const [askForFriend, setAskFriend] = useState(false);
  const[operation, setOperation] = useState("");
  const [newGroceryRun, setNewGroceryRun] = useState(false);
  return (
    
    <div>
      //<input type="button" value="Add Friends" onClick={addFriend} />
    {askForFriend ? (
      <FormFriend addFriend = {props.addFriend} deleteFriend = {props.deleteFriend} operation = {operation} setAskFriend = {setAskFriend}  />
    ): null}
    <input type="button" value="Delete Friends" onClick={deleteFriend} />
    
    
    <input type="button" value="New Run" onClick={newGRun} />
    {newGroceryRun  ? (<div>
      <Redirect to={{pathname: "/grocery", state: {user: props.user}}}  />
    </div> 
    ): null} 
    
    
    
    
    </div>
    

  );
  function newGRun(){
    setNewGroceryRun(true);
  }
  function addFriend(){
    setOperation("addFriend");
    setAskFriend(true);

  }
  function deleteFriend(){
    setOperation("deleteFriend");
    setAskFriend(true);
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
  
  return (
    <container>
      <div className = "grocery">
      <Link to = "/grocery" className = "button"> New run </Link>    
      </div>
    </container>
  );
  */
}


export default ProfileForm;
