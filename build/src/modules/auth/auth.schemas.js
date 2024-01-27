"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.authSchemas = exports.emailSchema = exports.resetPasswordSchema = exports.otpVerificationSchema = exports.signUpUserResponse = exports.signInUserSchema = exports.signUpUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
const signUpUserFields = {
    id: zod_1.default.string(),
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string().min(2),
    lastName: zod_1.default.string().min(2),
};
exports.signUpUserSchema = zod_1.default.object(Object.assign(Object.assign({}, signUpUserFields), { password: zod_1.default.string().min(6), otpCode: zod_1.default.string().optional() }));
exports.signInUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.signUpUserResponse = zod_1.default.object(Object.assign(Object.assign({}, signUpUserFields), { password: zod_1.default.string().min(6), salt: zod_1.default.string(), firstName: zod_1.default.string(), lastName: zod_1.default.string(), passwordResetToken: zod_1.default.string().nullable(), passwordResetExpires: zod_1.default.date().nullable(), otpCode: zod_1.default.string(), isVerifiedOtp: zod_1.default.boolean(), otpExpiration: zod_1.default.date().nullable(), createdAt: zod_1.default.date(), updatedAt: zod_1.default.date() }));
exports.otpVerificationSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otpCode: zod_1.default.string().min(6).max(6),
});
exports.resetPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    resetToken: zod_1.default.string().min(6).max(6),
    password: zod_1.default.string().min(6),
    confirmPassword: zod_1.default.string().min(6),
});
exports.emailSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    signUpUserJsonSchema: exports.signUpUserSchema.omit({ id: true, otpCode: true }),
    signInUserJsonSchema: exports.signInUserSchema,
    otpVerificationJsonSchema: exports.otpVerificationSchema,
    forgotPasswordJsonSchema: exports.emailSchema,
    resendOtpCodeJsonSchema: exports.emailSchema,
    resetPasswordJsonSchema: exports.resetPasswordSchema,
}, { $id: "authSchema" }), exports.authSchemas = _a.schemas, exports.$ref = _a.$ref;
