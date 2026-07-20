class CustomAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "Unauthorized";
  }
}

export { CustomAuthorizationError };
