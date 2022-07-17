import { Request, Response, NextFunction } from "express";
import { CustomError } from "../apiResponse/customError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ status: err.statusCode, success: false, message: err.message });
  }
};

export default errorHandler;
