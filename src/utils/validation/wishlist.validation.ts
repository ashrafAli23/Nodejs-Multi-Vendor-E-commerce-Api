import Joi from "joi";

// validate wishlist
export const wishlistValidation = async (body: Object) => {
  const wishlistSchema = Joi.object({
    user: Joi.string().required(),
    product: Joi.string().required(),
  });

  const value = wishlistSchema.validate(body);
  return value;
};
