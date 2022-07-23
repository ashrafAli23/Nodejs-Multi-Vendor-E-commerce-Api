import Joi from "joi";

// validate coupon
export const couponValidation = async (body: Object) => {
  const couponSchema = Joi.object({
    percentageDiscount: Joi.number().required(),
    maxCouponAmount: Joi.number().required(),
  });

  const value = couponSchema.validate(body);
  return value;
};
