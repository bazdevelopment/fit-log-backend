import { FastifyRequest, FastifyReply } from "fastify";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createSuccessResponse } from "../../utils/httpResponse";
import {
  addExerciseToWorkoutService,
  addMultipleExerciseSToWorkoutService,
  addMultipleSetsToWorkoutExerciseService,
  addSetToWorkoutExerciseService,
  createWorkout,
  deleteSetService,
  deleteWorkoutByIdService,
  getDetailedWorkoutService,
  getDetailedWorkoutsByDate,
  getUserWorkoutsService,
  submitWorkoutTimestamp,
  updateSetService,
  updateWorkoutNameService,
} from "./workout.services";
import {
  IMultipleSetsToWorkoutExercise,
  TAddExerciseToWorkoutResponse,
  TAddSetToWorkoutExercise,
  TAddSetToWorkoutExerciseResponse,
  TCreateWorkoutResponse,
  TMultipleExercisesToWorkout,
  TUpdateWorkoutName,
  TWorkout,
  TWorkoutSetAndExercises,
} from "./workout.types";
import dayjs from "dayjs";
import { initializeWeek } from "./workout.utils";
import { WORKOUT_ACTION } from "./workout.contants";

/**
 * Controller used to create a new workout
 */
export const createWorkoutController = async (
  request: FastifyRequest<{
    Body: TWorkout;
  }>,
  reply: FastifyReply
): Promise<TCreateWorkoutResponse> => {
  const { name, musclesGroupTarget, creationDate } = request.body;
  const creationDateISO = dayjs(creationDate).startOf("day").toISOString();

  const userId = request.user.id;

  const workout = await createWorkout(
    userId,
    name,
    musclesGroupTarget,
    creationDateISO
  );

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Workout created successfully!",
      data: workout,
    })
  );
};

/**
 * Add a new exercise to an existing workout
 */
export const addExerciseToWorkout = async (
  request: FastifyRequest<{
    Params: {
      exerciseId: string;
      workoutId: string;
    };
  }>,
  reply: FastifyReply
): Promise<TAddExerciseToWorkoutResponse> => {
  const { exerciseId, workoutId } = request.params;

  const response = await addExerciseToWorkoutService(workoutId, exerciseId);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Exercise added to workout successfully!",
      data: response,
    })
  );
};

/**
 * Add multiple exercises to an existing workout
 */
export const addMultipleExercisesToWorkout = async (
  request: FastifyRequest<{
    Body: TMultipleExercisesToWorkout;
    Params: {
      workoutId: string;
    };
  }>,
  reply: FastifyReply
): Promise<TAddExerciseToWorkoutResponse> => {
  const { exercisesIds } = request.body;
  const { workoutId } = request.params;

  const response = await addMultipleExerciseSToWorkoutService(
    workoutId,
    exercisesIds
  );

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Exercises added to workout successfully!",
      data: response,
    })
  );
};

/**
 * Add a new set to an existing workout exercise
 */
export const addSetToWorkoutExercise = async (
  request: FastifyRequest<{
    Params: {
      workoutExerciseId: string;
    };
    Body: TAddSetToWorkoutExercise;
  }>,
  reply: FastifyReply
): Promise<TAddSetToWorkoutExerciseResponse> => {
  const { weight, reps } = request.body;
  const { workoutExerciseId } = request.params;

  const response = await addSetToWorkoutExerciseService(
    workoutExerciseId,
    weight,
    reps
  );

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "A new set to a workout exercise has been added successfully!",
      data: response,
    })
  );
};

/**
 * Add a new set to an existing workout exercise
 */
export const addMultipleSetsToWorkoutExercise = async (
  request: FastifyRequest<{
    Body: IMultipleSetsToWorkoutExercise;
  }>,
  reply: FastifyReply
): Promise<TAddSetToWorkoutExerciseResponse> => {
  const sets = request.body;

  const response = await addMultipleSetsToWorkoutExerciseService(sets);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message:
        "Multiple sets to a workout exercise have been added successfully!",
      data: response,
    })
  );
};

/**
 * Edit the workout name
 */
export const updateWorkoutName = async (
  request: FastifyRequest<{
    Body: TUpdateWorkoutName;
    Params: {
      workoutId: string;
    };
  }>,
  reply: FastifyReply
): Promise<TCreateWorkoutResponse> => {
  const { name } = request.body;
  const { workoutId } = request.params;

  const response = await updateWorkoutNameService(workoutId, name);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "The workout name has been updated!",
      data: response,
    })
  );
};

/**
 * delete a specific workout by id
 */
export const deleteWorkout = async (
  request: FastifyRequest<{
    Params: {
      workoutId: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { workoutId } = request.params;
  await deleteWorkoutByIdService(workoutId);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "The workout has been successfully deleted!",
    })
  );
};

/**
 * update a specific set by set id
 */
export const updateSet = async (
  request: FastifyRequest<{
    Params: {
      setId: string;
    };
    Body: TAddSetToWorkoutExercise;
  }>,
  reply: FastifyReply
): Promise<TAddSetToWorkoutExerciseResponse> => {
  const { weight, reps } = request.body;

  const { setId } = request.params;
  const response = await updateSetService(setId, weight, reps);
  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Set has been updated!",
      data: response,
    })
  );
};

/**
 * update a specific set by set id
 */
export const deleteSet = async (
  request: FastifyRequest<{
    Params: {
      setId: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { setId } = request.params;

  await deleteSetService(setId);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Set has been deleted!",
    })
  );
};

/**
 * get a specific workout detailed by id
 */
export const getDetailedWorkoutById = async (
  request: FastifyRequest<{
    Params: {
      workoutId: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { workoutId } = request.params;
  const userId = request.user.id;

  const response = await getDetailedWorkoutService(workoutId, userId);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully fetched the detailed workout!",
      data: response,
    })
  );
};

/**
 * get user workouts by date
 */
export const getDetailedWorkoutsByDateController = async (
  request: FastifyRequest<{
    Params: {
      date: string;
    };
  }>,
  reply: FastifyReply
): Promise<TWorkoutSetAndExercises[]> => {
  const { date } = request.params;
  const userId = request.user.id;

  const response = await getDetailedWorkoutsByDate(
    dayjs(date).startOf("day"),
    dayjs(date).endOf("day"),
    userId
  );

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully fetched the workouts by date!",
      data: response,
    })
  );
};

/**
 * Controller used fetch the user workouts from a date interval
 */
export const getUserWorkouts = async (
  request: FastifyRequest<{
    Querystring: {
      startDate: string;
      endDate: string;
    };
  }>,
  reply: FastifyReply
): Promise<TCreateWorkoutResponse> => {
  const { startDate, endDate } = request.query;

  const userId = request.user.id;

  /* Initialize the week structure */
  const workoutsByDay = initializeWeek(startDate, endDate);

  const userWorkouts = await getUserWorkoutsService(
    userId,
    dayjs(startDate).startOf("day"),
    dayjs(endDate).endOf("day")
  );

  userWorkouts.forEach((workout) => {
    const month = dayjs(workout.createdAt).format("YYYY-MM");
    const day = dayjs(workout.createdAt).format("YYYY-MM-DD");

    if (!workoutsByDay[month][day]) {
      workoutsByDay[month][day] = [];
    }
    workoutsByDay[month][day].push(workout);
  });

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Workouts fetched successfully!",
      data: workoutsByDay,
    })
  );
};
/**
 * Controller used to submit workout action and store start/end date time
 */
export const submitWorkoutActionController = async (
  request: FastifyRequest<{
    Params: {
      action: WORKOUT_ACTION;
      workoutId: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { action, workoutId } = request.params;

  const response = await submitWorkoutTimestamp(workoutId, action);

  return reply.code(HTTP_STATUS_CODE.OK).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.OK,
      message: "Successfully stored start/end date time for workout",
      data: response,
    })
  );
};
