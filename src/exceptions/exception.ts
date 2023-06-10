export class Exception extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, Exception.prototype);
  }
}
