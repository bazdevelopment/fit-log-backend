import { FastifyReply, FastifyRequest } from "fastify";
import { createSuccessResponse } from "../../utils/httpResponse";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import {
  getGymVisits,
  registerMembershipCardService,
  storeGymVisitService,
  verifyTodayGymVisitService,
} from "./mermbership-card.services";

/**
 * Controller user to register the membership card and assign to the user the card id
 * the card id should be unique per user
 */
export const registerMembershipCardController = async (
  request: FastifyRequest<{
    Body: {
      cardNumber: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { cardNumber } = request.body;
  const userId = request.user.id;

  const response = await registerMembershipCardService(cardNumber, userId);
  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully scanned membership card!",
      data: response,
    })
  );
};

/**
 * Controller used to store the gym visit when scanning the membership card
 */
export const storeGymVisitsController = async (
  request: FastifyRequest<{
    Body: {
      cardNumber: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { cardNumber } = request.body;
  const userId = request.user.id;
  const response = await storeGymVisitService(cardNumber, userId);
  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully added a new visit to the gym!",
      data: response,
    })
  );
};
/**
 * Controller used to verify if the user visited the gym (scanned once per day)
 */
export const verifyGymVisitController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.id;
  const response = await verifyTodayGymVisitService(userId);
  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully verified today's gym visit status!",
      data: response,
    })
  );
};

/**
 * Controller used to get all the gym visits
 */
export const getGymVisitsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.id;
  const response = await getGymVisits(userId);
  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully fetched gym visists",
      data: response,
    })
  );
};
