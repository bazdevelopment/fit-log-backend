import { FastifyReply, FastifyRequest } from "fastify";
import { getUserPermissions } from "../modules/permission/permission.services";
import { HTTP_STATUS_CODE } from "../enums/http-status-codes";
import { createHttpException } from "./httpResponse";

interface IUserPermission {
  name: string;
  value: boolean;
}
/**
 * Checks if a user has a specific permission based on their assigned permissions.
 */
const hasPermission = (
  userPermissions: IUserPermission[],
  requiredPermission: string
) => {
  return userPermissions.some(
    (permission: IUserPermission) =>
      permission.name === requiredPermission && permission.value === true
  );
};

/**
 * Middleware function to enforce access control based on user permissions.
 */
export const withPermission =
  (requiredPermission: string) =>
  async (request: FastifyRequest, _reply: FastifyReply) => {
    const userId = request.user.id;
    const userPermissions = await getUserPermissions(userId);

    // Check if the user has the required permission
    if (!hasPermission(userPermissions, requiredPermission)) {
      return createHttpException({
        status: HTTP_STATUS_CODE.FORBIDDEN,
        message: "You don't have permission to access this endpoint",
      });
    }
  };
