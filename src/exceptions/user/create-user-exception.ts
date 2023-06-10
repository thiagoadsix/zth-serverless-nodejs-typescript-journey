import { ErrorCodes } from "../error-codes";

export class CreateUserException extends Error {
  code: ErrorCodes;

  constructor(code: ErrorCodes, message: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, CreateUserException.prototype);
  }
}
