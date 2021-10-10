class DataBaseConnectionError extends Error {
  constructor() {
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // set the error code message
    this.code = "DB_CONNECTION_ERROR";

    // set the error message
    this.message = "Error connecting to the database";

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = DataBaseConnectionError;
