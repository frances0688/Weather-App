const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const preferencesSchema = new Schema({
  sun: { type: Number, required: true },
  rain: { type: Number, required: true },
  clouds: { type: Number, required: true },
  snow: { type: Number, required: true },
  wind: { type: Number, required: true },
  hotTemp: { type: Number, required: true },
  idealTemp: { type: Number, required: true },
  coldTemp: { type: Number, required: true }
});

const Preferences = mongoose.model("Preferences", preferencesSchema);

module.exports = Preferences;