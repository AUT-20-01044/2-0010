const mongoose = require("mongoose");
const mongooseService = require("../services/mongoose.service");
const config = require("../config/env.config");

// test database for testing
mongooseService.connect(
  config.mongo.address + config.mongo.port + "/device_brew_model_test_db"
);
const BrewDevice = require("../models/device.brew.model");

describe("Brew Device model test", () => {
  beforeAll(async () => {
    await BrewDevice.deleteMany({});
  });

  afterEach(async () => {
    await BrewDevice.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("If module exists", () => {
    expect(BrewDevice).toBeDefined();
  });

  describe("Create device", () => {
    test("Saves device", async () => {
      const device = new BrewDevice({
        userId: mongoose.Types.ObjectId(),
        type: "BC",
        name: "Brew Controller",
        clientId: "ESP32-MQTT",
        sensors: [{ name: "temp", type: 1 }],
        status: {
          setpoint: 25,
          brewing: true,
          timezone: "Autralia/Sydney",
          error: 0,
        },
      });
      await device.save();

      const foundDev = await BrewDevice.findOne({ name: "Brew Controller" });
      const expected = "Brew Controller";
      const actual = foundDev.name;
      expect(actual).toEqual(expected);
    });
  });
});
