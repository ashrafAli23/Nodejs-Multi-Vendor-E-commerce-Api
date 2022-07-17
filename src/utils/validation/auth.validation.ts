import Joi from "joi";

// validate user registertion
export const registerValidation = async (body: object) => {
  const userSchema = Joi.object({
    name: Joi.string().trim().min(3).max(20).required(),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6).trim(),
    role: Joi.string(),
  });

  const value = userSchema.validate(body);
  return value;
};

// validate user login
export const loginValidation = async (body: object) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6).trim(),
    role: Joi.string(),
  });

  const value = userSchema.validate(body);
  return value;
};
