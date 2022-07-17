import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import tokenServices from "../services/token.service";
import userServices from "../services/user.service";
import authService from "../services/auth.service";
import { ApiResponse } from "../apiResponse/apiResponse";
import {
  registerValidation,
  loginValidation,
} from "../utils/validation/auth.validation";
import { ErrorResponse } from "../apiResponse/errorResponse";

const register = asyncHandler(async (req: Request, res: Response) => {
  const validate = await registerValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }

  const user = await userServices.createUser(req.body);
  const token = await tokenServices.generateAuthTokens(user);
  ApiResponse.created(res, { user, token });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const validate = await loginValidation(req.body);
  if (validate.error) {
    throw new ErrorResponse(validate.error.message);
  }

  const user = await authService.login(req.body);
  const token = await tokenServices.generateAuthTokens(user);
  ApiResponse.ok(res, { user, token });
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  ApiResponse.ok(res);
});

const refreshToken = async (req: Request, res: Response) => {
  const tokens = await authService.refreshToken(req.body.refreshToken);
  ApiResponse.ok(res, { tokens });
};

export default {
  register,
  login,
  logout,
  refreshToken,
};
