import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

const SignUp = require("./SignUpForm");

function SignUpFunc() {
  
  async function updateList(person) {
    let result  = await makePostCall(person);
      if (Object.keys(result.data).length !== 0 && result.status === 201) {
        return true;
      }
    return false
  }
  

  async function makePostCall(person) {
    try {
      const response = await axios.post(" https://breakbread2.herokuapp.com/users", person);  
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
