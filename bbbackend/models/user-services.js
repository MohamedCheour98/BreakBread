const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");

dotenv.config();
console.log(
  "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PWD +
    "@cluster0.g187p.mongodb.net/" +
    process.env.MONGO_DB +
    "?retryWrites=true&w=majority"
);
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@cluster0.g187p.mongodb.net/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getUsers(username, password, testing) {
  let result;
  if (username === undefined && password == undefined && testing == 1) {
    result = await userModel.find();
  } else if (username && password) {
    result = await findUserByNameAndPassword(username, password);
  }

  return result;
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    setdefaults(userToAdd);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}
function setdefaults(userToAdd) {
  userToAdd.lists = { listcount: 0 };
  userToAdd.friends = { friendcount: 0 };

  userToAdd.profilepicture =
    "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
}
async function findUserByName(name) {
  return await userModel.find({ username: name });
}

async function findUserByNameAndPassword(username, password) {
  return await userModel.find({ username: username, password: password });
}

async function removeUserById(id) {
  let result;
  result = await userModel.findByIdAndDelete(id);
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.removeUserById = removeUserById;
exports.findUserByName = findUserByName;
