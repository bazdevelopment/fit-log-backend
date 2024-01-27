"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = exports.userResponseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
exports.userResponseSchema = zod_1.default
    .object({
    avatarImage: zod_1.default.string().nullable(),
    sex: zod_1.default.string().nullable(),
    birthDate: zod_1.default.date().nullable(),
    phoneNumber: zod_1.default.string().nullable(),
    nationality: zod_1.default.string().nullable(),
    weight: zod_1.default.number().nullable(),
    goal: zod_1.default.array(zod_1.default.string()).default([]),
    activityLevel: zod_1.default.string().nullable(),
})
    .partial();
_a = (0, fastify_zod_1.buildJsonSchemas)({
    userResponseToJsonSchema: exports.userResponseSchema,
}, { $id: "userSchema" }), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
