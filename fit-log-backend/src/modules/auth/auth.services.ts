import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { computeFutureTimestamp } from "../../utils/computeFutureTimestamp";
import { createHttpException } from "../../utils/exceptions";
import { hashField } from "../../utils/hash";
import { TSignUpUser, TSignUpUserResponse } from "./auth.types";
import JWT from "jsonwebtoken";

/**
 * signUpUserService
 * This asynchronous function is responsible for register a new user account in the database.
 * It takes a `userInfo` object as a parameter, which represents the details of the user to be registered.
 * The function returns a Promise that resolves to a `TSignUpUserResponse` if the user is successfully created, or resolves to `void` if there is an error during the process.
 *
 */
export const signUpUserService = async (
  userInfo: TSignUpUser
): Promise<TSignUpUserResponse | void> => {
  try {
    const { password, otpCode, ...restUserInfo } = userInfo;
    const { hash, salt } = hashField(password);
    const { hash: hashOtp, salt: saltOtp } = hashField(otpCode!);

    const result = await prisma.user.create({
      data: {
        ...restUserInfo,
        password: hash,
        salt,
        otpCode: hashOtp,
        saltOtp,
        otpExpiration: computeFutureTimestamp(10),
      },
    });

    return result;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[signUpUserService]: ${errorResponse.message}`
    );
  }
};

/**
 *  getUserByEmail
 *  This asynchronous function retrieves user information from the database based on the provided email.
 *  It takes an `email` parameter and returns a Promise that resolves to a `TSignUpUserResponse` representing the user if found,
 *  or resolves to `null` if the user is not found.
 *  In case of an error, the Promise resolves to `void`, and an HTTP exception is generated using `createHttpException`.
 */
export const getUserByEmail = async (
  email: string
): Promise<TSignUpUserResponse | null | void> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return result;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[getUserByEmail]: ${errorResponse.message}`
    );
  }
};

/**
 * signJwtToken
 * This function generates a JSON Web Token (JWT) by signing user information using the provided `userInfo`.
 *  The JWT is signed using the specified secret (`process.env.JWT_SECRET`) and is configured to expire after a certain duration (`process.env.JWT_TOKEN_EXPIRES`).
 */
export const signJwtToken = (userInfo: TSignUpUser): string => {
  return JWT.sign(userInfo, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES!,
  });
};
/**
 * resendOtpCode function is responsible for updating the OTP (One-Time Password) code and its expiration timestamp for a user identified by their email in the database.
 * email (string): The email address of the user for whom the OTP code is being updated.
 * otpCode (string): The new OTP code to be associated with the user.
 * otpExpiration (Date): The expiration timestamp for the OTP code.
 */
export const resendOtpCode = async ({
  email,
  otpCode,
  otpExpiration,
}: {
  email: string;
  otpCode: string;
  otpExpiration: Date;
}) => {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otpCode: otpCode,
        otpExpiration: otpExpiration,
      },
    });
  } catch (error) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[resendOtpCode]: ${errorResponse.message}`
    );
  }
};

/**
 * verifyOtpCode service function is responsible for updating the verification status of the OTP (One-Time Password) for a user identified by their email in the database.
 */
export const verifyOtpCode = async (email: string) => {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerifiedOtp: true,
      },
    });
  } catch (error) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[verifyOtpCode]: ${errorResponse.message}`
    );
  }
};
