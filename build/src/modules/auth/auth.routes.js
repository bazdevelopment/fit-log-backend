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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_controllers_1 = require("./auth.controllers");
const auth_schemas_1 = require("./auth.schemas");
const auth_constants_1 = require("./auth.constants");
/**
 * authRoutes
 * This function is responsible for defining authentication-related routes within a Fastify application.
 * In particular, it registers a POST endpoint for user registration, utilizing the `signUpController` to handle the registration process.
 */
const authRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    /* REGISTER USER */
    app.post(auth_constants_1.AUTH_ROUTES.REGISTER_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("signUpUserJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Register the user",
            description: "Endpoint used to register an new user",
        },
    }, auth_controllers_1.signUpController);
    /* LOGIN USER */
    app.post(auth_constants_1.AUTH_ROUTES.LOGIN_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("signInUserJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Login with the created user",
            description: "Endpoint used to login an user",
        },
    }, auth_controllers_1.signInController);
    /* LOGOUT USER */
    app.post(auth_constants_1.AUTH_ROUTES.LOGOUT_ROUTE, {
        schema: {
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "User logout",
            description: "Endpoint to handle user logout by revoking the authentication token.",
        },
    }, auth_controllers_1.signOutController);
    /* VERIFY OTP */
    app.post(auth_constants_1.AUTH_ROUTES.VERIFY_OTP_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("otpVerificationJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Verify OTP code send by email",
            description: "Endpoint to check if the OPT code is valid and not expired",
        },
    }, auth_controllers_1.verifyOtpCodeController);
    /* RESEND OTP */
    app.post(auth_constants_1.AUTH_ROUTES.RESEND_OTP_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("resendOtpCodeJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Resend OTP code via email",
            description: "Endpoint to resend a new OTP code via email",
        },
    }, auth_controllers_1.resendOtpCodeController);
    /*FORGOT PASSWORD */
    app.post(auth_constants_1.AUTH_ROUTES.FORGOT_PASSWORD_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("forgotPasswordJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Forgot password",
            description: "Endpoint to handle forgot password functionality",
        },
    }, auth_controllers_1.forgotPasswordController);
    /* RESET PASSWORD */
    app.post(auth_constants_1.AUTH_ROUTES.RESET_PASSWORD_ROUTE, {
        schema: {
            body: (0, auth_schemas_1.$ref)("resetPasswordJsonSchema"),
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Reset password by providing a new password + confirmation",
            description: "Endpoint to handle reset password functionality",
        },
    }, auth_controllers_1.resetPasswordController);
    /* REFRESH TOKEN */
    app.post(auth_constants_1.AUTH_ROUTES.REFRESH_TOKEN_ROUTE, {
        schema: {
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Refresh token",
            description: "Endpoint to handle refresh token",
        },
    }, auth_controllers_1.refreshTokenController);
    app.post(auth_constants_1.AUTH_ROUTES.CLEANUP_UNVERIFIED_OTP_ACCOUNTS_ROUTE, {
        schema: {
            tags: ["Auth" /* SWAGGER_TAGS.AUTH */],
            summary: "Cleanup unverified OTP user accounts (isVerifiedOtp -> false)",
            description: "Endpoint used to do a cleanup in db for the users that isVerifiedOtp field is false, meaning that the account cannot be verified successfully",
        },
    }, auth_controllers_1.cleanUnverifiedOtpAccountsController);
});
exports.authRoutes = authRoutes;
