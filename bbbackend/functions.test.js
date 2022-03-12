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
  const person3 = {
    username: "ruby",
    password: "rb",
  };

  const savedUser = await userServices.addUser(person);
  await userServices.addUser(person2);
  await userServices.addUser(person3);

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
  expect(user[0].inventory.itemList[0].item).toBe("cookie");
});

//test patch user: fail
test("testing patching a user, bad input returns false on failure", async () => {
  const result = await userServices.patchUser("cookie", "hannyt");
  expect(result).toBeFalsy();
});

//test setInventory for user
test("setting inventory of a user", async () => {
  const usertoPatch = await userServices.findUserByName("joe");
  const usertoPatch2 = await userServices.findUserByName("hannyt");
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
  userServices.setInventory(item, usertoPatch2);
  userServices.setInventory(item2, usertoPatch);

  expect(usertoPatch[0].inventory.itemList[0].item).toBe("eggs");
  expect(usertoPatch2[0].inventory.itemList[0].user).toBe("hannyt");
  expect(usertoPatch2[0].inventory.itemList[0].item).toBe("cookie");
});

//test find user by name only
test("testing finding a user by username only", async () => {
  const result = await userServices.findUserByName("hannyt");
  expect(result[0].username).toBe("hannyt");
  expect(result[0].password).toBe("ht");
});

//test invalid password throws error in test
test("testing an invalid password attempt throws an error", async () => {
  const person = {
    username: "jess",
    password: "1",
  };
  expect(() => userServices.addUser(person).toThrow("Invalid Password"));
});

//test addFriend returns false with invalid users
test("test addFriend returns false with invalid users", async () => {
  result = await userServices.addFriend("nouser", "nofriend");
  expect(result).toBeFalsy();
});

//test addFriend returns false with already friends
test("test addFriend returns false with invalid users", async () => {
  result = await userServices.addFriend("hannyt", "joe");
  result = await userServices.addFriend("hannyt", "joe");
  expect(result).toBeFalsy();
});

//test addFriend success functionality
test("test addFriend success functionality returns true", async () => {
  result = await userServices.addFriend("joe", "ruby");
  expect(result).toBeTruthy();
});

//test deleteFriend returns false with invalid users
test("test deleteFriend returns false with invalid users", async () => {
  result = await userServices.deleteFriend("nouser", "nofriend");
  expect(result).toBeFalsy();
});

//test deleteFriend returns false with non-friends
test("test deleteFriend returns false with non-friends", async () => {
  result = await userServices.deleteFriend("hannyt", "ruby");
  expect(result).toBeFalsy();
});

//test deleteFriend success functionality
test("test deleteFriend success functionality returns true", async () => {
  result = await userServices.deleteFriend("hannyt", "joe");
  expect(result).toBeTruthy();
});

//test patchedUserDelete success functionality
test("test deleting an item successfully", async () => {
  userToPatch = await userServices.findUserByName("joe");
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
  await userServices.patchUser(item, userToPatch);
  await userServices.patchUser(item2, userToPatch);

  item3 = userToPatch[0].inventory.itemList[0];
  await userServices.patchedUserDelete(item3, userToPatch);
  expect(userToPatch[0].inventory.itemList[0]).not.toBe(item3);
});

//test patchedUserDelete failure functionality
test("test deleting an item failure", async () => {
  userToPatch = {
    name: "hannah",
  };

  index = 1;
  result = await userServices.patchedUserDelete(index, userToPatch);
  expect(result).toBeFalsy();
});

//Test delete function and also cleanup
test("delete users", async () => {
  result = await userServices.findUserByName("joe");
  result2 = await userServices.findUserByName("hannyt");
  result = await userServices.removeUserById(result._id);
  result2 = await userServices.removeUserById(result2._id);
});

//test improper delete call
test("improper delete usage returns false", async () => {
  const result = await userServices.removeUserById("joe");
  expect(result).toBeFalsy();
});
