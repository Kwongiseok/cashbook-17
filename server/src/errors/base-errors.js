export class ApplicationError extends Error {
  get name() {
    return this.constructor.name;
  }
}

export class UserFacingError extends ApplicationError {}

export class DatabaseError extends ApplicationError {
  constructor(message, options = {}) {
    super(message);
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  get statusCode() {
    return 503;
  }
}
