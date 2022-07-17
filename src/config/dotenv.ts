import dotenv from "dotenv";
import Joi from "joi";
dotenv.config();

const envVars = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    DB_URL: Joi.string().required(),
    JWT_SERCRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(90)
      .description("days after which refresh tokens expire"),
  })
  .unknown();

const { value: envVar, error } = envVars
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  port: envVar.PORT,
  dbURL: envVar.DB_URL,
  jwtKey: envVar.JWT_SERCRET,
  accessExpires: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpires: envVar.JWT_REFRESH_EXPIRATION_DAYS,
};
