import z from "zod";
import {
  emailSchema,
  otpVerificationSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  signInUserSchema,
  signUpUserResponse,
  signUpUserSchema,
} from "./auth.schemas";

export type TSignUpUser = z.infer<typeof signUpUserSchema>;
export type TTSignUpUserWithoutId = Omit<TSignUpUser, "id">;
export type TSignUpUserResponse = z.infer<typeof signUpUserResponse>;
export type TSignInUser = z.infer<typeof signInUserSchema>;
export type TOtpVerification = z.infer<typeof otpVerificationSchema>;
export type TResetPasswordFields = z.infer<typeof resetPasswordSchema>;
export type TForgotPasswordFields = z.infer<typeof emailSchema>;
export type TResendOtpFields = z.infer<typeof emailSchema>;
export type TRefreshTokenBody = z.infer<typeof refreshTokenSchema>;

export interface IEncodedToken {
  email: string;
  id: string;
  userName: string;
  role: string;
}

export interface IDecodedRefreshToken extends IEncodedToken {
  iat: number;
  exp: number;
}
