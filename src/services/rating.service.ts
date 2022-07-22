import { NotFoundError } from "../apiResponse/notFoundError";
import { ErrorResponse } from "../apiResponse/errorResponse";
import ProductRating, { IRating } from "../models/Product.Rating";

/**
 * @desc    Query rating Using It's ID
 * @param   { String } userId - Review ID
 * @returns { Object<rate> }
 */
const ratingById = async (body: IRating): Promise<IRating> => {
  const rate = await ProductRating.findOne({
    productId: body.productId,
    userId: body.userId,
  });

  if (!rate) {
    throw new NotFoundError("Your rate not found");
  }

  return rate;
};

/**
 * @desc    Create New Review
 * @param   { String } id - Product ID
 * @param   { Object } body - Body object data
 * @returns { Object<rating> }
 */
const createRate = async (id: string, body: IRating): Promise<IRating> => {
  const checkUser = await ProductRating.findOne({
    userId: body.userId,
    productId: id,
  });

  if (checkUser) {
    throw new ErrorResponse("This user rating before");
  }

  const rate = await ProductRating.create({
    productId: id,
    userId: body.userId,
    rating: body.rating,
    message: body.message ? body.message : "",
  });

  return rate;
};

/**
 * @desc    Update Review Using It's ID
 * @param   { String } id - Product ID
 * @param   { Object } body - Body object data
 * @returns { Void }
 */
const updateRating = async (id: string, body: IRating): Promise<void> => {
  const rate = await ProductRating.findOne({
    productId: id,
    userId: body.userId,
  });

  if (!rate) {
    throw new ErrorResponse("You have not rated this product");
  }

  await ProductRating.findOneAndUpdate(
    { productId: id, userId: body.userId },
    body,
    {
      new: true,
    }
  );
};

/**
 * @desc    Delete Review Using It's ID
 * @param   { Object } body - User ID
 * @returns { Void }
 */
const deleteRate = async (body: IRating): Promise<void> => {
  const rate = await ProductRating.findById({
    productId: body.productId,
    userId: body.userId,
  });

  await rate?.deleteOne();
};

export default {
  ratingById,
  createRate,
  updateRating,
  deleteRate,
};
