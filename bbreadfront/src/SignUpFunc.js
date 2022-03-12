import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

// SignUpFunc follows the structure of MyApp from the class programming assignments and 
// SignUpForm follows the structure of Form

const SignUp = require("./SignUpForm");

function SignUpFunc() {
  
  async function updateList(person) {
    let result  = await makePostCall(person);
      return result.data;
    
  }
  
  async function makePostCall(person) {
    try {
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
      const response = await axios.post("http://localhost:5000/users/", person);  
      return response;
    
    } catch (error) { 
      console.log(error);
      return false;
    }
  }


  return (
    <div className="container">
      <SignUpForm handleSubmit={updateList} />
    </div>
  );


}

export default SignUpFunc;
