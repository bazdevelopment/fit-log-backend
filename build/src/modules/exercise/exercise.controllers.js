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
exports.getExercisesByBodyPartController = exports.getBodyPartListController = exports.getEquipmentListController = exports.getMuscleTargetListController = exports.getExercisesByEquipmentController = exports.getExerciseByMuscleTarget = exports.getExerciseById = exports.getExercisesByNameController = exports.getExercisesController = void 0;
const exercise_services_1 = require("./exercise.services");
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * Controller used to fetch all the exercises from db
 */
const getExercisesController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = request.query.limit || 10;
    const offset = request.query.offset || 0;
    const exercises = yield (0, exercise_services_1.getExercises)(Number(limit), Number(offset));
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "Exercises fetched successfully!",
        data: exercises,
    }));
});
exports.getExercisesController = getExercisesController;
/**
 * Controller used to fetch all the exercises by name from db
 */
const getExercisesByNameController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, limit, offset } = request.query;
    const exercises = yield (0, exercise_services_1.getExercisesByNameService)({
        exerciseName: name,
        limit: Number(limit),
        offset: Number(offset),
    });
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "Exercises fetched successfully!",
        data: exercises,
    }));
});
exports.getExercisesByNameController = getExercisesByNameController;
/**
 * Controller used to get a specific exercised based on exercised id
 */
const getExerciseById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { exerciseId } = request.params;
    const exercise = yield (0, exercise_services_1.getExercisesByIdService)(exerciseId);
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: `Exercise with id ${exerciseId} has been fetched successfully!`,
        data: exercise,
    }));
});
exports.getExerciseById = getExerciseById;
/**
 * Controller used to get the exercises associated with a specific muscle
 */
const getExerciseByMuscleTarget = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { target, limit, offset } = request.query;
    const exercises = yield (0, exercise_services_1.getExercisesByMuscleTarget)({
        muscleTarget: target,
        limit: Number(limit),
        offset: Number(offset),
    });
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: `Exercises with target ${target} has been fetched successfully!`,
        data: exercises,
    }));
});
exports.getExerciseByMuscleTarget = getExerciseByMuscleTarget;
/**
 * Controller used to get the exercises associated with a specific equipment
 */
const getExercisesByEquipmentController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { equipmentType, limit, offset } = request.query;
    const exercises = yield (0, exercise_services_1.getExercisesByEquipment)({
        equipmentType,
        limit: Number(limit),
        offset: Number(offset),
    });
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: `Exercises associated with the equipment ${equipmentType} has been fetched successfully!`,
        data: exercises,
    }));
});
exports.getExercisesByEquipmentController = getExercisesByEquipmentController;
/**
 * Controller used to get the list with all the target muscles
 */
const getMuscleTargetListController = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const muscleTargeList = yield (0, exercise_services_1.getMuscleTargetList)();
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "Muscle target list has been fetched successfully!",
        data: muscleTargeList,
    }));
});
exports.getMuscleTargetListController = getMuscleTargetListController;
/**
 * Controller used to get all the equipments
 */
const getEquipmentListController = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const equipmentList = yield (0, exercise_services_1.getEquipmentList)();
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "Equipment list has been fetched successfully!",
        data: equipmentList,
    }));
});
exports.getEquipmentListController = getEquipmentListController;
/**
 * Controller used to get the list with body parts
 */
const getBodyPartListController = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyPartList = yield (0, exercise_services_1.getBodyPartList)();
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "Body part list has been fetched successfully!",
        data: bodyPartList,
    }));
});
exports.getBodyPartListController = getBodyPartListController;
/**
 * Controller used to get all the exercises for a specific body part
 */
const getExercisesByBodyPartController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { bodyPart, limit, offset } = request.query;
    const exercises = yield (0, exercise_services_1.getExercisesByBodyPart)({
        bodyPart,
        limit: Number(limit),
        offset: Number(offset),
    });
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: `Exercises for body part ${bodyPart} have been successfully fetched!`,
        data: exercises,
    }));
});
exports.getExercisesByBodyPartController = getExercisesByBodyPartController;
