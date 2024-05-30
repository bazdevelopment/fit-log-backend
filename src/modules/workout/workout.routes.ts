import { FastifyInstance } from "fastify";
import { WORKOUT_ROUTES } from "./workout.contants";
import { $ref } from "./workout.schemas";
import { SWAGGER_TAGS } from "../../enums/swagger-tags";
import {
  addExerciseToWorkout,
  addMultipleExercisesToWorkout,
  addSetToWorkoutExercise,
  createWorkoutController,
  deleteSet,
  deleteWorkout,
  getDetailedWorkoutById,
  getDetailedWorkoutsByDateController,
  getUserWorkouts,
  updateSet,
  updateWorkoutName,
} from "./workout.controllers";

export const workoutRoutes = async (app: FastifyInstance) => {
  /* CREATE WORKOUT */
  app.post(
    WORKOUT_ROUTES.CREATE_WORKOUT_ROUTE,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("createWorkoutJsonSchema"),
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Create workout",
        description: "Endpoint used create a new workout and assign it a name",
      },
    },
    createWorkoutController
  );

  /* ADD EXERCISE TO WORKOUT */
  app.post(
    WORKOUT_ROUTES.ADD_EXERCISE_TO_WORKOUT,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          exerciseId: { type: "string" },
          workoutId: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Add exercise to workout",
        description: "Endpoint used add a new exercise to workout",
      },
    },
    addExerciseToWorkout
  );

  /* ADD MULTIPLE EXERCISES TO A WORKOUT */
  app.post(
    WORKOUT_ROUTES.ADD_MULTIPLE_EXERCISES_TO_WORKOUT,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("addExercisesToWorkoutJsonSchema"),
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Add multiple exercise to an workout",
        description: "Endpoint used add a multiple exercises to a workout",
      },
    },
    addMultipleExercisesToWorkout
  );

  /* ADD A NEW SET TO AN EXISTING WORKOUT EXERCISE */
  app.post(
    WORKOUT_ROUTES.ADD_SET_TO_WORKOUT_EXERCISE,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          workoutExerciseId: { type: "string" },
        },
        body: $ref("addSetToWorkoutExerciseJsonSchema"),
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Add a new set to an existing workout exercise",
        description:
          "Endpoint used add a new set to an existing workout exercise",
      },
    },
    addSetToWorkoutExercise
  );

  /* UPDATE WORKOUT NAME  */
  app.put(
    WORKOUT_ROUTES.UPDATE_WORKOUT_NAME,
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("updateWorkoutNameJsonSchema"),
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Update workout name",
        description: "Endpoint used to update the workout name",
      },
    },
    updateWorkoutName
  );

  /* UPDATE WORKOUT NAME  */
  app.delete(
    WORKOUT_ROUTES.DELETE_WORKOUT,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          workoutId: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Delete workout",
        description: "Endpoint used to delete an workout",
      },
    },
    deleteWorkout
  );

  /* UPDATE SET  */
  app.put(
    WORKOUT_ROUTES.UPDATE_SET,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          setId: { type: "string" },
        },
        body: $ref("addSetToWorkoutExerciseJsonSchema"),
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Update set",
        description: "Endpoint used to update a specif set",
      },
    },
    updateSet
  );

  /* DELETE SET  */
  app.delete(
    WORKOUT_ROUTES.DELETE_SET,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          setId: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Delete set",
        description: "Endpoint used to delete a specif set",
      },
    },
    deleteSet
  );

  /* GET A SPECIFIC WORKOUT WITH EXERCISES & SETS by workout Id */
  app.get(
    WORKOUT_ROUTES.GET_DETAILED_WORKOUT,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          workoutId: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Get a specific workout detailed",
        description:
          "Endpoint used to fetch a specif workout from db including sets and exercises",
      },
    },
    getDetailedWorkoutById
  );

  /* GET WORKOUTS WITH EXERCISES & SETS by date*/
  app.get(
    WORKOUT_ROUTES.GET_USER_WORKOUTS_BY_DATE,
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          date: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Get detailed workouts by date detailed",
        description: "Endpoint used to fetch user workouts by date",
      },
    },
    getDetailedWorkoutsByDateController
  );

  /* CREATE WORKOUT */
  app.get(
    WORKOUT_ROUTES.GET_USER_WORKOUTS,
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          startDate: { type: "string" },
          endDate: { type: "string" },
        },
        tags: [SWAGGER_TAGS.WORKOUT],
        summary: "Get used workouts",
        description: "Get user workouts based from a date interval",
      },
    },
    getUserWorkouts
  );
};
