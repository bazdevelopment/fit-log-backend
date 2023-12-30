import { FastifyInstance } from "fastify";
import {
  forgotPasswordController,
  resendOtpCodeController,
  resetPasswordController,
  signInController,
  signOutController,
  signUpController,
  verifyOtpCodeController,
} from "./auth.controllers";
import {
  forgotPasswordJsonSchema,
  otpVerificationJsonSchema,
  resendOtpCodeJsonSchema,
  resetPasswordJsonSchema,
  signInUserJsonSchema,
  signUpUserJsonSchema,
} from "./auth.schemas";

/**
 * authRoutes
 * This function is responsible for defining authentication-related routes within a Fastify application.
 * In particular, it registers a POST endpoint for user registration, utilizing the `signUpController` to handle the registration process.
 */
export const authRoutes = async (app: FastifyInstance) => {
  /* REGISTER USER */
  app.post(
    "/register",
    { schema: { body: signUpUserJsonSchema.body } },
    signUpController
  );
  /* LOGIN USER */
  app.post(
    "/login",
    {
      preHandler: [app.authenticate],
      schema: { body: signInUserJsonSchema.body },
    },
    signInController
  );

  /* LOGOUT USER */
  app.post("/logout", signOutController);
  /* VERIFY OTP */
  app.post(
    "/verify-otp",
    {
      schema: { body: otpVerificationJsonSchema.body },
    },
    verifyOtpCodeController
  );
  /* RESEND OTP */
  app.post(
    "/resend-otp",
    { schema: { body: resendOtpCodeJsonSchema.body } },
    resendOtpCodeController
  );

  /*FORGOT PASSWORD */
  app.post(
    "/forgot-password",
    { schema: { body: forgotPasswordJsonSchema.body } },
    forgotPasswordController
  );

  /* RESET PASSWORD */
  app.post(
    "/reset-password",
    { schema: { body: resetPasswordJsonSchema.body } },
    resetPasswordController
  );
};
