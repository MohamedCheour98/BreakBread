
import React, {useState, useEffect} from 'react'
import ProfileForm from './ProfileForm'
import axios from 'axios'

function ProfileFunc() {
  const [person, setPerson] = useState([]);

  function updateList(person) { 
    makeGetCall(person).then( result => {
    /*if (result && result.status === 201)
       setCharacters([...characters, result.data] );*/
    });
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
 async function makeGetCall(person){
  try {
     const response = await axios.get('http://localhost:5000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}
 useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setPerson(result);
   });
}, [] );
    return (
      <div className="container">
        
        <ProfileForm handleSubmit={updateList} />
      </div>
    );  
}

export default ProfileFunc;
