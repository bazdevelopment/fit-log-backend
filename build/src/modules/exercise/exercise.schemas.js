"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.exerciseSchemas = exports.exercisesResponseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
exports.exercisesResponseSchema = zod_1.default.object({
    id: zod_1.default.string(),
    name: zod_1.default.string(),
    bodyPart: zod_1.default.string(),
    target: zod_1.default.string(),
    equipment: zod_1.default.string(),
    gifUrl: zod_1.default.string(),
    image: zod_1.default.string().nullable(),
    secondaryMuscles: zod_1.default.array(zod_1.default.string()),
    instructions: zod_1.default.array(zod_1.default.string()),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    exercisesResponseToJsonSchema: exports.exercisesResponseSchema,
}, { $id: "exerciseSchema" }), exports.exerciseSchemas = _a.schemas, exports.$ref = _a.$ref;
