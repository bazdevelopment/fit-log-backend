"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ROUTES = exports.logoutCookieOptions = exports.tokenCookieOptions = void 0;
const environment_variables_1 = require("../../config/environment-variables");
/**
 * maxAge - This option sets the maximum age of the cookie in milliseconds. It determines how long the cookie will be valid
 * secure:true - This option indicates whether the cookie should only be sent over secure HTTPS connections. Setting it to true means the cookie will only be sent if the connection is secure.
 * httpOnly:true - When set to true, this option prevents the cookie from being accessed through JavaScript. It's a security measure to mitigate certain types of cross-site scripting (XSS) attacks.
 * path:/ - Specifies the path for which the cookie is valid. In this case, it's set to the root path ("/"), meaning the cookie is valid for the entire domain.
 * maxAge - 0 - This is set to 0, which means the cookie will expire immediately. Essentially, setting maxAge to 0 is a way to delete a cookie when the browser receives it.
 */
exports.tokenCookieOptions = {
    maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
    secure: environment_variables_1.environmentVariables.default.nodeEnvironment === "production",
    httpOnly: true,
    path: "/",
    // signed: true, //this value produce the error when jwt.decode method is called- The token payload is not a valid base64url serialized JSON
    domain: "localhost",
    sameSite: "strict",
};
exports.logoutCookieOptions = {
    maxAge: 0,
    path: "/",
};
const REGISTER_ROUTE = "/register";
const LOGIN_ROUTE = "/login";
const LOGOUT_ROUTE = "/logout";
const VERIFY_OTP_ROUTE = "/verify-otp";
const RESEND_OTP_ROUTE = "/resend-otp";
const FORGOT_PASSWORD_ROUTE = "/forgot-password";
const RESET_PASSWORD_ROUTE = "/reset-password";
const REFRESH_TOKEN_ROUTE = "/refresh-token";
const CLEANUP_UNVERIFIED_OTP_ACCOUNTS_ROUTE = "/cleanup-otp-users";
exports.AUTH_ROUTES = {
    REGISTER_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    VERIFY_OTP_ROUTE,
    RESEND_OTP_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    REFRESH_TOKEN_ROUTE,
    CLEANUP_UNVERIFIED_OTP_ACCOUNTS_ROUTE,
};
