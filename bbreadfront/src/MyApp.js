
import Table from './Table';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Form from './Form';



function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
   fetchAll().then( result => {
      if (result)
         setCharacters(result);
    });
   }, [] );
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
function removeOneCharacter (index) {


  const response = axios.delete('http://localhost:5000/users/' + characters[index]['id']);
  if(response.status == 404){
    console.log('Resource not found.');
    return false;
  }
  const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);

  }







  function updateList(person) {
   makePostCall(person).then( result => { //uid in result

   if (result && result.status === 201)
      setCharacters([...characters, result.data ] );
   });
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


return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />


  </div>
)


}



















export default MyApp;
