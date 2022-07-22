import { Request, Response } from "express";
import { ApiResponse } from "../apiResponse/apiResponse";
import asyncHandler from "express-async-handler";
import ratingService from "../services/rating.service";
import { ratingValidation } from "../utils/validation/rating.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";

const createRate = asyncHandler(async (req: Request, res: Response) => {
  const validate = await ratingValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await ratingService.createRate(req.params.id, req.body);
  ApiResponse.created(res, { rating: result });
});

const updateRate = asyncHandler(async (req: Request, res: Response) => {
  const validate = await ratingValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  await ratingService.updateRating(req.params.id, req.body);
  ApiResponse.ok(res, { message: "Your rate updated successfully" });
});

const getRate = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.userId || !req.body.productId) {
    throw new ErrorResponse("userId and productId required");
  }
  const result = await ratingService.ratingById(req.body.userId);
  ApiResponse.ok(res, { rating: result });
});

const deleteRate = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.userId || !req.body.productId) {
    throw new ErrorResponse("userId and productId required");
  }
  await ratingService.deleteRate(req.body);
  ApiResponse.ok(res, { message: "Your rate deleted successfully" });
});

export default {
  createRate,
  updateRate,
  deleteRate,
  getRate,
};
