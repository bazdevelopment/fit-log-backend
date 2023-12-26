import { FastifyInstance } from "fastify";
import {
  resendOtpCodeController,
  signInController,
  signOutController,
  signUpController,
  verifyOtpCodeController,
} from "./auth.controllers";
import {
  otpVerificationJsonSchema,
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
      schema: { body: signInUserJsonSchema.body },
    },
    signInController
  );

  /* LOGOUT USER */
  app.post("/logout", signOutController);
  /* VERIFY OTP */
  app.post(
    "/verify-otp",
    { schema: { body: otpVerificationJsonSchema.body } },
    verifyOtpCodeController
  );
  /* RESEND OTP */
  app.post("/resend-otp", {}, resendOtpCodeController);
};
