import userServices from "../services/user.service";
import { ApiResponse } from "../apiResponse/apiResponse";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userValidation } from "../utils/validation/user.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const validate = await userValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await userServices.createUser(req.body);
  ApiResponse.created(res, { user: result });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const validate = await userValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }
  const result = await userServices.updateUser(req.params.id, req.body);
  ApiResponse.ok(res, { user: result });
});

const updateUserPassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.body.newPassword || !req.body.oldPassword) {
    throw new ErrorResponse("Invalid user data");
  }
  const result = await userServices.updateUserPassword(req.params.id, req.body);
  ApiResponse.ok(res, { user: result });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ErrorResponse("Invalid user id");
  }
  const result = await userServices.findUserById(req.params.id);
  ApiResponse.ok(res, { user: result });
});

const UserProfileImg = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id || !req.file) {
    throw new ErrorResponse("Invalid user data");
  }
  await userServices.UserProfileImage(req.params.id, req.file);
  ApiResponse.ok(res, { user: "Profile image updated success" });
});

export default {
  createUser,
  updateUser,
  updateUserPassword,
  getUserById,
  UserProfileImg,
};
