import { CustomError } from "./customError";

export class ErrorResponse extends CustomError {
  constructor(public message: string, public statusCode: number = 403) {
    super(message);

    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }
}
