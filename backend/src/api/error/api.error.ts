export class ApiError extends Error {
  status: number;
  errors: [];

  constructor(status: number, message: string, errors: [] = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message: string = 'User unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}
