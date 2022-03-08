
import React, {useState, useEffect} from 'react'
import ProfileForm from './ProfileForm'
import FriendTable from "./FriendTable"
import InventoryTable from './InventoryTable';
import { useHistory, useLocation } from 'react-router-dom';
import axios from "axios";
function ProfileFunc(props) {
  
  let location = useLocation();
  let currentUser = location.state.user;

  async function addFriend(friend){
  
    try {
      const response = await axios.put("http://localhost:5000/users", {user: currentUser.username , friend: friend, operation: "addFriend"});
      
      return response.data;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }
  async function deleteFriend(friend){
   
    try {
      const response = await axios.put("http://localhost:5000/users", {user: currentUser.username , friend: friend, operation: "deleteFriend"});
      
      return response.data;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }
   useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );
  //        <InventoryTable user={location.state.user}/>
      return (
        <div className="container">
          <FriendTable user={location.state.user}/>
          <InventoryTable user={location.state.user}/>
          <ProfileForm addFriend= {addFriend} deleteFriend={deleteFriend} user = {currentUser}/>
        </div>
      );  
  }
export default ProfileFunc;
