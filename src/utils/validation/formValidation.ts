import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// validate product
export const productValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    slug: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    description: Joi.string().required().trim(),
    offer: Joi.number(),
    productPictures: Joi.array(),
    reviews: Joi.array(),
    category: Joi.string().required(),
    createdBy: Joi.string().required(),
  });

  const value = productSchema.validate(req.body);
  if (value.error) {
    res.status(401).json({ status: "error", message: value.error.message });
  } else {
    next();
  }
};
