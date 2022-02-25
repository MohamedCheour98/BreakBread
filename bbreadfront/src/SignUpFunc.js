import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

const SignUp = require("./SignUpForm");


function SignUpFunc() {
  
  const [characters, setCharacters] = useState([]);

  async function updateList(person) {
    let result  = await makePostCall(person);
      if (Object.keys(result.data).length !== 0 && result.status === 201) {
        return true;
      }
    return false
  }


  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data.users_list;
    } catch (error) {
      
      console.log(error);
      return false;
    }
  }
  
  
  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5000/users", person); 
      return response;
    } catch (error) {
      
      console.log(error);
      return false;
    }
  }


  /* useEffect(() => {
    fetchAll().then(result => {
      if (result) 
        setCharacters(result);
    });
  }, []); */


  return (
    <div className="container">
      <SignUpForm handleSubmit={updateList} />
    </div>
  );


}

export default SignUpFunc;
