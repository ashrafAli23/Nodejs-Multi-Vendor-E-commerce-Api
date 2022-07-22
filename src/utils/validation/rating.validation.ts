import Joi from "joi";

// validate rating
export const ratingValidation = async (body: Object) => {
  const ratingSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string(),
    rating: Joi.number().required().min(1),
    message: Joi.string(),
  });

  const value = ratingSchema.validate(body);
  return value;
};
