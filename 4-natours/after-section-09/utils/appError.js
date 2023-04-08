class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // only handle operational error

    // capture the stack trace
    // what is stack trace : error.stack show where the error happen
    // ? not add this class to stack trace ??? -- not pollute the stack trace, not show this class in stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
