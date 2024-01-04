import { FastifyReply, FastifyRequest } from "fastify";
import {
  IDecodedRefreshToken,
  TForgotPasswordFields,
  TOtpVerification,
  TResendOtpFields,
  TResetPasswordFields,
  TSignInUser,
  TSignUpUserResponse,
  TTSignUpUserWithoutId,
} from "./auth.types";
import {
  getUserByEmail,
  resendOtpCode,
  resetPassword,
  signUpUserService,
  updatePasswordResetToken,
  verifyOtpCode,
} from "./auth.services";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import {
  ICustomError,
  createHttpException,
  createSuccessResponse,
} from "../../utils/httpResponse";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { logoutCookieOptions, tokenCookieOptions } from "./auth.constants";
import { hashField, verifyHashedField } from "../../utils/hash";
import { generateOTPCode } from "../../utils/generateUniqueOtpCode";
import { sendOtpCodeMail } from "../../utils/mail";
import prisma from "../../config/prisma";
import { computeFutureTimestamp } from "../../utils/computeFutureTimestamp";
import { generateForgotPasswordTemplate } from "../../utils/email-templates/forgotPasswordTemplate";
import { sendOtpCodeTemplate } from "../../utils/email-templates/sendOtpCodeTemplate";
import { environmentVariables } from "../../config/environment-variables";
/**
 *  signUpController
 *  This asynchronous function serves as the controller for user registration.
 *  It handles the registration process by checking if the user already exists, uploading an avatar image to Cloudinary (if applicable), adding the user to the database, and creating a JSON Web Token (JWT) for authentication.
 */
export const signUpController = async (
  request: FastifyRequest<{
    Body: TTSignUpUserWithoutId;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email, password, firstName, lastName } = request.body;

  const otpCode = generateOTPCode();

  /** 1. Check if the user already exists in db */
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User already exists!",
      method: "signUpController",
    });
  }

  /* 2. Upload avatar image to cloudinary after the account has been created successfully*/

  /* 3.Add user to database */
  const userUniqueId: string = generateUniqueId();
  const userCreated = await signUpUserService({
    email,
    id: userUniqueId,
    password,
    firstName,
    lastName,
    otpCode,
  });

  /**4. Send email with otp code */

  await sendOtpCodeMail({
    receiverEmail: email,
    subject: "OTP verification code",
    htmlTemplate: sendOtpCodeTemplate(firstName, otpCode),
  });

  return reply.code(HTTP_STATUS_CODE.CREATED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.CREATED,
      message: "User registered successfully!",
      data: userCreated,
    })
  );
};

/**
 * signInController
 * This function serves as the controller for user authentication, handling the process of user sign-in.
 * It checks if the user exists in the database, verifies the entered password, and generates a JWT access token upon successful authentication.
 */

export const signInController = async (
  request: FastifyRequest<{
    Body: TSignInUser;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email, password } = request.body;

  /** 1. Check if the users exists in db, otherwise throw an error */
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User not found!",
      method: "signInController",
    });
  }

  if (!registeredUser.isVerifiedOtp) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User is not verified, check your OTP code on your email!",
      method: "signInController",
    });
  }

  /** 2. Check if the password from db matches the password entered, otherwise throw an error */

  const isPasswordMatching = verifyHashedField(
    password,
    registeredUser.salt,
    registeredUser.password
  );

  if (!isPasswordMatching) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "Passwords doesn't match!",
      method: "signInController",
    });
  }

  /**  generate JWT access token */
  const accessToken: string = request.jwt.sign(
    {
      email,
      id: registeredUser.id,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      otpCode: registeredUser.otpCode,
    },
    { expiresIn: environmentVariables.authentication.jwtAccessTokenExpires }
  );

  const refreshToken: string = request.jwt.sign(
    {
      email,
      id: registeredUser.id,
      firstName: registeredUser.id,
      lastName: registeredUser.lastName,
      otpCode: registeredUser.otpCode,
    },
    { expiresIn: environmentVariables.authentication.jwtRefreshTokenExpires }
  );

  /** 3. In the end return a successful message, token and also user if needed */

  return reply
    .code(HTTP_STATUS_CODE.CREATED)
    .header("Authorization", accessToken)
    .setCookie("refresh_token", refreshToken, tokenCookieOptions)
    .send(
      createSuccessResponse({
        status: HTTP_STATUS_CODE.CREATED,
        message: "Successfully logged in!",
        data: {
          token: accessToken,
        },
      })
    );
};

/**
 *signOutController - controller responsible for logging out the user
 */
export const signOutController = (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply
    .code(HTTP_STATUS_CODE.OK)
    .clearCookie("refresh_token", logoutCookieOptions)
    .header("Authorization", "")
    .send(
      createSuccessResponse({
        status: HTTP_STATUS_CODE.OK,
        message: "Logout successful!",
      })
    );
};

/**
 * The resendOtpCodeController function serves as a controller for resending OTP (One-Time Password) codes to users for email verification.
 */
export const resendOtpCodeController = async (
  request: FastifyRequest<{
    Body: TResendOtpFields;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email } = request.body;
  const newOtpCode = generateOTPCode();
  const { hash: hashNewOtpCode, salt: saltNewOtpCode } = hashField(newOtpCode);

  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User doesn't exist!",
      method: "resendOtpCodeController",
    });
  }

  if (!user.isVerifiedOtp) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message:
        "OTP code cannot be generated because your account has already been verified!",
      method: "resendOtpCodeController",
    });
  }

  await sendOtpCodeMail({
    receiverEmail: email,
    subject: "Resent OTP verification code",
    htmlTemplate: sendOtpCodeTemplate(user.firstName, newOtpCode),
  });

  await resendOtpCode({
    email,
    otpCode: hashNewOtpCode,
    saltOtpCode: saltNewOtpCode,
    otpExpiration: computeFutureTimestamp(10),
  });

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "OTP is resent! Check you email inbox!",
    })
  );
};

/**
 * The verifyOtpCodeController function is a controller responsible for verifying OTP (One-Time Password) codes submitted by users for email verification.
 */
export const verifyOtpCodeController = async (
  request: FastifyRequest<{
    Body: TOtpVerification;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email, otpCode } = request.body;

  const user = await prisma.auth.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User with this email and otpCode doesn't exist!",
      method: "verifyOtpCodeController",
    });
  }
  const isOtpMatching = verifyHashedField(otpCode, user.saltOtp, user.otpCode);

  if (!isOtpMatching) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "OTP does't match, try again!",
      method: "verifyOtpCode",
    });
  }

  const isOtpExpired = new Date() > new Date(user?.otpExpiration!);
  if (isOtpExpired) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "OTP is expired, try again!",
      method: "verifyOtpCodeController",
    });
  }

  await verifyOtpCode(email);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Your OTP code has been successfully verified!",
    })
  );
};

/**
 * Handles the logic for initiating the password reset process by creating a reset token with an expiration time of 10 minutes
 * */
export const forgotPasswordController = async (
  request: FastifyRequest<{
    Body: TForgotPasswordFields;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email } = request.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User doesn't exist!",
      method: "forgotPasswordController",
    });
  }

  if (!user.isVerifiedOtp) {
    return createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message: "This account is not verified!",
      method: "forgotPasswordController",
    });
  }

  const resetOtpToken = generateOTPCode();
  //! consider in the future to hash resetOtpToken
  // const { hash, salt } = hashField(resetOtpToken);

  const userUpdated = (await updatePasswordResetToken({
    email,
    passwordResetToken: resetOtpToken,
    passwordResetExpires: computeFutureTimestamp(10),
  })) as TSignUpUserResponse;

  await sendOtpCodeMail({
    receiverEmail: email,
    subject: "Forgot password",
    htmlTemplate: generateForgotPasswordTemplate(
      userUpdated.firstName,
      resetOtpToken
    ),
  });

  return reply.code(HTTP_STATUS_CODE.CREATED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.CREATED,
      message: "You will receive a reset code email. Please verify your inbox!",
    })
  );
};

/**
 * Handles the logic for resetting the password
 * */
export const resetPasswordController = async (
  request: FastifyRequest<{
    Body: TResetPasswordFields;
  }>,
  reply: FastifyReply
): Promise<void | ICustomError> => {
  const { email, resetToken, password, confirmPassword } = request.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "User doesn't exist!",
      method: "resetPasswordController",
    });
  }

  if (password !== confirmPassword) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "Passwords do not match!",
      method: "resetPasswordController",
    });
  }

  const isResetPasswordTimeExpired =
    new Date() > new Date(user.passwordResetExpires!);
  if (isResetPasswordTimeExpired) {
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "Reset token has expired!",
      method: "resetPasswordController",
    });
  }

  await resetPassword({ email, password, resetToken });

  return reply.code(HTTP_STATUS_CODE.CREATED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.CREATED,
      message: "Your password has been successfully reset!",
    })
  );
};
/**
 * Controller used to generate a new access token based on the lifetime of the refresh token
 */
export const refreshTokenController = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const refreshToken = request.cookies["refresh_token"];
    if (!refreshToken) {
      return createHttpException({
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        message: "Access Denied. No refresh token provided'!",
        method: "refreshTokenController",
      });
    }

    const decodedRefreshToken: IDecodedRefreshToken =
      request.jwt.verify(refreshToken);

    const newAccessToken = request.jwt.sign(
      {
        email: decodedRefreshToken.email,
        id: decodedRefreshToken.id,
        firstName: decodedRefreshToken.firstName,
        lastName: decodedRefreshToken.lastName,
        otpCode: decodedRefreshToken.otpCode,
      },
      {
        expiresIn: environmentVariables.authentication.jwtAccessTokenExpires,
      }
    );

    return reply
      .code(HTTP_STATUS_CODE.CREATED)
      .header("Authorization", newAccessToken)
      .setCookie("refresh_token", refreshToken, tokenCookieOptions)
      .send(
        createSuccessResponse({
          status: HTTP_STATUS_CODE.CREATED,
          message: "Successfully refresh token!",
        })
      );
  } catch (error: unknown) {
    const errorResponse = error as ICustomError;
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "resetPasswordController",
    });
  }
};
