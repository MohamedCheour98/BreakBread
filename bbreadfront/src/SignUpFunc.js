import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";
const SignUp = require("./SignUpForm");
function SignUpFunc() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    let signedIn = makePostCall(person).then(result => {
      console.log("fuckkk4");

      if (Object.keys(result.data).length != 0 && result.status === 201) {
        console.log("why is this ap");
        setCharacters([...characters, result.data]);
        console.log("fuckkk4");

        return true;
      }
      console.log("pe");
      SignUp.setShow(true);
      return false;
    });
    return signedIn;
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
  async function makePostCall(person) {
    try {
      console.log("gethere");
      const response = await axios.post("http://localhost:5000/users", person);
      console.log("dic");
      console.log(response);
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
    <div className="container">
      <SignUpForm handleSubmit={updateList} />
    </div>
  );
}

export default SignUpFunc;
