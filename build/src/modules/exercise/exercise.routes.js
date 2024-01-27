"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRoutes = void 0;
const exercise_controllers_1 = require("./exercise.controllers");
const exercise_constants_1 = require("./exercise.constants");
/**
 * Routes associated to exercise model
 */
const exerciseRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISES_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            querystring: {
                limit: { type: "string" },
                offset: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the fitness exercises",
            description: "Endpoint used to get the fitness exercises (lazy loading with limit & offset)",
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
    }, exercise_controllers_1.getExercisesController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISES_BY_NAME_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            querystring: {
                name: { type: "string" },
                limit: { type: "string" },
                offset: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Search the exercises",
            description: "Endpoint used to search a specific fitness exercise by exercise name (lazy loading with limit & offset)",
        },
    }, exercise_controllers_1.getExercisesByNameController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISE_BY_ID_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            params: {
                exerciseId: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the fitness exercise by id",
            description: "Endpoint used to get a specific fitness exercise by id ",
        },
    }, exercise_controllers_1.getExerciseById);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            querystring: {
                target: { type: "string", enum: Object.values(exercise_constants_1.MUSCLE_TARGET) },
                limit: { type: "string" },
                offset: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the fitness exercise for a specific muscle target",
            description: "Endpoint used to get some fitness exercises for a specific muscle target (lazy loading with limit & offset)",
        },
    }, exercise_controllers_1.getExerciseByMuscleTarget);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISE_BY_EQUIPMENT_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            querystring: {
                equipmentType: {
                    type: "string",
                    enum: Object.values(exercise_constants_1.EXERCISE_EQUIPMENT),
                },
                limit: { type: "string" },
                offset: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the fitness exercise according to a specific equipment",
            description: "Endpoint used to get some fitness exercises for a specific equipment (lazy loading with limit & offset)",
        },
    }, exercise_controllers_1.getExercisesByEquipmentController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_MUSCLE_TARGET_LIST_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the list with all the target muscles",
            description: "Endpoint used to get the list with all the target muscles",
        },
    }, exercise_controllers_1.getMuscleTargetListController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EQUIPMENT_LIST_ROUTE, {
        schema: {
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the list with all the fitness equipments",
            description: "Endpoint used to get the list with all the fitness equipments",
        },
        preHandler: [app.authenticate],
    }, exercise_controllers_1.getEquipmentListController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_BODY_PART_LIST_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the list with all the body parts",
            description: "Endpoint used to get the list with all the body parts",
        },
    }, exercise_controllers_1.getBodyPartListController);
    app.get(exercise_constants_1.EXERCISE_ROUTES.GET_EXERCISES_BY_BODY_PART_LIST, {
        preHandler: [app.authenticate],
        schema: {
            querystring: {
                bodyPart: {
                    type: "string",
                    enum: Object.values(exercise_constants_1.BODY_PART),
                },
                limit: { type: "string" },
                offset: { type: "string" },
            },
            tags: ["Exercise" /* SWAGGER_TAGS.EXERCISE */],
            summary: "Get the exercises for a specific body part",
            description: "Endpoint used to get exercises for a specific body part",
        },
    }, exercise_controllers_1.getExercisesByBodyPartController);
});
exports.exerciseRoutes = exerciseRoutes;
