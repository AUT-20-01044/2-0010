const beautifyUnique = require("mongoose-beautiful-unique-validation");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
// const { ObjectID } = require("bson");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    setpoint: {
      type: Number,
      required: false,
    },
    brewing: {
      type: Boolean,
      required: false,
    },
    timezone: {
      type: String,
      required: false,
    },
    error: {
      type: Number,
      required: false,
    },
  },
  { _id: false }
);

const sensorSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: false,
  },
});

const deviceSchema = new Schema(
  {
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
    status: statusSchema,
    sensors: [sensorSchema],
  },
  { timestamps: true }
);

deviceSchema.index(
  { name: 1, userId: 1 },
  { unique: true, name: "DeviceNameUniqueToUser" }
);

deviceSchema.plugin(beautifyUnique);

module.exports = mongoose.model("BrewDevices", deviceSchema);
