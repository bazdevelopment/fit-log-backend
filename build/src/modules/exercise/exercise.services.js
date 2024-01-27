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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExercisesByBodyPart = exports.getBodyPartList = exports.getEquipmentList = exports.getMuscleTargetList = exports.getExercisesByEquipment = exports.getExercisesByMuscleTarget = exports.getExercisesByIdService = exports.getExercisesByNameService = exports.getExercises = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * Service used to fetch all the exercises from db using limit and offset for pagination/lazy loading
 */
const getExercises = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.exercise.findMany({
            take: limit,
            skip: offset,
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercises service",
        });
    }
});
exports.getExercises = getExercises;
/**
 * Search the exercises using the exercise name
 */
const getExercisesByNameService = ({ exerciseName, limit, offset, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.exercise.findMany({
            where: {
                name: {
                    contains: exerciseName,
                },
            },
            take: limit,
            skip: offset,
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercisesByNameService",
        });
    }
});
exports.getExercisesByNameService = getExercisesByNameService;
/**
 * Get a specific exercise using exercise id
 */
const getExercisesByIdService = (exerciseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.exercise.findUnique({
            where: {
                id: exerciseId,
            },
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercisesByIdService",
        });
    }
});
exports.getExercisesByIdService = getExercisesByIdService;
/**
 * Get the list with all the target muscles
 */
const getExercisesByMuscleTarget = ({ muscleTarget, limit, offset, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.exercise.findMany({
            where: {
                target: muscleTarget,
            },
            take: limit,
            skip: offset,
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercisesByMuscleTarget",
        });
    }
});
exports.getExercisesByMuscleTarget = getExercisesByMuscleTarget;
/**
 * Get the exercises associated with a specific equipment
 */
const getExercisesByEquipment = ({ equipmentType, limit, offset, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.exercise.findMany({
            where: {
                equipment: equipmentType,
            },
            take: limit,
            skip: offset,
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercisesByEquipment service",
        });
    }
});
exports.getExercisesByEquipment = getExercisesByEquipment;
/**
 * Get the muscle target list
 */
const getMuscleTargetList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetList = yield prisma_1.default.exercise.groupBy({
            by: "target",
        });
        return targetList.map((record) => record.target);
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getMuscleTargetList service",
        });
    }
});
exports.getMuscleTargetList = getMuscleTargetList;
/**
 * Get the list with equipments
 */
const getEquipmentList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetList = yield prisma_1.default.exercise.groupBy({
            by: "equipment",
        });
        return targetList.map((record) => record.equipment);
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getEquipmentList service",
        });
    }
});
exports.getEquipmentList = getEquipmentList;
/**
 * Get the body part list
 */
const getBodyPartList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetList = yield prisma_1.default.exercise.groupBy({
            by: "bodyPart",
        });
        return targetList.map((record) => record.bodyPart);
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getBodyPartList service",
        });
    }
});
exports.getBodyPartList = getBodyPartList;
/**
 * Get exercises for a specific body part
 */
const getExercisesByBodyPart = ({ bodyPart, limit, offset, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield prisma_1.default.exercise.findMany({
            where: {
                bodyPart,
            },
            take: limit,
            skip: offset,
        });
        return exercises;
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getExercisesByBodyPart service",
        });
    }
});
exports.getExercisesByBodyPart = getExercisesByBodyPart;
