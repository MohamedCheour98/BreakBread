import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

const SignUp = require("./SignUpForm");

function SignUpFunc() {
  
  async function updateList(person) {
    let result  = await makePostCall(person);
      return result.data;
    
  }
  
  async function makePostCall(person) {
    try {
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
