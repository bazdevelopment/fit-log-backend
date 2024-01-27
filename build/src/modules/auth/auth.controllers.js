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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUnverifiedOtpAccountsController = exports.refreshTokenController = exports.resetPasswordController = exports.forgotPasswordController = exports.verifyOtpCodeController = exports.resendOtpCodeController = exports.signOutController = exports.signInController = exports.signUpController = void 0;
const auth_services_1 = require("./auth.services");
const httpResponse_1 = require("../../utils/httpResponse");
const generateUniqueId_1 = require("../../utils/generateUniqueId");
const auth_constants_1 = require("./auth.constants");
const hash_1 = require("../../utils/hash");
const generateUniqueOtpCode_1 = require("../../utils/generateUniqueOtpCode");
const mail_1 = require("../../utils/mail");
const prisma_1 = __importDefault(require("../../config/prisma"));
const computeFutureTimestamp_1 = require("../../utils/computeFutureTimestamp");
const forgotPasswordTemplate_1 = require("../../utils/email-templates/forgotPasswordTemplate");
const sendOtpCodeTemplate_1 = require("../../utils/email-templates/sendOtpCodeTemplate");
const environment_variables_1 = require("../../config/environment-variables");
const generate_tokens_1 = require("../../utils/generate-tokens");
const permissions_1 = require("../../config/permissions");
const user_role_1 = require("../../enums/user-role");
const role_services_1 = require("../role/role.services");
/**
 *  signUpController
 *  This asynchronous function serves as the controller for user registration.
 *  It handles the registration process by checking if the user already exists, uploading an avatar image to Cloudinary (if applicable), adding the user to the database, and creating a JSON Web Token (JWT) for authentication.
 */
const signUpController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = request.body;
    const otpCode = (0, generateUniqueOtpCode_1.generateOTPCode)();
    /** 1. Check if the user already exists in db */
    const existingUser = yield (0, auth_services_1.getUserByEmail)(email);
    if (existingUser) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User already exists!",
            method: "signUpController",
        });
    }
    /* 2. Upload avatar image to cloudinary after the account has been created successfully*/
    /* 3.Add user to database */
    const userUniqueId = (0, generateUniqueId_1.generateUniqueId)();
    const userCreated = yield (0, auth_services_1.signUpUserService)({
        email,
        id: userUniqueId,
        password,
        firstName,
        lastName,
        otpCode,
    });
    /**4. Send email with otp code */
    yield (0, mail_1.sendOtpCodeMail)({
        receiverEmail: email,
        subject: "OTP verification code",
        htmlTemplate: (0, sendOtpCodeTemplate_1.sendOtpCodeTemplate)(firstName, otpCode),
    });
    return reply.code(201 /* HTTP_STATUS_CODE.CREATED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 201 /* HTTP_STATUS_CODE.CREATED */,
        message: "User registered successfully!",
        data: userCreated,
    }));
});
exports.signUpController = signUpController;
/**
 * signInController
 * This function serves as the controller for user authentication, handling the process of user sign-in.
 * It checks if the user exists in the database, verifies the entered password, and generates a JWT access token upon successful authentication.
 */
const signInController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    /** 1. Check if the users exists in db, otherwise throw an error */
    const registeredUser = yield (0, auth_services_1.getUserByEmail)(email);
    if (!registeredUser) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User not found!",
            method: "signInController",
        });
    }
    if (!registeredUser.isVerifiedOtp) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User is not verified, check your OTP code on your email!",
            method: "signInController",
        });
    }
    /** 2. Check if the password from db matches the password entered, otherwise throw an error */
    const isPasswordMatching = (0, hash_1.verifyHashedField)(password, registeredUser.salt, registeredUser.password);
    if (!isPasswordMatching) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "Passwords doesn't match!",
            method: "signInController",
        });
    }
    const userRole = permissions_1.ADMIN_EMAILS.includes(email)
        ? user_role_1.USER_ROLE.ADMIN
        : user_role_1.USER_ROLE.USER;
    /**  generate JWT access token/ refresh token */
    const { accessToken, refreshToken } = (0, generate_tokens_1.generateTokens)({
        request,
        userInfo: {
            email,
            id: registeredUser.id,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            role: userRole,
        },
        expiresAccessToken: environment_variables_1.environmentVariables.authentication.jwtAccessTokenExpires,
        expiresRefreshToken: environment_variables_1.environmentVariables.authentication.jwtRefreshTokenExpires,
    });
    /** 3. In the end return a successful message, token and also user if needed */
    return reply
        .code(201 /* HTTP_STATUS_CODE.CREATED */)
        .header("Authorization", accessToken)
        .setCookie("refresh_token", refreshToken !== null && refreshToken !== void 0 ? refreshToken : "", auth_constants_1.tokenCookieOptions)
        .send((0, httpResponse_1.createSuccessResponse)({
        status: 201 /* HTTP_STATUS_CODE.CREATED */,
        message: "Successfully logged in!",
        data: {
            token: accessToken,
        },
    }));
});
exports.signInController = signInController;
/**
 *signOutController - controller responsible for logging out the user
 */
const signOutController = (_request, reply) => {
    return reply
        .code(200 /* HTTP_STATUS_CODE.OK */)
        .clearCookie("refresh_token", auth_constants_1.logoutCookieOptions)
        .header("Authorization", "")
        .send((0, httpResponse_1.createSuccessResponse)({
        status: 200 /* HTTP_STATUS_CODE.OK */,
        message: "Logout successful!",
    }));
};
exports.signOutController = signOutController;
/**
 * The resendOtpCodeController function serves as a controller for resending OTP (One-Time Password) codes to users for email verification.
 */
const resendOtpCodeController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const newOtpCode = (0, generateUniqueOtpCode_1.generateOTPCode)();
    const { hash: hashNewOtpCode, salt: saltNewOtpCode } = (0, hash_1.hashField)(newOtpCode);
    const user = yield (0, auth_services_1.getUserByEmail)(email);
    if (!user) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User doesn't exist!",
            method: "resendOtpCodeController",
        });
    }
    if (!user.isVerifiedOtp) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "OTP code cannot be generated because your account has already been verified!",
            method: "resendOtpCodeController",
        });
    }
    yield (0, mail_1.sendOtpCodeMail)({
        receiverEmail: email,
        subject: "Resent OTP verification code",
        htmlTemplate: (0, sendOtpCodeTemplate_1.sendOtpCodeTemplate)(user.firstName, newOtpCode),
    });
    yield (0, auth_services_1.resendOtpCode)({
        email,
        otpCode: hashNewOtpCode,
        saltOtpCode: saltNewOtpCode,
        otpExpiration: (0, computeFutureTimestamp_1.computeFutureTimestamp)(10),
    });
    return reply.code(200 /* HTTP_STATUS_CODE.OK */).send((0, httpResponse_1.createSuccessResponse)({
        status: 200 /* HTTP_STATUS_CODE.OK */,
        message: "OTP is resent! Check you email inbox!",
    }));
});
exports.resendOtpCodeController = resendOtpCodeController;
/**
 * The verifyOtpCodeController function is a controller responsible for verifying OTP (One-Time Password) codes submitted by users for email verification.
 */
const verifyOtpCodeController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otpCode } = request.body;
    const user = yield prisma_1.default.auth.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User with this email and otpCode doesn't exist!",
            method: "verifyOtpCodeController",
        });
    }
    const isOtpMatching = (0, hash_1.verifyHashedField)(otpCode, user.saltOtp, user.otpCode);
    const isOtpExpired = new Date() > new Date(user === null || user === void 0 ? void 0 : user.otpExpiration);
    /** check in the list of admin emails and assign a proper role */
    const userRole = permissions_1.ADMIN_EMAILS.includes(user.email)
        ? user_role_1.USER_ROLE.ADMIN
        : user_role_1.USER_ROLE.USER;
    const role = yield (0, role_services_1.getRoleByName)(userRole);
    if (!isOtpMatching) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "OTP does't match, try again!",
            method: "verifyOtpCode",
        });
    }
    if (isOtpExpired) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "OTP is expired, try again!",
            method: "verifyOtpCodeController",
        });
    }
    if (!role) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "The role doesn't exist!",
            method: "verifyOtpCodeController",
        });
    }
    const verifiedOtpUser = yield (0, auth_services_1.verifyOtpCode)(email);
    if (verifiedOtpUser.isVerifiedOtp) {
        /*crete the user profile only if the otp code is verified by email */
        yield (0, auth_services_1.createUserProfile)(verifiedOtpUser.id);
        /* assign a role to the user only if the user account is verified otp*/
        yield (0, role_services_1.assignRoleToUser)(role.id, user.id);
    }
    return reply.code(200 /* HTTP_STATUS_CODE.OK */).send((0, httpResponse_1.createSuccessResponse)({
        status: 200 /* HTTP_STATUS_CODE.OK */,
        message: "Your OTP code has been successfully verified!",
    }));
});
exports.verifyOtpCodeController = verifyOtpCodeController;
/**
 * Handles the logic for initiating the password reset process by creating a reset token with an expiration time of 10 minutes
 * */
const forgotPasswordController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield (0, auth_services_1.getUserByEmail)(email);
    if (!user) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User doesn't exist!",
            method: "forgotPasswordController",
        });
    }
    if (!user.isVerifiedOtp) {
        return (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "This account is not verified!",
            method: "forgotPasswordController",
        });
    }
    const resetOtpToken = (0, generateUniqueOtpCode_1.generateOTPCode)();
    //! consider in the future to hash resetOtpToken
    // const { hash, salt } = hashField(resetOtpToken);
    const userUpdated = (yield (0, auth_services_1.updatePasswordResetToken)({
        email,
        passwordResetToken: resetOtpToken,
        passwordResetExpires: (0, computeFutureTimestamp_1.computeFutureTimestamp)(10),
    }));
    yield (0, mail_1.sendOtpCodeMail)({
        receiverEmail: email,
        subject: "Forgot password",
        htmlTemplate: (0, forgotPasswordTemplate_1.generateForgotPasswordTemplate)(userUpdated.firstName, resetOtpToken),
    });
    return reply.code(201 /* HTTP_STATUS_CODE.CREATED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 201 /* HTTP_STATUS_CODE.CREATED */,
        message: "You will receive a reset code email. Please verify your inbox!",
    }));
});
exports.forgotPasswordController = forgotPasswordController;
/**
 * Handles the logic for resetting the password
 * */
const resetPasswordController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, resetToken, password, confirmPassword } = request.body;
    const user = yield (0, auth_services_1.getUserByEmail)(email);
    if (!user) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "User doesn't exist!",
            method: "resetPasswordController",
        });
    }
    if (password !== confirmPassword) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "Passwords do not match!",
            method: "resetPasswordController",
        });
    }
    const isResetPasswordTimeExpired = new Date() > new Date(user.passwordResetExpires);
    if (isResetPasswordTimeExpired) {
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: "Reset token has expired!",
            method: "resetPasswordController",
        });
    }
    yield (0, auth_services_1.resetPassword)({ email, password, resetToken });
    return reply.code(201 /* HTTP_STATUS_CODE.CREATED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 201 /* HTTP_STATUS_CODE.CREATED */,
        message: "Your password has been successfully reset!",
    }));
});
exports.resetPasswordController = resetPasswordController;
/**
 * Controller used to generate a new access token based on the lifetime of the refresh token
 */
const refreshTokenController = (request, reply) => {
    try {
        const refreshToken = request.cookies["refresh_token"];
        if (!refreshToken) {
            return (0, httpResponse_1.createHttpException)({
                status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
                message: "Access Denied. No refresh token provided'!",
                method: "refreshTokenController",
            });
        }
        const decodedRefreshToken = request.jwt.verify(refreshToken);
        const { accessToken: newAccessToken } = (0, generate_tokens_1.generateTokens)({
            request,
            userInfo: {
                email: decodedRefreshToken.email,
                id: decodedRefreshToken.id,
                firstName: decodedRefreshToken.firstName,
                lastName: decodedRefreshToken.lastName,
                role: decodedRefreshToken.role,
            },
            expiresAccessToken: environment_variables_1.environmentVariables.authentication.jwtAccessTokenExpires,
        });
        return reply
            .code(201 /* HTTP_STATUS_CODE.CREATED */)
            .header("Authorization", newAccessToken)
            .setCookie("refresh_token", refreshToken, auth_constants_1.tokenCookieOptions)
            .send((0, httpResponse_1.createSuccessResponse)({
            status: 201 /* HTTP_STATUS_CODE.CREATED */,
            message: "Successfully refresh token!",
        }));
    }
    catch (error) {
        const errorResponse = error;
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "resetPasswordController",
        });
    }
};
exports.refreshTokenController = refreshTokenController;
/**
 * Controller used to delete unverified OTP user accounts
 */
const cleanUnverifiedOtpAccountsController = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_services_1.cleanUnverifiedOtpAccounts)();
        reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
            status: 201 /* HTTP_STATUS_CODE.CREATED */,
            message: "Successfully deleted unverified otp accounts!",
        }));
    }
    catch (error) {
        const errorResponse = error;
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "cleanUnverifiedOtpAccountsController",
        });
    }
});
exports.cleanUnverifiedOtpAccountsController = cleanUnverifiedOtpAccountsController;
