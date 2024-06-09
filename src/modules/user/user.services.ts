import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createHttpException } from "../../utils/httpResponse";
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
          userName: true,
          isVerifiedOtp: true,
        },
      }),
      prisma.user.findUnique({
        where: {
          userId,
        },
        select: {
          avatarImage: true,
          gender: true,
          birthDate: true,
          nationality: true,
          phoneNumber: true,
          isOnboarded: true,
          cardMembershipId: true,
        },
      }),
    ]);
    return { ...authData, ...userData };
  } catch (error: unknown) {
    const errorResponse = error as Error;
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getUserById",
    });
  }
};
/**
 * Service used to perform the request to prisma db in order to update the user info
 */
export const updateUserByUserId = async (
  userId: string,
  userInfoFields: TUpdateUser
): Promise<TUpdateUser> => {
  try {
    return await prisma.user.update({
      where: { userId },
      data: userInfoFields,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "updateUserByUserId",
    });
  }
};
