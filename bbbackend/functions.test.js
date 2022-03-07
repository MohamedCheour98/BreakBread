// import React, { useState } from "react";
const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const nodemon = require("nodemon");
/*const { test } = require("prettier");*/

test("adding user to database", async () => {
  const person = {
    username: "joe",
    password: "joejoe",
  };

  const savedUser = await userServices.addUser(person);

  console.log(savedUser);

  expect(savedUser.username).toBe("joe");
  expect(savedUser.password).toBe("joejoe");
});

test("adding bad user type to database", async () => {
  const badPerson = {
    yes: "yes",
    no: "no",
  };

  let result = await userServices.addUser(badPerson);

  expect(result).toBeFalsy();
});

test("test db query user joe", async () => {
  let result = await userServices.findUserByNameAndPassword("joe", "joejoe");
  console.log(result);
  console.log(result[0]);
  console.log(result[0].username);

  expect(result[0].username).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});

test("testing get all users", async () => {
  let result = await userServices.getUsers("joe", "joejoe");
  expect(result[0].username).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});
