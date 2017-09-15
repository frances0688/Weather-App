const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require("../models/user");

const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;