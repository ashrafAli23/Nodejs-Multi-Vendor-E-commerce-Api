import { Request, Response } from "express";
import { ApiResponse } from "../apiResponse/apiResponse";
import asyncHandler from "express-async-handler";
import { ErrorResponse } from "../apiResponse/errorResponse";
import wishlistService from "../services/wishlist.service";

const createWishlist = asyncHandler(async (req: Request, res: Response) => {
  const result = await wishlistService.addToWishlist(
    req.body.user,
    req.body.product
  );
  ApiResponse.created(res, { message: "Product added to your wishlist" });
});

const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const result = await wishlistService.getUserWishlist(req.body.user);
  ApiResponse.ok(res, { wishlist: result });
});

const deleteFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  await wishlistService.deleteProductFromWishlist(
    req.body.user,
    req.body.product
  );
  ApiResponse.ok(res, { message: "Product removed successfully" });
});

export default {
  createWishlist,
  getWishlist,
  deleteFromWishlist,
};
