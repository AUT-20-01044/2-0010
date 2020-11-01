const beautifyUnique = require("mongoose-beautiful-unique-validation");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
});

userSchema.index({ email: 1 }, { unique: true, name: "EmailUniqueToUser" });

userSchema.plugin(beautifyUnique);

module.exports = mongoose.model("Users", userSchema);
