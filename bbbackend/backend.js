const express = require("express");
const cors = require("cors");

const userServices = require("./models/user-services");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.post("/users", async (req, res) => {
  let user = req.body;

  const inDatabase = await userServices.findUserByNameAndPassword(
    user.username,
    user.password
  );
  let savedUser = {};

  if (Object.keys(inDatabase).length === 0) {
    savedUser = await userServices.addUser(user);
  }
  if (savedUser || Object.keys(savedUser).length === 0)
    res.status(201).send(savedUser);
  else res.status(500).end();
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});


app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});
*/
app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    userServices.removeUserById(result);
    res.status(204).send("user removed");
  }
});

// this one adds users
