var mongoose = require("mongoose");
const mongooseService = require("../services/mongoose.service");
const config = require("../config/env.config");

// test database for testing
mongooseService.connect(
  config.mongo.address + config.mongo.port + "/user_model_test_db"
);
const User = require("../models/user.model");

describe("User model test", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("If module exists", () => {
    expect(User).toBeDefined();
  });

  describe("get user", () => {
    test("gets a user", async () => {
      const user = new User({
        firstName: "foo",
        lastName: "bar",
        email: "foo@bar",
        password: "password",
      });
      await user.save();

      const foundUser = await User.findOne({ firstName: "foo" });
      const expected = "foo";
      const actual = foundUser.firstName;
      expect(actual).toEqual(expected);
    });
  });
});
