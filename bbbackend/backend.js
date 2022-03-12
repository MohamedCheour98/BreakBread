const express = require("express");
const cors = require("cors");

const userServices = require("./models/user-services");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// test comment for actions

/**
 * Fetch all users when "/users" is added to the url.
 * Separation of concerns: Calling the model component "user-services".
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
app.post("/users", async (req, res) => {
  let user = req.body;

  const inDatabase = await userServices.findUserByNameAndPassword(
    user.username,
    user.password
  );
  const inDatabase2 = await userServices.findUserByName(user.username);

  let savedUser = {};

  if (
    Object.keys(inDatabase).length === 0 &&
    Object.keys(inDatabase2).length === 0
  ) {
    savedUser = await userServices.addUser(user);
    res.status(201).send(savedUser);
  } else {
    res.status(201).send(savedUser);
  }
});

// put call to add a friend on the backend from the profile page

app.put("/users", async (req, res) => {
  const data = req.body;

  const userAddingFriend = data.user;
  const friendToAdd = data.friend;
  const operation = data.operation;
  let success = false;
  if (operation === "addFriend") {
    success = await userServices.addFriend(userAddingFriend, friendToAdd);
  } else {
    success = await userServices.deleteFriend(userAddingFriend, friendToAdd);
  }

  if (success) {
    res.status(201).send(true);
  } else {
    res.status(201).send(false);
  }
});

// patch call to add an item to a user's inventory on the back end

app.patch("/users", async (req, res) => {
  let mode = req.body.mode;
  if (mode === "add") {
    let item = req.body.item;

    let patchedUser = {};
    const userToPatch = await userServices.findUserByName(item.user);

    if (Object.keys(userToPatch).length !== 0) {
      patchedUser = await userServices.patchUser(item, userToPatch);
      res.status(201).send(patchedUser);
    } else {
      res.status(500).end();
    }
  } else if (mode === "delete") {
    let index = req.body.index;
    let user = req.body.user;
    let patchedUser = {};
    const userToPatch = await userServices.findUserByName(user);
    if (Object.keys(userToPatch).length !== 0) {
      patchedUser = await userServices.patchedUserDelete(index, userToPatch);
      res.status(201).send(patchedUser);
    } else {
      res.status(500).end();
    }
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.:${port}`);
});
