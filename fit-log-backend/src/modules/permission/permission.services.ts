import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createHttpException } from "../../utils/httpResponse";

/**
 * services used to get the users permissions set
 */
export const getUserPermissions = async (userId: string) => {
  try {
    const userPermissions = await prisma.rolePermission.findMany({
      where: {
        role: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      },
      include: {
        permission: true,
      },
    });

    const transformedPermissions = userPermissions.map((userPermission) => ({
      permissionId: userPermission.permission.id,
      name: userPermission.permission.name,
      value: userPermission.value,
      description: userPermission.permission.description || null,
    }));
    return transformedPermissions;
  } catch (error) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getUserPermissions",
    });
  }
};
