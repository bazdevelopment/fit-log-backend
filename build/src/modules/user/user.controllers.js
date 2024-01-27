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
exports.updateUserByUserIdController = exports.getCurrentUserController = void 0;
const user_services_1 = require("./user.services");
const httpResponse_1 = require("../../utils/httpResponse");
/**
 * getCurrentUserController
 * Used to get information about the user
 */
const getCurrentUserController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = request.user;
    const currentUser = yield (0, user_services_1.getUserById)(userId);
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        data: currentUser,
    }));
});
exports.getCurrentUserController = getCurrentUserController;
/**
 * updateUserByUserIdController
 * used to partially update some fields in the user profile table
 */
const updateUserByUserIdController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.params;
    const userInfoFields = request.body;
    const updatedUser = yield (0, user_services_1.updateUserByUserId)(userId, userInfoFields);
    return reply.code(202 /* HTTP_STATUS_CODE.ACCEPTED */).send((0, httpResponse_1.createSuccessResponse)({
        status: 202 /* HTTP_STATUS_CODE.ACCEPTED */,
        message: "User updated successfully!",
        data: updatedUser,
    }));
});
exports.updateUserByUserIdController = updateUserByUserIdController;
