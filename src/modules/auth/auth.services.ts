import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { computeFutureTimestamp } from "../../utils/computeFutureTimestamp";
import { createHttpException } from "../../utils/httpResponse";
import { hashField } from "../../utils/hash";
import { TSignUpUser, TSignUpUserResponse } from "./auth.types";

/**
 * signUpUserService
 * This asynchronous function is responsible for register a new user account in the database.
 * It takes a `userInfo` object as a parameter, which represents the details of the user to be registered.
 * The function returns a Promise that resolves to a `TSignUpUserResponse` if the user is successfully created, or resolves to `void` if there is an error during the process.
 *
 */
export const signUpUserService = async (
  userInfo: TSignUpUser
): Promise<TSignUpUserResponse> => {
  try {
    const { password, otpCode, ...restUserInfo } = userInfo;
    const { hash, salt } = hashField(password);
    const { hash: hashOtp, salt: saltOtp } = hashField(otpCode!);

    const result = await prisma.auth.create({
      data: {
        ...restUserInfo,
        password: hash,
        salt,
        otpCode: hashOtp,
        saltOtp,
        otpExpiration: computeFutureTimestamp(10),
      } as any,
    });
    return result as TSignUpUserResponse;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "signUpUserService",
    });
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
): Promise<TSignUpUserResponse | void | null> => {
  try {
    return await prisma.auth.findUnique({
      where: {
        email,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getUserByEmail",
    });
  }
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
  saltOtpCode,
}: {
  email: string;
  otpCode: string;
  otpExpiration: Date;
  saltOtpCode: string;
}): Promise<TSignUpUserResponse> => {
  try {
    return await prisma.auth.update({
      where: {
        email,
      },
      data: {
        otpCode,
        saltOtp: saltOtpCode,
        otpExpiration,
      },
    });
  } catch (error) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "resendOtpCode",
    });
  }
};

/**
 * verifyOtpCode service function is responsible for updating the verification status of the OTP (One-Time Password) for a user identified by their email in the database.
 */
export const verifyOtpCode = async (
  email: string
): Promise<TSignUpUserResponse> => {
  try {
    const createdUser = await prisma.auth.update({
      where: {
        email,
      },
      data: {
        isVerifiedOtp: true,
      },
    });
    return createdUser;
  } catch (error) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "verifyOtpCode",
    });
  }
};
/**
 * Create the user profile and update users table after OTP verification has been done
 *
 *  */
export const createUserProfile = async (
  userId: string
): Promise<TSignUpUserResponse | void> => {
  try {
    await prisma.user.create({
      data: {
        userId,
      },
    });
  } catch (error) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "createUserProfile",
    });
  }
};

/***
 *  updatePasswordResetToken service function is responsible for saving in db the reset token and the expiration time
 */
export const updatePasswordResetToken = async ({
  email,
  passwordResetToken,
  passwordResetExpires,
}: {
  email: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
}): Promise<TSignUpUserResponse> => {
  try {
    return await prisma.auth.update({
      where: {
        email,
      },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    });
  } catch (error) {
    throw createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message:
        "The passwordResetToken & passwordResetExpires cannot be updated!",
      method: "updatePasswordReset",
    });
  }
};

/**
 * resetPassword service function is used for resetting the user's password and saving new credentials in db
 * after resetting the password, the resetToken and expiration time will be null
 */
export const resetPassword = async ({
  email,
  resetToken,
  password,
}: {
  email: string;
  resetToken: string;
  password: string;
}): Promise<TSignUpUserResponse> => {
  try {
    const { hash: hashPassword, salt: saltPassword } = hashField(password);
    const { hash: hashOtp, salt: saltOtp } = hashField(resetToken);

    return await prisma.auth.update({
      where: {
        email,
      },
      data: {
        otpCode: hashOtp,
        saltOtp,
        password: hashPassword,
        salt: saltPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  } catch (error) {
    throw createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message: "Cannot change password!",
      method: "resetPassword",
    });
  }
};

/**
 * This method is responsible for cleaning up unverified OTP (One-Time Password) accounts in the authentication system.
 * It uses Prisma to delete records from the 'auth' database table where the 'isVerifiedOtp' field is set to false.
 */
export const cleanUnverifiedOtpAccounts = async (): Promise<void> => {
  try {
    await prisma.auth.deleteMany({
      where: {
        isVerifiedOtp: false,
      },
    });
  } catch (error) {
    throw createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message: "Cleanup unverified OTP accounts not working!",
      method: "cleanUnverifiedOtpAccounts",
    });
  }
};
