import { FastifyReply, FastifyRequest } from "fastify";
import { getUserById, updateUserByUserId } from "./user.services";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { TUpdateUser } from "./user.types";

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
  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(currentUser);
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
) => {
  const { userId } = request.params;
  const userInfoFields = request.body;

  const updatedUser = await updateUserByUserId(userId, userInfoFields);
  return reply
    .code(HTTP_STATUS_CODE.ACCEPTED)
    .send({ message: "User updated successfully!", updatedUser });
};
