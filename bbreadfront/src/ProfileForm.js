import React, { useState } from "react";
import { Container} from "react-bootstrap";
import FormFriend from './FormFriend'

function ProfileForm(props) {
  const [person, setPerson] = useState({
    name: "",
    password: ""
  });
  const [askForFriend, setAskFriend] = useState(false);
  function submitForm() {
    props.handleSubmit(person);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }

  
  const [friend, setFriend] = useState("");
  function changeFriend(friend){
    setAskFriend(false);
  }
  const [operation, setOperation] = useState("addFriend");
  

  return (
    <div><input type="button" value="Add Friends" onClick={addFriend} />
    {askForFriend ? (
        <div >
              <FormFriend changeFriend={changeFriend} addFriend = {props.addFriend} deleteFriend = {props.deleteFriend} setAskFriend = {setAskFriend} operation = {operation} />
        </div>
      ) : null}
    
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
