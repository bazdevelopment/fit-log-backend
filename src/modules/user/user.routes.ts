import { FastifyInstance } from "fastify";
import {
  getCurrentUserController,
  updateUserByUserIdController,
} from "./user.controllers";
import { $ref } from "./user.schemas";
import { SWAGGER_TAGS } from "../../enums/swagger-tags";
import { USER_ROUTES } from "./user.constants";

/**
 * Routes associated to user model
 */
export const userRoutes = async (app: FastifyInstance) => {
  app.get(
    USER_ROUTES.GET_CURRENT_USER_ROUTE,
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
    USER_ROUTES.UPDATE_USER_BY_USER_ID_ROUTE,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("userResponseToJsonSchema"),
        tags: [SWAGGER_TAGS.USER],
        summary: "Update the used by userId",
        description: "Endpoint user to update the user info",
      },
    },
    updateUserByUserIdController as any
  );
};
