
import React from 'react'
import ProfileForm from './ProfileForm'
import { useLocation } from 'react-router-dom';
import axios from "axios";

// ProfileFunc follows the structure of MyApp from the class programming assignments and 
// ProfileForm follows the structure of Form

function ProfileFunc(props) {
  
  let location = useLocation();
  let currentUser = location.state.user;



  async function makeGetCall(username, password) {
   try {
    // https://breakbread2.herokuapp.com/users?username=un&password=p for herokuapp instead of local
     const response = await axios.get(
       "http://localhost:5000/users?username=" +
         username +
         "&password=" +
         password
     );
     return response;
   } 
   
   catch (error) {
     console.log(error);
     return false;
   }
 }

 async function makePatchCall(data) {

   try {
    // https://breakbread2.herokuapp.com/users for herokuapp instead of local
     const response = await axios.patch("http://localhost:5000/users", {user: data.user, mode: data.mode, index: data.index});  
     return response;
   
   } catch (error) {  
     console.log(error);
     return false;
   }
 }

  async function addFriend(friend){
  
    try {
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
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
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
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
        // https://breakbread2.herokuapp.com/users for herokuapp instead of local
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }
  
      return (
        <div className="container">
          <ProfileForm addFriend= {addFriend} deleteFriend={deleteFriend} updatedUser = {makeGetCall}  deleteItem = {makePatchCall}/>
        </div>
      );  
  }
export default ProfileFunc;
