import { NotFoundError } from "../apiResponse/notFoundError";
import { ErrorResponse } from "../apiResponse/errorResponse";
import Products from "../models/Products";
import Wishlist, { IWishlist } from "../models/Wishlist";

/**
 * @desc    Add product to wishlist list service
 * @param   { String } user - User ID
 * @param   { String } product - Product ID
 * @returns { Void }
 */
const addToWishlist = async (user: string, product: string): Promise<void> => {
  const products = await Products.findById(product);

  if (!products) {
    throw new NotFoundError("Product not found");
  }

  const wishlist = await Wishlist.findOne({ user: user });

  if (wishlist) {
    if (wishlist.products.includes(product)) {
      throw new ErrorResponse("This product already exists");
    }

    wishlist.products.push(product);

    await wishlist.save();
  }

  await Wishlist.create({
    user: user,
    products: [product],
  });
};

/**
 * @desc    Get product's wishlist list service
 * @param   { String } user - User ID
 * @returns { Object<wishlist> }
 */
const getUserWishlist = async (user: string): Promise<IWishlist> => {
  const wishlist = await Wishlist.findOne({ user: user });

  if (!wishlist) {
    throw new NotFoundError("Wishlist not found");
  }

  return wishlist;
};

/**
 * @desc    Remove product from wishlist list service
 * @param   { String } product - Product ID
 * @param   { String } user - User ID
 * @returns { Void }
 */
const deleteProductFromWishlist = async (
  user: string,
  product: string
): Promise<void> => {
  const wishlist = await Wishlist.findOne({ user: user });

  if (!wishlist) {
    throw new NotFoundError("Wishlist not found");
  }

  wishlist.products = wishlist.products.filter((item) => item !== product);

  await wishlist.save();
};

export default {
  addToWishlist,
  getUserWishlist,
  deleteProductFromWishlist,
};
