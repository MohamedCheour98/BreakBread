import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";
const loginform = require("./LoginForm");

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
      const response = await axios.delete("http://localhost:5000/users/" + _id);
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  function updateList(person) {
    let loggedIn = makeGetCall(person).then(result => {
      if (
        Object.keys(result.data.users_list).length != 0 &&
        result.status === 200
      ) {
        return true;
      }
      return false;
    });

    return loggedIn;
  }
  async function fetchAll() {
    try {
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
      console.log("here");
      console.log(person);
      const response = await axios.get(
        "http://localhost:5000/users?username=" +
          person.username +
          "&password=" +
          person.password
      );
      console.log("fuck");
      return response;
    } catch (error) {
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
