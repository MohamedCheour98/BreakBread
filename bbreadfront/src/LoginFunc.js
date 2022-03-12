import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";
const loginform = require("./LoginForm");

// LoginFunc follows the structure of MyApp from the class programming assignments and 
// LoginForm follows the structure of Form

function LoginFunc() {
  const [characters, setCharacters] = useState([]);
  function removeOneCharacter(index) {
    const deleted = characters[index];
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    deleteBackend(deleted["_id"]);
    setCharacters(updated);
  }
  async function deleteBackend(_id) {
    try {
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
      const response = await axios.delete("http://localhost:5000/users/" + _id);
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  
  async function updateList(person) {
    let result = await makeGetCall(person);
    return result.data.users_list;
  }

  async function fetchAll() {
    try {
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
      const response = await axios.get("http://localhost:5000/users");
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function makeGetCall(person) {
    try {
      // https://breakbread2.herokuapp.com/users?username=un&password=p for herokuapp instead of local
      const response = await axios.get(
        "http://localhost:5000/users?username=" +
          person.username +
          "&password=" +
          person.password
      );
      return response;
    } 
    
    catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then(result => {
      if (result) setCharacters(result);
    });
  }, []);

  return (
    <nav>
      <div className="container">
        <LoginForm handleSubmit={updateList} />
      </div>
    </nav>
  );
}

export default LoginFunc;
