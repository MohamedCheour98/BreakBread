const mongoose = require("mongoose");

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
        if (value.length < 6) throw new Error("Invalid Password.");
      },
    },
    profilepicture: {
      type: String,
      required: false,
    },
    friends: {
      type: Object,
      required: false,
    },
    lists: {
      type: Object,
      required: false,
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
