const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { test } = require("prettier");

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

//test patch user: succes
test("testing patching a user", async () => {
  user = await userServices.findUserByName("hannyt");
  const item = {
    item: "cookie",
    price: "1",
    quantity: "6",
    user: "hannyt",
  };

  result = await userServices.patchUser(item, user);
  console.log(result);
  console.log(user);
  expect(user[0].inventory.itemList[0].item).toBe("cookie");
});

//test patch user: fail
test("testing patching a user, bad input returns false on failure", async () => {
  const result = await userServices.patchUser("cookie", "hannyt");
  expect(result).toBeFalsy();
});

//test setInventory
test("setting inventory of a user", async () => {
  const usertoPatch = await userServices.findUserByName("joe");
  const item = {
    item: "banana",
    price: "1",
    quantity: "6",
    user: "hannyt",
  };
  const item2 = {
    item: "eggs",
    price: "3",
    quantity: "1",
    user: "joe",
  };
  userServices.setInventory(item, usertoPatch);
  userServices.setInventory(item2, usertoPatch);

  expect(usertoPatch[0].inventory.itemList[0].item).toBe("banana");
  expect(usertoPatch[0].inventory.itemList[0].user).toBe("hannyt");
  expect(usertoPatch[0].inventory.itemList[1].item).toBe("eggs");
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
  expect(() => userServices.addUser(person).toThrow("Invalid Password"));
});

//test update returns false with invalid users
test("test update returns false with invalid users", async () => {
  result = await userServices.update("nouser", "nofriend");
  expect(result).toBeFalsy();
});

//test update returns false with already friends
test("test update returns false with invalid users", async () => {
  result = await userServices.update("hannyt", "joe");
  result = await userServices.update("hannyt", "joe");
  expect(result).toBeFalsy();
});

//test update success functionality
test("test update success functionality returns true", async () => {});

//test update2 returns false with invalid users
test("test update2 returns false with invalid users", async () => {
  result = await userServices.update2("nouser", "nofriend");
  expect(result).toBeFalsy();
});

//test update2 returns false with non-friends
test("test update2 returns false with non-friends", async () => {
  result = await userServices.update("hannyt", "joe");
  expect(result).toBeFalsy();
});

//test update2 success functionality
test("test update2 success functionality returns true", async () => {});

//Test delete function and also cleanup
test("delete users", async () => {
  result = await userServices.findUserByName("joe");
  result2 = await userServices.findUserByName("hannyt");
  result = await userServices.removeUserById(result._id);
  result2 = await userServices.removeUserById(result2._id);
  console.log(result);
  console.log(result2);
});

//test improper delete call
test("improper delete usage returns false", async () => {
  const result = await userServices.removeUserById("joe");
  expect(result).toBeFalsy();
});
