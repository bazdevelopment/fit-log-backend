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
import { $ref } from "./auth.schemas";
import { SWAGGER_TAGS } from "../../enums/SwaggerTags";

/**
 * authRoutes
 * This function is responsible for defining authentication-related routes within a Fastify application.
 * In particular, it registers a POST endpoint for user registration, utilizing the `signUpController` to handle the registration process.
 */
export const authRoutes = async (app: FastifyInstance) => {
  /* REGISTER USER */
  app.post(
    "/register",
    {
      schema: {
        body: $ref("signUpUserJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Register the user",
        description: "Endpoint used to register an new user",
      },
    },
    signUpController
  );
  /* LOGIN USER */
  app.post(
    "/login",
    {
      // preHandler: [app.authenticate],
      schema: {
        body: $ref("signInUserJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Login with the created user",
        description: "Endpoint used to login an user",
      },
    },
    signInController
  );

  /* LOGOUT USER */
  app.post(
    "/logout",
    {
      schema: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "User logout",
        description:
          "Endpoint to handle user logout by revoking the authentication token.",
      },
    },
    signOutController
  );
  /* VERIFY OTP */
  app.post(
    "/verify-otp",
    {
      schema: {
        body: $ref("otpVerificationJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Verify OTP code send by email",
        description:
          "Endpoint to check if the OPT code is valid and not expired",
      },
    },
    verifyOtpCodeController
  );
  /* RESEND OTP */
  app.post(
    "/resend-otp",
    {
      schema: {
        body: $ref("resendOtpCodeJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Resend OTP code via email",
        description: "Endpoint to resend a new OTP code via email",
      },
    },
    resendOtpCodeController
  );

  /*FORGOT PASSWORD */
  app.post(
    "/forgot-password",
    {
      schema: {
        body: $ref("forgotPasswordJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Forgot password",
        description: "Endpoint to handle forgot password functionality",
      },
    },
    forgotPasswordController
  );

  /* RESET PASSWORD */
  app.post(
    "/reset-password",
    {
      schema: {
        body: $ref("resetPasswordJsonSchema"),
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Reset password by providing a new password + confirmation",
        description: "Endpoint to handle reset password functionality",
      },
    },
    resetPasswordController
  );
};
