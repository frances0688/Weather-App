const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  name: { type: String},
  email: { type: String, required: true },
  password: { type: String },
  preferences: { type: Schema.Types.ObjectId, ref: 'Preferences'},
  facebookID: { type: String }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
