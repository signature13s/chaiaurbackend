class ApiError extends Error {
  statusCode: any;
  data: any;
  override message: string;
  success: boolean;
  errors: any;

  constructor(
    statusCode: any,
    message = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
