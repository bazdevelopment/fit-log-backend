import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const signUpUserFields = {
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
};

export const signUpUserSchema = z.object({
  ...signUpUserFields,
  password: z.string().min(6),
  otpCode: z.string().optional(),
});

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpUserResponse = z.object({
  ...signUpUserFields,
  password: z.string().min(6),
  salt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  passwordResetToken: z.string().nullable(),
  passwordResetExpires: z.date().nullable(),
  otpCode: z.string(),
  isVerifiedOtp: z.boolean(),
  otpExpiration: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  otpCode: z.string().min(6).max(6),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  resetToken: z.string().min(6).max(6),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const emailSchema = z.object({
  email: z.string().email(),
});

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    signUpUserJsonSchema: signUpUserSchema.omit({ id: true, otpCode: true }),
    signInUserJsonSchema: signInUserSchema,
    otpVerificationJsonSchema: otpVerificationSchema,
    forgotPasswordJsonSchema: emailSchema,
    resendOtpCodeJsonSchema: emailSchema,
    resetPasswordJsonSchema: resetPasswordSchema,
  },
  { $id: "authSchema" }
);
