const mongoose = require("mongoose");
const mongooseService = require("../services/mongoose.service");
const config = require("../config/env.config");

// test database for testing
mongooseService.connect(
  config.mongo.address + config.mongo.port + "/device_model_test_db"
);
const Device = require("../models/device.model");

describe("Device model test", () => {
  beforeAll(async () => {
    await Device.deleteMany({});
  });

  afterEach(async () => {
    await Device.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("If module exists", () => {
    expect(Device).toBeDefined();
  });

  describe("Create device", () => {
    test("Saves device", async () => {
      const device = new Device({
        userId: mongoose.Types.ObjectId(),
        type: "CS",
        name: "Cell Stretcher",
        clientId: "ESP32-MQTT",
        sensors: [{ dir: 1 }, { dir: 1 }],
      });
      await device.save();

      const foundDev = await Device.findOne({ name: "Cell Stretcher" });
      const expected = "Cell Stretcher";
      const actual = foundDev.name;
      expect(actual).toEqual(expected);
    });
  });
});
