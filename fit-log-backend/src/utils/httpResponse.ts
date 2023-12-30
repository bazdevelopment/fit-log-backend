interface ICustomError extends Error {
  statusCode?: number;
  response?: {
    success: boolean;
    message: string;
    statusCode: number;
    failMethod: string;
  };
}

interface ISuccessResponse {
  success: true;
  statusCode: number;
  message: string;
  data?: { [key: string]: any };
}

/**
 * This function is a utility for creating custom HTTP exceptions by throwing an error with a specified HTTP status code and error message.
 */
export const createHttpException = ({
  status,
  message,
  method,
}: {
  status: number;
  message: string;
  method?: string;
}): void => {
  const error: ICustomError = new Error(message);
  error.statusCode = status;

  error.response = {
    success: false,
    message,
    statusCode: status,
    failMethod: method ?? "",
  };

  throw error.response;
};

/**
 * This function is a utility for creating custom success response returned by the server
 */
export const createSuccessResponse = ({
  status,
  message,
  data,
}: {
  status: number;
  message?: string;
  data?: any;
}): ISuccessResponse => ({
  success: true,
  statusCode: status,
  message: message ?? "",
  data,
});
