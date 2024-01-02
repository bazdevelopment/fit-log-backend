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
} from "./exercise.constants";
import { SWAGGER_TAGS } from "../../enums/SwaggerTags";

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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the fitness exercises",
        description:
          "Endpoint used to get the fitness exercises (lazy loading with limit & offset)",

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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Search the exercises",
        description:
          "Endpoint used to search a specific fitness exercise by exercise name (lazy loading with limit & offset)",
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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the fitness exercise by id",
        description: "Endpoint used to get a specific fitness exercise by id ",
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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the fitness exercise for a specific muscle target",
        description:
          "Endpoint used to get some fitness exercises for a specific muscle target (lazy loading with limit & offset)",
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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the fitness exercise according to a specific equipment",
        description:
          "Endpoint used to get some fitness exercises for a specific equipment (lazy loading with limit & offset)",
      },
    },
    getExercisesByEquipmentController
  );

  app.get(
    "/muscle-target-list",
    {
      preHandler: [app.authenticate],
      schema: {
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the list with all the target muscles",
        description:
          "Endpoint used to get the list with all the target muscles",
      },
    },
    getMuscleTargetListController
  );

  app.get(
    "/equipment-list",
    {
      schema: {
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the list with all the fitness equipments",
        description:
          "Endpoint used to get the list with all the fitness equipments",
      },
      preHandler: [app.authenticate],
    },
    getEquipmentListController
  );

  app.get(
    "/body-part-list",
    {
      preHandler: [app.authenticate],
      schema: {
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the list with all the body parts",
        description: "Endpoint used to get the list with all the body parts",
      },
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
        tags: [SWAGGER_TAGS.EXERCISE],
        summary: "Get the exercises for a specific body part",
        description: "Endpoint used to get exercises for a specific body part",
      },
    },
    getExercisesByBodyPartController
  );
};
