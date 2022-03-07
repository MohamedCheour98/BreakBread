const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");

const {
  compareByGeneratedPositionsDeflated,
} = require("prettier/parser-postcss");
dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@cluster0.g187p.mongodb.net/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

/**
 * Fetch all users from the database if credentials (username, password) are not valid.
 * Fetch user if credentials are valid.
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function getUsers(username, password) {
  let result;

  if (username === undefined && password == undefined) {
    result = await userModel.find();
  } else if (username && password) {
    result = await findUserByNameAndPassword(username, password);
  }

  return result;
}

/**
 * Add a new user to a database based on the username and password provided by the user.
 * Set default user attributes (profile picture, friends' list etc...) for every new user.
 * @param {*} user
 * @returns new user
 */
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

/**
 * Give a new user an empty list for each of there attributes: friends, groups, inventory, history.
 * History object has to be built out to include more functionality.
 * @param {*} userToAdd
 */
function setDefaults(userToAdd) {
  userToAdd.friends = { friendList: [], friendCount: 0 };
  userToAdd.inventory = { itemList: [], itemCount: 0 };
  userToAdd.profilepicture =
    "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
}

/**
 * Fetch user from the database given its username and password.
 * @param {*} username
 * @param {*} password
 * @returns user
 */
async function findUserByNameAndPassword(username, password) {
  return await userModel.find({ username: username, password: password });
}

async function update(userAddingFriend, friendToAdd) {
  let oldVersionUser = await findUserByName(userAddingFriend);
  let oldVersionFriend = await findUserByName(friendToAdd);

  if (oldVersionUser.length == 0 || oldVersionFriend.length == 0) return false;
  let oldVersionFriends = oldVersionUser[0].friends;
  let oldVersionFFriends = oldVersionFriend[0].friends;
  console.log(oldVersionFFriends);
  if (
    oldVersionFFriends.friendList.includes(userAddingFriend) &&
    oldVersionFriends.friendList.includes(friendToAdd)
  ) {
    return false;
  }

  oldVersionFriends.friendList.push(friendToAdd);
  oldVersionFFriends.friendList.push(userAddingFriend);

  let found = await userModel.updateOne(
    { username: userAddingFriend },
    { $set: { friends: oldVersionFriends } }
  );
  let found2 = await userModel.updateOne(
    { username: friendToAdd },
    { $set: { friends: oldVersionFFriends } }
  );
  if (found.modifiedCount == 0 || found2.modifiedCount == 0) return false;
  return true;
}

async function update2(user1, user2) {
  let oldVersionUser = await findUserByName(user1);
  let oldVersionFriend = await findUserByName(user2);

  if (oldVersionUser.length == 0 || oldVersionFriend.length == 0) return false;

  let oldVersionFriends = oldVersionUser[0].friends;
  let oldVersionFFriends = oldVersionFriend[0].friends;

  if (
    !oldVersionFFriends.friendList.includes(user1) ||
    !oldVersionFriends.friendList.includes(user2)
  ) {
    return false;
  }

  oldVersionFriends.friendList = arrayRemove(
    oldVersionFriends.friendList,
    user2
  );
  oldVersionFFriends.friendList = arrayRemove(
    oldVersionFFriends.friendList,
    user1
  );

  let found = await userModel.updateOne(
    { username: user1 },
    { $set: { friends: oldVersionFriends } }
  );
  let found2 = await userModel.updateOne(
    { username: user2 },
    { $set: { friends: oldVersionFFriends } }
  );
  if (found.modifiedCount == 0 || found2.modifiedCount == 0) return false;
  return true;
}
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

async function findUserByName(name) {
  return await userModel.find({ username: name });
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.findUserByNameAndPassword = findUserByNameAndPassword;
exports.update = update;
exports.update2 = update2;

exports.findUserByName = findUserByName;

/*FUNCTIONS NOT USED IN ACTIVE CODE(leftover), USEFUL FOR LATER

// deletes a user from the database based on their id, no functionality assosciated with this yet, but eventually we should be able to delete accounts

async function removeUserById(id) {
  let result;
  result = await userModel.findByIdAndDelete(id);
  return result;
}

// pulls a user from the database based on their username, no functionality assosciated with this yet, but eventually we may need this lookup

async function findUserByName(name) {
  return await userModel.find({ username: name });
}

// pulls a user from the database based on the _id, no functionality assosciated with this yet, but eventually we may need this lookup


async function findUserById(_id) {
  try {
    return await userModel.findById(_id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}


// export statements
exports.findUserById = findUserById;
exports.findUserByName = findUserByName;
exports.removeUserById = removeUserById;
*/
