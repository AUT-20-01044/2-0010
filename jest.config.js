const { defaults } = require("jest-config");
module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "2-0010 Test Report v0.2.0",
      },
    ],
  ],
};
