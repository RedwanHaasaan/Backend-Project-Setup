class EmailError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default EmailError;
