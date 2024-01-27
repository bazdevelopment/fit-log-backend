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
exports.assignRoleToUser = exports.getRoleByName = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * Retrieve a role from the database by its name.
 */
const getRoleByName = (roleName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.role.findUnique({
            where: {
                name: roleName,
            },
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: errorResponse.message,
            method: "getRoleByName",
        });
    }
});
exports.getRoleByName = getRoleByName;
/**
 * Service used to assign a role to an user
 */
const assignRoleToUser = (roleId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.userRole.create({
            data: { userId, roleId },
        });
    }
    catch (error) {
        throw (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "Cannot assign a role to user!",
            method: "assignRoleToUser",
        });
    }
});
exports.assignRoleToUser = assignRoleToUser;
