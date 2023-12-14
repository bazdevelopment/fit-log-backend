interface CustomError extends Error {
  statusCode?: number;
}

/**
 * This function is a utility for creating custom HTTP exceptions by throwing an error with a specified HTTP status code and error message.
 */
export const createHttpException = (status: number, message: string): void => {
  const error: CustomError = new Error(message);
  error.statusCode = status;
  throw error;
};
