import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { ApiResponse } from "../apiResponse/apiResponse";
import { categoryValidation } from "../utils/validation/category.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";
import asyncHandler from "express-async-handler";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const validate = await categoryValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  if (!req.file) {
    throw new ErrorResponse("Category Icon Require");
  }
  const result = await categoryService.createCategoy(req.body, req.file);
  ApiResponse.created(res, { category: result });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const validate = await categoryValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await categoryService.updateCategory(req.params.id, req.body);
  ApiResponse.ok(res, { category: result });
});

const updateCategoryIcon = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file || !req.params.id) {
    throw new ErrorResponse("Category Icon Require or Invalid id");
  }

  const result = await categoryService.updateCategoryImage(
    req.params.id,
    req.file
  );
  ApiResponse.ok(res, { category: result });
});

const findbyIdCategory = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid Category Id");
  }
  const result = await categoryService.findById(req.params.id);
  ApiResponse.ok(res, { category: result });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid Category Id");
  }
  const result = await categoryService.deleteCategory(req.params.id);
  ApiResponse.ok(res, {}, "Deleted Success");
});

export default {
  createCategory,
  updateCategory,
  updateCategoryIcon,
  findbyIdCategory,
  deleteCategory,
};
