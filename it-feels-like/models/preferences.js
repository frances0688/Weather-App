const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const preferencesSchema = new Schema({
  sun: { type: Number},
  rain: { type: Number},
  clouds: { type: Number },
  snow: { type: Number },
  wind: { type: Number },
  hotTemp: { type: Number, required: true },
  idealTemp: { type: Number, required: true },
  coldTemp: { type: Number, required: true }
});

const Preferences = mongoose.model("Preferences", preferencesSchema);

module.exports = Preferences;
