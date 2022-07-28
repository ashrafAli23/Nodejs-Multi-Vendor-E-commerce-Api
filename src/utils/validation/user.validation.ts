import Joi from "joi";

// validate user
export const userValidation = async (body: Object) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
    password: Joi.string().required().min(6),
    role: Joi.string().required(),
    phone: Joi.string(),
  });

  const value = userSchema.validate(body);
  return value;
};
