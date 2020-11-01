const config = require("../config/env.config");

const mongoose = require("mongoose");
let count = 0;

const devOptions = {
  autoIndex: true, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  //geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const prodOptions = {
  autoIndex: true, // Not recommend by mongoose but as per (https://stackoverflow.com/questions/14342708/mongoose-indexing-in-production-code) it returns if the index exists
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  //geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let options;
if (config.envName == "development") {
  options = devOptions;
} else {
  options = prodOptions;
}

var connectWithRetry = (address) => {
  console.log("Attempting MongoDB connection with retry");
  mongoose
    .connect(address, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      setTimeout(connectWithRetry, 5000, address);
    });
};

exports.connect = (address) => {
  connectWithRetry(address);
};

exports.disconnect = () => {
  mongoose.connection.db.dropDatabase(); // clean database
  mongoose.connection.close();
};
