import { Request, Response } from "express";
import { ApiResponse } from "../apiResponse/apiResponse";
import asyncHandler from "express-async-handler";
import { ErrorResponse } from "../apiResponse/errorResponse";
import couponService from "../services/coupon.service";
import { couponValidation } from "../utils/validation/coupon.validation";

const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const validate = await couponValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await couponService.generateCouponCode(req.body);
  ApiResponse.created(res, { coupon: result });
});

const getCoupon = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.code) {
    throw new ErrorResponse("Coupon code required", 404);
  }
  const result = await couponService.getCoupon(req.body.code);
  ApiResponse.ok(res, { coupon: result });
});

const verifyCoupon = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.code) {
    throw new ErrorResponse("Coupon code required", 404);
  }
  const result = await couponService.verifyCouponCode(req.body.code);
  ApiResponse.ok(res, { coupon: result });
});

const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.couponId) {
    throw new ErrorResponse("Coupon code required", 404);
  }
  await couponService.deleteCoupontCode(req.body.couponId);
  ApiResponse.ok(res, { message: "Coupon deleted successfully" });
});

export default {
  createCoupon,
  getCoupon,
  verifyCoupon,
  deleteCoupon,
};
