
import React, {useState, useEffect} from 'react'
import ProfileForm from './ProfileForm'
import axios from 'axios'
import Table from "./Table";
function ProfileFunc(props) {
  const [characters, setCharacters] = useState([]);
function removeOneCharacter (index) {
  const deleted = characters[index];
  const updated = characters.filter((character, i) => {
      return i !== index
    });
    deleteBackend(deleted['_id']);
    setCharacters(updated);
  }
  async function deleteBackend(_id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + _id);
      return response.data.users_list;

    }
    catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;
    }
  }
  function updateList(name) { 
    console.log("we reachedhere");
    console.log(name);
    
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

 async function printScreen(person){
   let result = await makeGetCall(person);
    
    if (
      Object.keys(result.data.users_list).length !== 0 &&
      result.status === 200
    ) {
    
    }
    return true;
 }
 async function getUserFromDB(person){
   let user = await makeGetCall(person);
   return user;
 }
 async function makeGetCall(person) {
  try {
    console.log(person);

    const response = await axios.get(
      "http://localhost:5000/users?username=" +
        person.username +
        "&password=" +
        person.password
    );

    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}
 

    return (
      <div className="container">
            <ProfileForm getUserFromDB = {getUserFromDB} />
      </div>
    );  
}

export default ProfileFunc;
