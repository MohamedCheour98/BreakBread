import React, { useState } from "react";
import { Container} from "react-bootstrap";
import FormFriend from './FormFriend'

function ProfileForm(props) {
  const [askForFriend, setAskFriend] = useState(false);
  const[operation, setOperation] = useState("");


  return (

    <div><input type="button" value="Add Friends" onClick={addFriend} />
    {askForFriend ? (
      <FormFriend addFriend = {props.addFriend} deleteFriend = {props.deleteFriend} operation = {operation} setAskFriend = {setAskFriend}  />
    ): null}
    <input type="button" value="Delete Friends" onClick={deleteFriend} /></div>

  );
  function addFriend(){
    setOperation("addFriend");
    setAskFriend(true);

  }
  function deleteFriend(){
    setOperation("deleteFriend");

    setAskFriend(true);
  }
  
}


export default ProfileForm;
