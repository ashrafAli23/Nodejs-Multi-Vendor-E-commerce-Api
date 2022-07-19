import Joi from "joi";

// validate category
export const categoryValidation = async (body: Object) => {
  const categorySchema = Joi.object({
    name: Joi.string().required().trim(),
    parentId: Joi.string(),
    description: Joi.string().required(),
    isActive: Joi.boolean(),
  });

  const value = categorySchema.validate(body);
  return value;
};
