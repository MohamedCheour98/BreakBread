import React, { useState } from "react";
import FormFriend from './FormFriend'
import GroceryRun from "./GroceryRun";
import { Redirect } from "react-router";
import FriendTable from "./FriendTable"
import InventoryTable from './InventoryTable';
import { useHistory, useLocation } from 'react-router-dom';


function ProfileForm(props) {
  let location = useLocation();
  let currentUser = location.state.user;
  const [askForFriend, setAskFriend] = useState(false);
  const[operation, setOperation] = useState("");
  const [newGroceryRun, setNewGroceryRun] = useState(false);
  const[userData, setUserData] = useState(currentUser);
  const[reload, setReload] = useState(false);
  
  return (


    <div>
      //<InventoryTable user={userData}   removeItem = {removeItem}/>

      //<FriendTable user={userData}/>

      
      //<input type="button" value="Add Friends" onClick={addFriend} />
    {askForFriend ? (
      <FormFriend addFriend = {props.addFriend} deleteFriend = {props.deleteFriend} operation = {operation} setAskFriend = {setAskFriend} updateCurrentUser = {updateCurrentUser} setReload = {setReload}  />
    ): null}
    <input type="button" value="Delete Friends" onClick={deleteFriend} />
    
    
    <input type="button" value="New Run" onClick={newGRun} />
    {newGroceryRun  ? (<div>
      <Redirect to={{pathname: "/grocery", state: {user: userData}}}  />
    </div> 
    ): null}    
    {reload ? (<div>
      <Reload />
    </div>) : null}
    </div>
    

  );
  async function removeItem(index){
    console.log(userData.username);
    
    await props.deleteItem({index: index, mode: "delete", user: userData.username});
    await updateCurrentUser();
    await setReload(true);
  }

  function Reload(){
    setReload(false) 
    return (<h1></h1>)
   }
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
   async function updateCurrentUser(){
     /*
    props.updatedUser("Erik", "mcc").then(result => {
      
      setUserData(result.data.users_list[0]);
      console.log(userData);
      
    }};*/


    let update = await props.updatedUser(currentUser.username, currentUser.password);
    
    setUserData(update.data.users_list[0]);
    
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
