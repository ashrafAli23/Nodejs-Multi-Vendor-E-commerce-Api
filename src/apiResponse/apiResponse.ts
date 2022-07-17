import { Response } from "express";

export class ApiResponse {
  static response = (
    res: Response,
    statusCode: number,
    payload?: Object,
    message?: string
  ) => {
    const success = statusCode === 200 || statusCode === 201 ? true : false;
    res.status(statusCode).send({
      status: statusCode,
      success,
      message,
      data: payload,
    });
  };

  static ok = (res: Response, payload?: Object, message?: string) => {
    const msg = message ?? "success";
    const status: number = 200;
    return ApiResponse.response(res, status, payload, msg);
  };

  static created = (res: Response, payload?: Object, message?: string) => {
    const msg = message ?? "success";
    const status: number = 201;
    return ApiResponse.response(res, status, payload, msg);
  };

  //   static customError = (
  //     res: Response,
  //     statusCode?: number,
  //     message = "Error occured",
  //     stack?: any
  //   ) => {
  //     const status: number = statusCode ?? 403;
  //     return ApiResponse.response(res, status, "", message, stack);
  //   };
}
