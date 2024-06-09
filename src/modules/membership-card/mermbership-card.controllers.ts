import { FastifyReply, FastifyRequest } from "fastify";
import { createSuccessResponse } from "../../utils/httpResponse";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import {
  registerMembershipCardService,
  storeGymVisitService,
  verifyTodayGymVisitService,
} from "./mermbership-card.services";

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
