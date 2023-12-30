import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { createHttpException } from "../../utils/exceptions";
import { TUpdateUser } from "./user.types";

/**
 * Service used to retrieve the user profile information (we do not include passwords/hashed or other confidential information)
 */
export const getUserById = async (userId: string) => {
  try {
    const [authData, userData] = await Promise.all([
      prisma.auth.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          isVerifiedOtp: true,
        },
      }),
      prisma.user.findUnique({
        where: {
          userId,
        },
        select: {
          avatarImage: true,
          sex: true,
          birthDate: true,
          nationality: true,
          phoneNumber: true,
        },
      }),
    ]);
    return { ...authData, ...userData };
  } catch (error: unknown) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[getUserById] ${errorResponse.message}!`
    );
  }
};

export const updateUserByUserId = (
  userId: string,
  userInfoFields: TUpdateUser
) => {
  try {
    return prisma.user.update({
      where: { userId },
      data: userInfoFields,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[updateUserByUserId] ${errorResponse.message}!`
    );
  }
};
