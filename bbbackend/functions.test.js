const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
/*const { test } = require("prettier");*/

//testing adding a user to the DB with a valid user type
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

//test the adduser function to make sure it catches an attempt to add an invalid user
test("adding bad user type to database", async () => {
  const badPerson = {
    yes: "yes",
    no: "no",
  };

  let result = await userServices.addUser(badPerson);

  expect(result).toBeFalsy();
});

//testing finding user by name and password for a valid entry in the DB
test("test db query user joe", async () => {
  let result = await userServices.findUserByNameAndPassword("joe", "joejoe");
  console.log(result);
  console.log(result[0]);
  console.log(result[0].username);

  expect(result[0].username).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});

//testing getUsers when a valid entry in the DB is passed
test("testing get all users", async () => {
  let result = await userServices.getUsers("joe", "joejoe");
  expect(result[0].username).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});

//testing deleting a user

//test get all Users with no specified user to get
