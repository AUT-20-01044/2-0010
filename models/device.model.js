const beautifyUnique = require("mongoose-beautiful-unique-validation");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
// const { ObjectID } = require("bson");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  dir: {
    type: Number,
    required: false,
  },
  run: {
    type: Number,
    required: false,
  },
  freq: {
    type: Number,
    required: false,
  },
  homed: {
    type: Number,
    required: false,
  },
  error: {
    type: Number,
    required: false,
  },
});

const deviceSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  status: [statusSchema],
});

deviceSchema.index({ name: 1, userId: 1 }, { unique: true, name: "DeviceNameUniqueToUser" });

deviceSchema.plugin(beautifyUnique);

module.exports = mongoose.model("Devices", deviceSchema);
