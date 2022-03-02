import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import { isNullOrUndefined } from "prettier/parser-postcss";

const SignUp = require("./SignUpForm");

function SignUpFunc() {
  
  async function updateList(person) {
    let result  = await makePostCall(person);
      if (Object.keys(result.data).length !== 0 && result.status === 201) {
        console.log('found func')
        console.log(result.data)
        return result.data;
      }
    return null
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
