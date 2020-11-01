// Container for all environments
const environments = {};

environments.production = {
  mongo: {
    port: 27017,
    address: "mongodb://mongo:",
  },
  envName: "production",
};

environments.development = {
  mongo: {
    port: 27017,
    address: "mongodb://localhost:",
  },
  envName: "development",
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the environment defined above,
// if not default to production
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.production;

// export the module
module.exports = environmentToExport;
