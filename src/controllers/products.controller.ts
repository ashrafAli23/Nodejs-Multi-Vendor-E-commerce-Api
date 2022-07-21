import { Request, Response } from "express";
import { ApiResponse } from "../apiResponse/apiResponse";
import asyncHandler from "express-async-handler";
import productService from "../services/product.service";
import { productValidation } from "../utils/validation/product.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const validate = await productValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  if (!req.file || !req.files) {
    throw new ErrorResponse("PRoduct Images Require");
  }

  const result = await productService.createProduct(
    req.body,
    req.files,
    req.file
  );
  ApiResponse.created(res, { product: result });
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const validate = await productValidation(req.body);

  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await productService.updateProduct(req.params.id, req.body);
  ApiResponse.ok(res, { product: result });
});

const ProductById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid ID");
  }
  const result = await productService.getProductById(req.params.id);
  ApiResponse.ok(res, { product: result });
});

const ProductMainImg = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body) {
    throw new ErrorResponse("Invalid Data");
  }
  if (!req.file) {
    throw new ErrorResponse("PRoduct Images Require");
  }

  const result = await productService.updateProductMainImage(
    req.params.id,
    req.body,
    req.file
  );
  ApiResponse.ok(res, { product: result });
});

const ProductSubImgs = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body) {
    throw new ErrorResponse("Invalid Data");
  }

  if (!req.files) {
    throw new ErrorResponse("Product Images Require");
  }
  const result = await productService.updateProductImages(
    req.params.id,
    req.body,
    req.files
  );
  ApiResponse.ok(res, { product: result });
});

const updateProductSize = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body) {
    throw new ErrorResponse("Invalid Data");
  }
  const result = await productService.updateProductSize(
    req.params.id,
    req.body
  );
  ApiResponse.ok(res, { product: result });
});

const deleteProductSize = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body) {
    throw new ErrorResponse("Invalid Data");
  }
  const result = await productService.deleteProductSize(
    req.params.id,
    req.body
  );
  ApiResponse.ok(res, { product: result });
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body) {
    throw new ErrorResponse("Invalid Data");
  }
  const result = await productService.deleteProduct(req.params.id, req.body);
  ApiResponse.ok(res, { product: result });
});
