const express = require("express");
const cors = require("cors");

const userServices = require("./models/user-services");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/**
 * Fetch all users when "/users" is added to the url.
 * Separation of concerns: Calling the model component "user-services"
 * and not accessing the databse directly from here.
 */
app.get("/users", async (req, res) => {
  const username = req.query["username"];
  const password = req.query["password"];

  try {
    const result = await userServices.getUsers(username, password);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

/**
 * Adding a new user to the database once they sign up.
 * To implement: check if user already exists.
 */

app.put("/users", async (req, res) => {
  const data = req.body;
  const userAddingFriend = data.user;
  const friendToAdd = data.friend;
  const operation = data.operation;
  let success = false;
  if (operation === "addFriend") {
    success = await userServices.update(userAddingFriend, friendToAdd);
  } else {
    success = await userServices.update2(userAddingFriend, friendToAdd);
  }

  if (success) {
    res.status(201).send(true);
  } else {
    res.status(201).send(false);
  }
});
/*
app.put2("/users", async (req, res) => {
  const data = req.body;
  const userDeletingFriend = data.user;
  const friendToDelete = data.friend;

  let success = await userServices.updateDelete(
    userDeletingFriend,
    friendToDelete
  );

  if (success) {
    res.status(201).send(true);
  } else {
    res.status(201).send(false);
  }
});
*/

app.post("/users", async (req, res) => {
  let user = req.body;

  const inDatabaseUserNameAndPassword =
    await userServices.findUserByNameAndPassword(user.username, user.password);

  const inDatabaseUsername = await userServices.findUserByName(user.username);

  let savedUser = {};

  if (
    Object.keys(inDatabaseUserNameAndPassword).length === 0 &&
    Object.keys(inDatabaseUsername).length === 0
  ) {
    savedUser = await userServices.addUser(user);
    res.status(201).send(savedUser);
  } else {
    res.status(500).end();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.:${port}`);
});
