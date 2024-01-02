import { FastifyInstance } from "fastify";
import {
  getCurrentUserController,
  updateUserByUserIdController,
} from "./user.controllers";
import { $ref } from "./user.schemas";
import { SWAGGER_TAGS } from "../../enums/SwaggerTags";

/**
 * Routes associated to user model
 */
export const userRoutes = async (app: FastifyInstance) => {
  app.get(
    "/currentUser",
    {
      preHandler: [app.authenticate],
      schema: {
        tags: [SWAGGER_TAGS.USER],
        summary: "Get current user",
        description: "Endpoint used to get the current user info",
      },
    },
    getCurrentUserController
  );

  app.patch(
    "/:userId",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("userResponseToJsonSchema"),
        tags: [SWAGGER_TAGS.USER],
        summary: "Update the used by userId",
        description: "Endpoint user to update the user info",
      },
    },
    updateUserByUserIdController
  );
};
