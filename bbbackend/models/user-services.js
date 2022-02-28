const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
// prettier stylizing import
const {
  compareByGeneratedPositionsDeflated,
} = require("prettier/parser-postcss");

// sets up the cluster for the MongoDB interaction

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

// function to get users from the MongoDB:
// checks if the username and password passed to the function are valid
// 1) If they are not, all users are returned
// 2) If they are, findUserByNameAndPassword is called to find the correct user based on the username and password passed in

async function getUsers(username, password) {
  let result;

  if (username === undefined && password == undefined) {
    result = await userModel.find();
  } else if (username && password) {
    result = await findUserByNameAndPassword(username, password);
  }

  return result;
}

// function to add a new user to a database based on the username and password that was input
// sets defaults like the profile picture using the setDefaults function

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    setDefaults(userToAdd);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    return false;
  }
}

// called in the addUser function, gives the new user an empty list for friends, groups, inventory, history

function setDefaults(userToAdd) {
  userToAdd.friends = { friendList: [], friendCount: 0 };
  userToAdd.groups = { groupList: [], groupCount: 0 };
  userToAdd.inventory = { itemList: [], itemCount: 0 };
  // history object has to be built out to include more functionality
  userToAdd.history = { purchaseList: [] };
  userToAdd.profilepicture =
    "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
}

// pulls a user from the database based on their username and password

async function findUserByNameAndPassword(username, password) {
  return await userModel.find({ username: username, password: password });
}

// FUNCTIONS NOT USED IN ACTIVE CODE(leftover), USEFUL FOR LATER

// deletes a user from the database based on their id, no functionality assosciated with this yet, but eventually we should be able to delete accounts
/*
async function removeUserById(id) {
  let result;
  result = await userModel.findByIdAndDelete(id);
  return result;
}
*/
// pulls a user from the database based on their username, no functionality assosciated with this yet, but eventually we may need this lookup
/*
async function findUserByName(name) {
  return await userModel.find({ username: name });
}
*/
// pulls a user from the database based on the _id, no functionality assosciated with this yet, but eventually we may need this lookup

/*
async function findUserById(_id) {
  try {
    return await userModel.findById(_id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
*/

// export statements

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.findUserByNameAndPassword = findUserByNameAndPassword;
//exports.findUserById = findUserById;
//exports.findUserByName = findUserByName;
//exports.removeUserById = removeUserById;
