
import React, {useState, useEffect} from 'react'
import ProfileForm from './ProfileForm'
import axios from 'axios'

function ProfileFunc() {
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
        setCharacters(result);
   });
}, [] );
    return (
      <div className="container">
        
        <ProfileForm handleSubmit={updateList} />
      </div>
    );  
}

export default ProfileFunc;
