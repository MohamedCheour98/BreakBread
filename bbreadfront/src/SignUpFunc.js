import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

const SignUp = require("./SignUpForm");

function SignUpFunc() {
  
  async function updateList(person) {
    let result  = await makePostCall(person);
    if (Object.keys(result.data).length !== 0 && result.status === 201) {
      return result.data;
    }

    return null;
  }
  
  async function makePostCall(person){
    try {
      console.log('hey');
      const response = await axios.post("localhost:5000/users", person);  
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
