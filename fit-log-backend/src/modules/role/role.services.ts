import { ROLE_NAME } from "@prisma/client";
import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { ICustomError, createHttpException } from "../../utils/httpResponse";

/**
 * Retrieve a role from the database by its name.
 */
export const getRoleByName = async (
  roleName: ROLE_NAME
): Promise<{ id: string; name: string } | null> => {
  try {
    return await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });
  } catch (error) {
    const errorResponse = error as ICustomError;
    throw createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message: errorResponse.message,
      method: "getRoleByName",
    });
  }
};

/**
 * Service used to assign a role to an user
 */
export const assignRoleToUser = async (
  roleId: string,
  userId: string
): Promise<void> => {
  try {
    await prisma.userRole.create({
      data: { userId, roleId },
    });
  } catch (error) {
    throw createHttpException({
      status: HTTP_STATUS_CODE.FORBIDDEN,
      message: "Cannot assign a role to user!",
      method: "assignRoleToUser",
    });
  }
};
