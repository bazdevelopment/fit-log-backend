import { FastifyReply, FastifyRequest } from "fastify";
import { getUserById, updateUserByUserId } from "./user.services";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { TUpdateUser } from "./user.types";
import { createSuccessResponse } from "../../utils/httpResponse";

/**
 * getCurrentUserController
 * Used to get information about the user
 */
export const getCurrentUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id: userId } = request.user;

  const currentUser = await getUserById(userId);
  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      message: "Successfully fetched user info details",
      status: HTTP_STATUS_CODE.ACCEPTED,
      data: currentUser,
    })
  );
};

/**
 * updateUserByUserIdController
 * used to partially update some fields in the user profile table
 */
export const updateUserByUserIdController = async (
  request: FastifyRequest<{
    Body: TUpdateUser;
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply
): Promise<TUpdateUser> => {
  const { userId } = request.params;
  const userInfoFields = request.body;

  await updateUserByUserId(userId, userInfoFields);
  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "User updated successfully!",
    })
  );
};
