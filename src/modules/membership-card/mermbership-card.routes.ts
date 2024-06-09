import { FastifyInstance } from "fastify";
import { MEMBERSHIP_CARD_ROUTES } from "./membership-card.constants";
import { SWAGGER_TAGS } from "../../enums/swagger-tags";
import { $ref } from "./mermbership-card.schemas";
import {
  registerMembershipCardController,
  storeGymVisitsController,
  verifyGymVisitController,
} from "./mermbership-card.controllers";

/**
 * All the routes related to membership card are grouped here
 */
export const membershipCardRoutes = async (app: FastifyInstance) => {
  /* Register membership card */
  app.post(
    MEMBERSHIP_CARD_ROUTES.REGISTER_MEMBERSHIP_CARD,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("registerMembershipCardJsonSchema"),
        tags: [SWAGGER_TAGS.MEMBERSHIP_CARD],
        summary: "Register membership card",
        description: "Endpoint used register the membership card by scanning",
      },
    },
    registerMembershipCardController
  );

  /* Store daily visits by scanning card */
  app.post(
    MEMBERSHIP_CARD_ROUTES.REGISTER_DAILY_GYM_VISIT,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("registerMembershipCardJsonSchema"),
        tags: [SWAGGER_TAGS.MEMBERSHIP_CARD],
        summary: "Register daily gym visit",
        description: "Endpoint used to register daily visit",
      },
    },
    storeGymVisitsController
  );

  /* Verify today gym visit status */
  app.get(
    MEMBERSHIP_CARD_ROUTES.VERIFY_DAILY_GYM_VISIT,
    {
      preHandler: [app.authenticate],
      schema: {
        tags: [SWAGGER_TAGS.MEMBERSHIP_CARD],
        summary: "Verify daily gym visit",
        description: "Endpoint used to verify daily visit",
      },
    },
    verifyGymVisitController
  );
};
