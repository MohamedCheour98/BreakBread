const mongoose = require("mongoose");

// user schema for the database, a user has:
// username and password for login credentials (must be at least 2 chars), a profilepicture,
// groups of friends that they have created or have been invited to,
// friends that they have added (other users)
// invetory that holds all the items they currently have
// history that holds their previous purchases and grocery runs

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid Password.");
      },
    },
    profilepicture: {
      type: String,
      required: false,
    },
    groups: {
      type: Object,
      required: false,
    },
    friends: {
      type: Object,
      required: false,
    },
    inventory: {
      type: Object,
      required: false,
    },
    history: {
      type: Object,
      required: false,
    },
    groups: {
      type: Object,
      required: false,
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
