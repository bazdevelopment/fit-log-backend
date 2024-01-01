import { FastifyInstance } from "fastify";
import {
  getBodyPartListController,
  getEquipmentListController,
  getExerciseById,
  getExerciseByMuscleTarget,
  getExercisesByBodyPartController,
  getExercisesByEquipmentController,
  getExercisesByNameController,
  getExercisesController,
  getMuscleTargetListController,
} from "./exercise.controllers";
import {
  BODY_PART,
  EXERCISE_EQUIPMENT,
  MUSCLE_TARGET,
} from "./exerice.constants";

/**
 * Routes associated to exercise model
 */
export const exerciseRoutes = async (app: FastifyInstance) => {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          limit: { type: "string" },
          offset: { type: "string" },
        },

        // response: {
        //   202: {
        //     type: "array",
        //     properties: {
        //       id: { type: "string" },
        //       name: { type: "string" },
        //       bodyPart: { type: "string" },
        //       target: { type: "string" },
        //       equipment: { type: "string" },
        //       gifUrl: { type: "string" },
        //       image: { type: ["string", "null"] },
        //       secondaryMuscles: { type: "array", items: { type: "string" } },
        //       instructions: { type: "array", items: { type: "string" } },
        //     },
        //   },
        // },
      },
    },
    getExercisesController
  );

  app.get(
    "/search",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          name: { type: "string" },
          limit: { type: "string" },
          offset: { type: "string" },
        },
      },
    },
    getExercisesByNameController
  );

  app.get(
    "/:exerciseId",
    {
      preHandler: [app.authenticate],
      schema: {
        params: {
          exerciseId: { type: "string" },
        },
      },
    },
    getExerciseById
  );

  app.get(
    "/target",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          target: { type: "string", enum: Object.values(MUSCLE_TARGET) },
          limit: { type: "string" },
          offset: { type: "string" },
        },
      },
    },
    getExerciseByMuscleTarget
  );
  app.get(
    "/equipment",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          equipmentType: {
            type: "string",
            enum: Object.values(EXERCISE_EQUIPMENT),
          },
          limit: { type: "string" },
          offset: { type: "string" },
        },
      },
    },
    getExercisesByEquipmentController
  );

  app.get(
    "/muscle-target-list",
    {
      preHandler: [app.authenticate],
    },
    getMuscleTargetListController
  );

  app.get(
    "/equipment-list",
    {
      preHandler: [app.authenticate],
    },
    getEquipmentListController
  );

  app.get(
    "/body-part-list",
    {
      preHandler: [app.authenticate],
    },
    getBodyPartListController
  );

  app.get(
    "/body-part",
    {
      preHandler: [app.authenticate],

      schema: {
        querystring: {
          bodyPart: {
            type: "string",
            enum: Object.values(BODY_PART),
          },
          limit: { type: "string" },
          offset: { type: "string" },
        },
      },
    },
    getExercisesByBodyPartController
  );
};
