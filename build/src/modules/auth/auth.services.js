"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUnverifiedOtpAccounts = exports.resetPassword = exports.updatePasswordResetToken = exports.createUserProfile = exports.verifyOtpCode = exports.resendOtpCode = exports.getUserByEmail = exports.signUpUserService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const computeFutureTimestamp_1 = require("../../utils/computeFutureTimestamp");
const httpResponse_1 = require("../../utils/httpResponse");
const hash_1 = require("../../utils/hash");
/**
 * signUpUserService
 * This asynchronous function is responsible for register a new user account in the database.
 * It takes a `userInfo` object as a parameter, which represents the details of the user to be registered.
 * The function returns a Promise that resolves to a `TSignUpUserResponse` if the user is successfully created, or resolves to `void` if there is an error during the process.
 *
 */
const signUpUserService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, otpCode } = userInfo, restUserInfo = __rest(userInfo, ["password", "otpCode"]);
        const { hash, salt } = (0, hash_1.hashField)(password);
        const { hash: hashOtp, salt: saltOtp } = (0, hash_1.hashField)(otpCode);
        const result = yield prisma_1.default.auth.create({
            data: Object.assign(Object.assign({}, restUserInfo), { password: hash, salt, otpCode: hashOtp, saltOtp, otpExpiration: (0, computeFutureTimestamp_1.computeFutureTimestamp)(10) }),
        });
        return result;
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "signUpUserService",
        });
    }
});
exports.signUpUserService = signUpUserService;
/**
 *  getUserByEmail
 *  This asynchronous function retrieves user information from the database based on the provided email.
 *  It takes an `email` parameter and returns a Promise that resolves to a `TSignUpUserResponse` representing the user if found,
 *  or resolves to `null` if the user is not found.
 *  In case of an error, the Promise resolves to `void`, and an HTTP exception is generated using `createHttpException`.
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.auth.findUnique({
            where: {
                email,
            },
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getUserByEmail",
        });
    }
});
exports.getUserByEmail = getUserByEmail;
/**
 * resendOtpCode function is responsible for updating the OTP (One-Time Password) code and its expiration timestamp for a user identified by their email in the database.
 * email (string): The email address of the user for whom the OTP code is being updated.
 * otpCode (string): The new OTP code to be associated with the user.
 * otpExpiration (Date): The expiration timestamp for the OTP code.
 */
const resendOtpCode = ({ email, otpCode, otpExpiration, saltOtpCode, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.auth.update({
            where: {
                email,
            },
            data: {
                otpCode,
                saltOtp: saltOtpCode,
                otpExpiration,
            },
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "resendOtpCode",
        });
    }
});
exports.resendOtpCode = resendOtpCode;
/**
 * verifyOtpCode service function is responsible for updating the verification status of the OTP (One-Time Password) for a user identified by their email in the database.
 */
const verifyOtpCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = yield prisma_1.default.auth.update({
            where: {
                email,
            },
            data: {
                isVerifiedOtp: true,
            },
        });
        return createdUser;
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "verifyOtpCode",
        });
    }
});
exports.verifyOtpCode = verifyOtpCode;
/**
 * Create the user profile and update users table after OTP verification has been done
 *
 *  */
const createUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.user.create({
            data: {
                userId,
            },
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "createUserProfile",
        });
    }
});
exports.createUserProfile = createUserProfile;
/***
 *  updatePasswordResetToken service function is responsible for saving in db the reset token and the expiration time
 */
const updatePasswordResetToken = ({ email, passwordResetToken, passwordResetExpires, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.auth.update({
            where: {
                email,
            },
            data: {
                passwordResetToken,
                passwordResetExpires,
            },
        });
    }
    catch (error) {
        throw (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "The passwordResetToken & passwordResetExpires cannot be updated!",
            method: "updatePasswordReset",
        });
    }
});
exports.updatePasswordResetToken = updatePasswordResetToken;
/**
 * resetPassword service function is used for resetting the user's password and saving new credentials in db
 * after resetting the password, the resetToken and expiration time will be null
 */
const resetPassword = ({ email, resetToken, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hash: hashPassword, salt: saltPassword } = (0, hash_1.hashField)(password);
        const { hash: hashOtp, salt: saltOtp } = (0, hash_1.hashField)(resetToken);
        return yield prisma_1.default.auth.update({
            where: {
                email,
            },
            data: {
                otpCode: hashOtp,
                saltOtp,
                password: hashPassword,
                salt: saltPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
    }
    catch (error) {
        throw (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "Cannot change password!",
            method: "resetPassword",
        });
    }
});
exports.resetPassword = resetPassword;
/**
 * This method is responsible for cleaning up unverified OTP (One-Time Password) accounts in the authentication system.
 * It uses Prisma to delete records from the 'auth' database table where the 'isVerifiedOtp' field is set to false.
 */
const cleanUnverifiedOtpAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.auth.deleteMany({
            where: {
                isVerifiedOtp: false,
            },
        });
    }
    catch (error) {
        throw (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "Cleanup unverified OTP accounts not working!",
            method: "cleanUnverifiedOtpAccounts",
        });
    }
});
exports.cleanUnverifiedOtpAccounts = cleanUnverifiedOtpAccounts;
