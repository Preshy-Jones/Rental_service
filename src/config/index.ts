const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().default("development"),
  SERVER_PORT: Joi.number().default(4040),
  MONGO_HOST: Joi.string().required().description("Mongo DB host url"),
  MONGO_PORT: Joi.number().default(27017),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,

  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
};
