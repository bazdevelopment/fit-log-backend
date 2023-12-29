import { FastifyReply, FastifyRequest } from "fastify";
import {
  TForgotPasswordFields,
  TOtpVerification,
  TResendOtpFields,
  TResetPasswordFields,
  TSignInUser,
  TTSignUpUserWithoutId,
} from "./auth.types";
import {
  getUserByEmail,
  resendOtpCode,
  resetPassword,
  signJwtToken,
  signUpUserService,
  updatePasswordResetToken,
  verifyOtpCode,
} from "./auth.services";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { createHttpException } from "../../utils/exceptions";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { logoutCookieOptions, tokenCookieOptions } from "./auth.constants";
import { hashField, verifyHashedField } from "../../utils/hash";
import { generateOTPCode } from "../../utils/generateUniqueOtpCode";
import { sendOtpCodeMail } from "../../utils/mail";
import prisma from "../../config/prisma";
import { computeFutureTimestamp } from "../../utils/computeFutureTimestamp";
import { generateForgotPasswordTemplate } from "../../utils/email-templates/forgotPasswordTemplate";
import { sendOtpCodeTemplate } from "../../utils/email-templates/sendOtpCodeTemplate";

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
): Promise<void> => {
  const { email, password, firstName, lastName } = request.body;

  const otpCode = generateOTPCode();

  /** 1. Check if the user already exists in db */
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User already exists!"
    );
  }

  /* 2. Upload avatar image to cloudinary after the account has been created successfully*/

  /* 3.Add user to database */
  const userUniqueId = generateUniqueId();
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
  /* 5. create the JWT token */
  const jwtToken = signJwtToken({
    email,
    password,
    id: userUniqueId,
    firstName,
    lastName,
    otpCode: userCreated?.otpCode,
  });

  return reply
    .code(HTTP_STATUS_CODE.CREATED)
    .cookie("Authorization", jwtToken, tokenCookieOptions)
    .send({ message: "User registered successfully!", user: userCreated });
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
): Promise<void> => {
  const { email, password } = request.body;

  /** 1. Check if the users exists in db, otherwise throw an error */
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[signInController]:User not found"
    );
  }

  /** 2. Check if the password from db matches the password entered, otherwise throw an error */

  const isPasswordMatching = verifyHashedField(
    password,
    registeredUser.salt,
    registeredUser.password
  );

  if (!isPasswordMatching) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[signInController]:Password doesn't match!"
    );
  }

  /**  generate JWT access token */
  const jwtToken: string = signJwtToken({
    email,
    password,
    id: registeredUser.id,
    firstName: registeredUser.id,
    lastName: registeredUser.lastName,
    otpCode: registeredUser.otpCode,
  });

  /** 3. In the end return a successful message, token and also user if needed */

  return reply
    .code(HTTP_STATUS_CODE.CREATED)
    .cookie("Authorization", jwtToken, tokenCookieOptions)
    .send({ message: "Successfully logged in!", token: jwtToken });
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
    .cookie("Authorization", "", logoutCookieOptions)
    .send({ message: "Logout successful!" });
};

/**
 * The resendOtpCodeController function serves as a controller for resending OTP (One-Time Password) codes to users for email verification.
 */
export const resendOtpCodeController = async (
  request: FastifyRequest<{
    Body: TResendOtpFields;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email } = request.body;
  const newOtpCode = generateOTPCode();
  const { hash: hashNewOtpCode, salt: saltNewOtpCode } = hashField(newOtpCode);

  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User doesn't exist!"
    );
  }

  if (!user.isVerifiedOtp) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "OTP code cannot be generated because your account has already been verified!"
    );
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

  return reply
    .code(HTTP_STATUS_CODE.OK)
    .send({ message: "OTP is resent! Check you email inbox!" });
};

/**
 * The verifyOtpCodeController function is a controller responsible for verifying OTP (One-Time Password) codes submitted by users for email verification.
 */
export const verifyOtpCodeController = async (
  request: FastifyRequest<{
    Body: TOtpVerification;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email, otpCode } = request.body;

  const user = await prisma.auth.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User with this email and otpCode doesn't exist!"
    );
  }
  const isOtpMatching = verifyHashedField(otpCode, user.saltOtp, user.otpCode);

  if (!isOtpMatching) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[verifyOtpCode]: OTP does't match, try again!"
    );
  }

  const isOtpExpired = new Date() > new Date(user?.otpExpiration!);
  if (isOtpExpired) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[verifyOtpCode]: OTP is expired, try again!"
    );
  }

  await verifyOtpCode(email);

  return reply
    .code(HTTP_STATUS_CODE.OK)
    .send({ message: "Your OTP code has been successfully verified!" });
};

/**
 * Handles the logic for initiating the password reset process by creating a reset token with an expiration time of 10 minutes
 * */
export const forgotPasswordController = async (
  request: FastifyRequest<{
    Body: TForgotPasswordFields;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email } = request.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User doesn't exist!"
    );
  }

  if (!user.isVerifiedOtp) {
    return createHttpException(
      HTTP_STATUS_CODE.FORBIDDEN,
      "This account is not verified!"
    );
  }

  const resetOtpToken = generateOTPCode();
  //! consider in the future to hash resetOtpToken
  // const { hash, salt } = hashField(resetOtpToken);

  const userUpdated = await updatePasswordResetToken({
    email,
    passwordResetToken: resetOtpToken,
    passwordResetExpires: computeFutureTimestamp(10),
  });

  await sendOtpCodeMail({
    receiverEmail: email,
    subject: "Forgot password",
    htmlTemplate: generateForgotPasswordTemplate(
      userUpdated?.firstName!,
      resetOtpToken
    ),
  });

  return reply.code(HTTP_STATUS_CODE.CREATED).send({
    message: "You will receive a reset code email. Please verify your inbox!",
  });
};

/**
 * Handles the logic for resetting the password
 * */
export const resetPasswordController = async (
  request: FastifyRequest<{
    Body: TResetPasswordFields;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email, resetToken, password, confirmPassword } = request.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User doesn't exist!"
    );
  }

  if (password !== confirmPassword) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Passwords do not match!"
    );
  }

  const isResetPasswordTimeExpired =
    new Date() > new Date(user.passwordResetExpires!);
  if (isResetPasswordTimeExpired) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[resetPasswordController]: Reset token has expired!"
    );
  }

  await resetPassword({ email, password, resetToken });

  return reply.code(HTTP_STATUS_CODE.CREATED).send({
    message: "Your password has been successfully reset!",
  });
};
