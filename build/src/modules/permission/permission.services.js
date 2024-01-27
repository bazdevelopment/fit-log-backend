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
exports.getUserPermissions = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * services used to get the users permissions set
 */
const getUserPermissions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPermissions = yield prisma_1.default.rolePermission.findMany({
            where: {
                role: {
                    users: {
                        some: {
                            userId,
                        },
                    },
                },
            },
            include: {
                permission: true,
            },
        });
        const transformedPermissions = userPermissions.map((userPermission) => ({
            permissionId: userPermission.permission.id,
            name: userPermission.permission.name,
            value: userPermission.value,
            description: userPermission.permission.description || null,
        }));
        return transformedPermissions;
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getUserPermissions",
        });
    }
});
exports.getUserPermissions = getUserPermissions;
