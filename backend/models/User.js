const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    profileDesc:{
      type: String,
      default:"You can provide a description and update your profile"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);