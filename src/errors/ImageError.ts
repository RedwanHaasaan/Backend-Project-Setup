class ImageError extends Error {
  hints?: string;
  constructor(message: string, hints?: string, name: string = 'ImageError') {
    super(message);
    this.name = name;
    this.hints = hints;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ImageError;
