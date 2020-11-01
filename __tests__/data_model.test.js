const mongoose = require("mongoose");
const mongooseService = require("../services/mongoose.service");
const config = require("../config/env.config");

// test database for testing
mongooseService.connect(
  config.mongo.address + config.mongo.port + "/data_model_test_db"
);
const Data = require("../models/data.model");

describe("Data model test", () => {
  beforeAll(async () => {
    await Data.deleteMany({});
  });

  afterEach(async () => {
    await Data.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("If module exists", () => {
    expect(Data).toBeDefined();
  });

  describe("Create device", () => {
    test("Saves device", async () => {
      let sensorId = mongoose.Types.ObjectId();

      const data = new Data({
        sensorId: sensorId,
        data: 20,
      });
      await data.save();

      const foundUser = await Data.findOne({ sensorId: sensorId });
      const actual = foundUser.data;
      expect(actual).toEqual(20);
    });
  });
});
