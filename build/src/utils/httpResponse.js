"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = exports.createHttpException = void 0;
/**
 * This function is a utility for creating custom HTTP exceptions by throwing an error with a specified HTTP status code and error message.
 */
const createHttpException = ({ status, message, method, }) => {
    const error = new Error(message);
    error.statusCode = status;
    error.response = {
        success: false,
        message,
        statusCode: status,
        failMethod: method !== null && method !== void 0 ? method : "",
    };
    throw error.response;
};
exports.createHttpException = createHttpException;
/**
 * This function is a utility for creating custom success response returned by the server
 */
const createSuccessResponse = ({ status, message, data, }) => ({
    success: true,
    statusCode: status,
    message: message !== null && message !== void 0 ? message : "",
    data,
});
exports.createSuccessResponse = createSuccessResponse;
