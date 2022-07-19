import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { ApiResponse } from "../apiResponse/apiResponse";
import { categoryValidation } from "../utils/validation/category.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";

const createCategory = async (req: Request, res: Response) => {
  const validate = await categoryValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  if (!req.file) {
    throw new ErrorResponse("Category Icon Require");
  }
  const result = await categoryService.createCategoy(req.body, req.file);
  ApiResponse.created(res, { category: result });
};

const updateCategory = async (req: Request, res: Response) => {
  const validate = await categoryValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await categoryService.updateCategory(req.params.id, req.body);
  ApiResponse.ok(res, { category: result });
};

const updateCategoryIcon = async (req: Request, res: Response) => {
  if (!req.file || !req.params.id) {
    throw new ErrorResponse("Category Icon Require or Invalid id");
  }

  const result = await categoryService.updateCategoryImage(
    req.params.id,
    req.file
  );
  ApiResponse.ok(res, { category: result });
};

const findbyIdCategory = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid Category Id");
  }
  const result = await categoryService.findById(req.params.id);
  ApiResponse.ok(res, { category: result });
};

const deleteCategory = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid Category Id");
  }
  const result = await categoryService.deleteCategory(req.params.id);
  ApiResponse.ok(res, {}, "Deleted Success");
};

export default {
  createCategory,
  updateCategory,
  updateCategoryIcon,
  findbyIdCategory,
  deleteCategory,
};
