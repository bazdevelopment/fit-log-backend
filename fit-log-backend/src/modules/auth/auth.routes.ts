import { FastifyInstance } from "fastify";
import {
  forgotPasswordController,
  refreshTokenController,
  resendOtpCodeController,
  resetPasswordController,
  signInController,
  signOutController,
  signUpController,
  verifyOtpCodeController,
} from "./auth.controllers";
import { $ref } from "./auth.schemas";
import { SWAGGER_TAGS } from "../../enums/swagger-tags";
import { AUTH_ROUTES } from "./auth.constants";

/**
 * authRoutes
 * This function is responsible for defining authentication-related routes within a Fastify application.
 * In particular, it registers a POST endpoint for user registration, utilizing the `signUpController` to handle the registration process.
 */
export const authRoutes = async (app: FastifyInstance) => {
  /* REGISTER USER */
  app.post(
    AUTH_ROUTES.REGISTER_ROUTE,
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
    AUTH_ROUTES.LOGIN_ROUTE,
    {
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
    AUTH_ROUTES.LOGOUT_ROUTE,
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
    AUTH_ROUTES.VERIFY_OTP_ROUTE,
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
    AUTH_ROUTES.RESEND_OTP_ROUTE,
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
    AUTH_ROUTES.FORGOT_PASSWORD_ROUTE,
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
    AUTH_ROUTES.RESET_PASSWORD_ROUTE,
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

  /* REFRESH TOKEN */
  app.post(
    AUTH_ROUTES.REFRESH_TOKEN_ROUTE,
    {
      schema: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Refresh token ",
        description: "Endpoint to handle refresh token",
      },
    },
    refreshTokenController
  );
};
