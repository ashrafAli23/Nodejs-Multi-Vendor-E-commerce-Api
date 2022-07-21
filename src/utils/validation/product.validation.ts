import Joi from "joi";

// validate product
export const productValidation = async (body: Object) => {
  const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().min(6),
    price: Joi.number().required(),
    priceAfterDiscount: Joi.number(),
    quantity: Joi.number().required(),
    sold: Joi.number(),
    color: Joi.array().required(),
    size: Joi.required(),
    reviews: Joi.array(),
    category: Joi.string().required(),
    createdBy: Joi.string().required(),
    isOutOfStock: Joi.boolean(),
  });

  const value = productSchema.validate(body);
  return value;
};
