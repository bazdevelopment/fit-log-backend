import { Dayjs } from "dayjs";
import prisma from "../../config/prisma";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createHttpException } from "../../utils/httpResponse";
import {
  TAddExerciseToWorkoutResponse,
  TAddSetToWorkoutExerciseResponse,
  TCreateWorkoutResponse,
  TWorkoutSetAndExercises,
} from "./workout.types";

/**
 * Service used create a new workout in db
 */
export const createWorkout = async (
  userId: string,
  name: string,
  musclesGroupTarget: string[],
  creationDateISO?: string
): Promise<TCreateWorkoutResponse> => {
  try {
    return await prisma.workout.create({
      data: {
        userId,
        name,
        musclesGroupTarget,
        ...(creationDateISO && { createdAt: creationDateISO }),
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "createWorkout service",
    });
  }
};

/**
 * Service used to add an exercise to an workout
 */
export const addExerciseToWorkoutService = async (
  workoutId: string,
  exerciseId: string
): Promise<TAddExerciseToWorkoutResponse> => {
  try {
    return await prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseId,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "addExerciseToWorkout service",
    });
  }
};

/**
 * Service used to add an multiple exercises to an existing workout
 */
export const addMultipleExerciseSToWorkoutService = async (
  workoutId: string,
  exercisesIds: string[]
) => {
  try {
    return await prisma.$transaction(
      exercisesIds.map((exerciseId: string) =>
        prisma.workoutExercise.create({
          data: {
            workoutId,
            exerciseId,
          },
        })
      )
    );
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "addExerciseToWorkout service",
    });
  }
};

/**
 * Service used to add a new set to an existing workout exercise
 */
export const addSetToWorkoutExerciseService = async (
  workoutExerciseId: string,
  weight: number,
  reps: number
): Promise<TAddSetToWorkoutExerciseResponse> => {
  try {
    return await prisma.workoutSet.create({
      data: {
        workoutExerciseId,
        weight,
        reps,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "addSetToWorkoutExercise service",
    });
  }
};

/**
 * Service used to update the workout name
 */
export const updateWorkoutNameService = async (
  workoutId: string,
  name: string
): Promise<TCreateWorkoutResponse> => {
  try {
    return await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        name,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "updateWorkoutNameService service",
    });
  }
};

/**
 * Service used to delete a specific workout by Id
 */
export const deleteWorkoutByIdService = async (
  workoutId: string
): Promise<void> => {
  try {
    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "deleteWorkoutByIdService service",
    });
  }
};

/**
 * Service used to update a specific set
 */
export const updateSetService = async (
  setId: string,
  weight: number,
  reps: number
): Promise<TAddSetToWorkoutExerciseResponse> => {
  try {
    return await prisma.workoutSet.update({
      where: {
        id: setId,
      },
      data: {
        weight,
        reps,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "updateSetService service",
    });
  }
};

/**
 * Service used to delete a specific set
 */
export const deleteSetService = async (setId: string): Promise<void> => {
  try {
    await prisma.workoutSet.delete({
      where: {
        id: setId,
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "deleteSetService service",
    });
  }
};

/**
 * Service used to fetch a specific detailed workout (including exercises & sets)
 */
export const getDetailedWorkoutService = async (
  workoutId: string,
  userId: string
) => {
  try {
    const response = await prisma.workout.findMany({
      where: {
        userId,
        id: workoutId,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
            set: true,
          },
        },
      },
    });

    return response;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "getDetailedWorkoutService",
    });
  }
};

/**
 * Service used to fetch workout by date (including exercises & sets)
 */
export const getDetailedWorkoutsByDate = async (
  startOfSameDay: Dayjs,
  endOfSameDay: Dayjs,
  userId: string
): Promise<TWorkoutSetAndExercises[]> => {
  try {
    const response = await prisma.workout.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfSameDay.toDate(),
          lte: endOfSameDay.toDate(),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
            set: true,
          },
        },
      },
    });
    return response;
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "getDetailedWorkoutsByDate",
    });
  }
};

/**
 * Service used search db from a date interval and return workouts assigned to an user
 */
export const getUserWorkoutsService = async (
  userId: string,
  startDate: Dayjs,
  endDate: Dayjs
) => {
  try {
    return await prisma.workout.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
      },
    });
  } catch (error: unknown) {
    const errorResponse = error as Error;
    throw createHttpException({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: errorResponse.message,
      method: "getUserWorkoutsService service",
    });
  }
};
