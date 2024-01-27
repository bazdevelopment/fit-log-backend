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
exports.updateUserByUserId = exports.getUserById = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * Service used to retrieve the user profile information (we do not include passwords/hashed or other confidential information)
 */
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [authData, userData] = yield Promise.all([
            prisma_1.default.auth.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    isVerifiedOtp: true,
                },
            }),
            prisma_1.default.user.findUnique({
                where: {
                    userId,
                },
                select: {
                    avatarImage: true,
                    sex: true,
                    birthDate: true,
                    nationality: true,
                    phoneNumber: true,
                },
            }),
        ]);
        return Object.assign(Object.assign({}, authData), userData);
    }
    catch (error) {
        const errorResponse = error;
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "getUserById",
        });
    }
});
exports.getUserById = getUserById;
/**
 * Service used to perform the request to prisma db in order to update the user info
 */
const updateUserByUserId = (userId, userInfoFields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.update({
            where: { userId },
            data: userInfoFields,
        });
    }
    catch (error) {
        const errorResponse = error;
        throw (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "updateUserByUserId",
        });
    }
});
exports.updateUserByUserId = updateUserByUserId;
