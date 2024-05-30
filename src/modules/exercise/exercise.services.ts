import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createHttpException } from "../../utils/httpResponse";
import { TExercisesResponse } from "./exercise.types";
/**
 * Service used to fetch all the exercises from db using limit and offset for pagination/lazy loading
 */
export const getExercises = async (
  limit: number,
  offset: number
): Promise<TExercisesResponse[]> => {
  try {
    return await prisma.exercise.findMany({
      take: limit,
      skip: offset,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercises service",
    });
  }
};

/**
 * Search the exercises using the exercise name
 */
export const getExercisesByNameService = async ({
  exerciseName,
  limit,
  offset,
}: {
  exerciseName: string;
  limit: number;
  offset: number;
}): Promise<TExercisesResponse[]> => {
  try {
    return await prisma.exercise.findMany({
      where: {
        name: {
          contains: exerciseName,
        },
      },
      take: limit,
      skip: offset,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercisesByNameService",
    });
  }
};
/**
 * Get a specific exercise using exercise id
 */
export const getExercisesByIdService = async (
  exerciseId: string
): Promise<TExercisesResponse | null> => {
  try {
    return await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercisesByIdService",
    });
  }
};
/**
 * Get the list with all the target muscles
 */
export const getExercisesByMuscleTarget = async ({
  muscleTarget,
  limit,
  offset,
}: {
  muscleTarget: string[];
  limit: number;
  offset: number;
}): Promise<TExercisesResponse[]> => {
  const muscleTargetLowerCase = muscleTarget.map((target) =>
    target.toLowerCase()
  );

  try {
    return await prisma.exercise.findMany({
      where: {
        OR: [
          {
            target: {
              in: muscleTargetLowerCase,
            },
          },
          {
            bodyPart: {
              in: muscleTargetLowerCase,
            },
          },
        ],
      },
      take: limit,
      skip: offset,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercisesByMuscleTarget",
    });
  }
};

/**
 * Get the exercises associated with a specific equipment
 */
export const getExercisesByEquipment = async ({
  equipmentType,
  limit,
  offset,
}: {
  equipmentType: string;
  limit: number;
  offset: number;
}): Promise<TExercisesResponse[]> => {
  try {
    return await prisma.exercise.findMany({
      where: {
        equipment: equipmentType,
      },
      take: limit,
      skip: offset,
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercisesByEquipment service",
    });
  }
};
/**
 * Get the muscle target list
 */
export const getMuscleTargetList = async (): Promise<string[]> => {
  try {
    const targetList = await prisma.exercise.groupBy({
      by: "target",
    });

    return targetList.map((record) => record.target);
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getMuscleTargetList service",
    });
  }
};
/**
 * Get the list with equipments
 */
export const getEquipmentList = async (): Promise<string[]> => {
  try {
    const targetList = await prisma.exercise.groupBy({
      by: "equipment",
    });

    return targetList.map((record) => record.equipment);
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getEquipmentList service",
    });
  }
};

/**
 * Get the body part list
 */
export const getBodyPartList = async (): Promise<string[]> => {
  try {
    const targetList = await prisma.exercise.groupBy({
      by: "bodyPart",
    });

    return targetList.map((record) => record.bodyPart);
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getBodyPartList service",
    });
  }
};

/**
 * Get exercises for a specific body part
 */
export const getExercisesByBodyPart = async ({
  bodyPart,
  limit,
  offset,
}: {
  bodyPart: string;
  limit: number;
  offset: number;
}): Promise<TExercisesResponse[]> => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        bodyPart,
      },
      take: limit,
      skip: offset,
    });
    return exercises;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "getExercisesByBodyPart service",
    });
  }
};
