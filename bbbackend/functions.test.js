const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
/*const { test } = require("prettier");*/

//testing adding two users to the DB with a valid user type
test("adding user to database", async () => {
  const person = {
    username: "joe",
    password: "joejoe",
  };
  const person2 = {
    username: "hannyt",
    password: "ht",
  };

  const savedUser = await userServices.addUser(person);
  const savedUser2 = await userServices.addUser(person2);

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

//test get all Users with no specified user to get (user-services, line 37)
test("testing get all users, no specific user", async () => {
  let result = await userServices.getUsers();
  expect(result.length > 1);
});

//test an error catch in improper mongoose connection (user-services, line 24)
//Don't need to cover line 24 anymore

//test patch user
test("testing patching a user", async () => {
  const result = await userServices.findUserByName("joe");
});

//test setInventory
test("setting inventory of a user", async () => {
  const usertoPatch = await userServices.findUserByName("joe");
  const item = "banana";
  const item2 = "eggs";
  userServices.setInventory(item, usertoPatch);
  userServices.setInventory(item2, usertoPatch);

  expect(usertoPatch[0].inventory.itemList[0]).toBe("banana");
  expect(usertoPatch[0].inventory.itemList[1]).toBe("eggs");
});

//test find user by name only
test("testing finding a user by username only", async () => {
  const result = await userServices.findUserByName("hannyt");
  expect(result[0].username).toBe("hannyt");
  expect(result[0].password).toBe("ht");
});

//test invalid password throws error
test("testing an invalid password attempt throws an error", async () => {
  const person = {
    username: "jess",
    password: "1",
  };
  expect(() => userServices.addUser(person).toThrow(Error));
});
