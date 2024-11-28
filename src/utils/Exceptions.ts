class TINException extends Error {
  constructor(msg: string) {
    super(msg); // Call the parent class (Error) constructor
    this.name = "TINException"; // Set the name of the error
    Object.setPrototypeOf(this, TINException.prototype); // Fix prototype chain for instanceof
  }
}

class NullException extends Error {
  constructor(msg: string) {
    super(msg); // Call the parent class (TINException) constructor
    this.name = "NullException"; // Set the name of the error
    Object.setPrototypeOf(this, NullException.prototype); // Fix prototype chain for instanceof
  }
}

class NegativeNumberException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NegativeNumberException";
    Object.setPrototypeOf(this, NegativeNumberException.prototype); // Fix prototype chain for instanceof
  }
}

class InvalidTINLengthException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NegativeNumberException";
    Object.setPrototypeOf(this, NegativeNumberException.prototype); // Fix prototype chain for instanceof
  }
}

export { TINException, NegativeNumberException, NullException, InvalidTINLengthException };
