import { FastifyInstance } from "fastify";
import {
  getCurrentUserController,
  updateUserByUserIdController,
} from "./user.controllers";
import { userResponseToJsonSchema } from "./user.schemas";

/**
 * Routes associated to user model
 */
export const userRoutes = async (app: FastifyInstance) => {
  app.get(
    "/currentUser",
    {
      preHandler: [app.authenticate],
    },
    getCurrentUserController
  );

  app.patch(
    "/:userId",
    {
      preHandler: [app.authenticate],
      schema: { body: userResponseToJsonSchema.body },
    },
    updateUserByUserIdController
  );
};
