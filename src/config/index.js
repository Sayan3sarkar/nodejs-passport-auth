const { join } = require("path");

const envPath = join(__dirname, "../..", ".env");

require("dotenv").config({
  path: envPath,
});

const env = process.env;

const config = {
  port: env.PORT,
  session: {
    secret: env.SESSION_SECRET,
  },
};

module.exports = config;
