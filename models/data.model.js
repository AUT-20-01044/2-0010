const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  sensorId: {
    type: mongoose.ObjectId,
    required: true,
  },
  data: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", dataSchema, "data");
