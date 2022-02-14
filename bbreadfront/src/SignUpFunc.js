import React, {useState, useEffect} from 'react'
import SignUpForm from './SignUpForm'
import axios from 'axios'

function SignUpFunc() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
       setCharacters([...characters, result.data] );
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
 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
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
        
        <SignUpForm handleSubmit={updateList} />
      </div>
    );  
}

export default SignUpFunc;
