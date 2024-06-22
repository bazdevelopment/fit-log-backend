import dayjs from "dayjs";
import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createHttpException } from "../../utils/httpResponse";
import { getUserById } from "../user/user.services";

/**
 * Service used to assign a membership card to an user in DB
 */
export const registerMembershipCardService = async (
  cardNumber: string,
  userId: string
) => {
  try {
    const cardAlreadyExist = await prisma.membershipCard.findFirst({
      where: {
        cardNumber,
      },
    });

    if (cardAlreadyExist) {
      return createHttpException({
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "You scanned a card that it is already used by someone else!",
        method: "registerMembershipCardService",
      });
    }

    const verificationCardResponse = await prisma.membershipCard.create({
      data: {
        cardNumber,
        userId,
      },
    });
    if (verificationCardResponse.id) {
      await prisma.user.update({
        where: {
          userId,
        },
        data: { cardMembershipId: cardNumber },
      });
    }

    return verificationCardResponse;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "registerMembershipCardService",
    });
  }
};

/**
 * Service used to store a gym visit in db
 */
export const storeGymVisitService = async (
  cardNumber: string,
  userId: string
) => {
  try {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();
    const user = await getUserById(userId);
    if (user.cardMembershipId !== cardNumber) {
      return createHttpException({
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "You scanned an invalid card that doesn't belong to you!",
        method: "storeGymVisitService",
      });
    }
    const existingGymVisit = await prisma.visit.findFirst({
      where: {
        userId,
        cardMembershipId: cardNumber,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingGymVisit) {
      return createHttpException({
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "You already visited the gym today!",
        method: "signUpController",
      });
    }

    const newVisit = await prisma.visit.create({
      data: {
        userId,
        cardMembershipId: cardNumber,
      },
    });

    return newVisit;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "registerMembershipCardService",
    });
  }
};
/**
 * Service used to store a gym visit in db
 */
export const verifyTodayGymVisitService = async (userId: string) => {
  try {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();
    const visit = await prisma.visit.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return visit;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "verifyTodayGymVisit service",
    });
  }
};

/**
 * Service used to store a gym visit in db
 */
export const getGymVisits = async (userId: string) => {
  try {
    const visits = await prisma.visit.findMany({
      where: { userId },
      select: {
        createdAt: true,
        id: true,
      },
    });

    const groupedVisits = visits.reduce((acc, visit) => {
      const month = dayjs(visit.createdAt).format("YYYY-MM");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(visit);
      return acc;
    }, {});

    return groupedVisits;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "verifyTodayGymVisit service",
    });
  }
};
