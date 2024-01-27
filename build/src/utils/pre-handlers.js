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
exports.withPermission = void 0;
const permission_services_1 = require("../modules/permission/permission.services");
const httpResponse_1 = require("./httpResponse");
/**
 * Checks if a user has a specific permission based on their assigned permissions.
 */
const hasPermission = (userPermissions, requiredPermission) => {
    return userPermissions.some((permission) => permission.name === requiredPermission && permission.value);
};
/**
 * Middleware function to enforce access control based on user permissions.
 */
const withPermission = (requiredPermission) => (request, _reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.user.id;
    const userPermissions = yield (0, permission_services_1.getUserPermissions)(userId);
    // Check if the user has the required permission
    if (!hasPermission(userPermissions, requiredPermission)) {
        return (0, httpResponse_1.createHttpException)({
            status: 403 /* HTTP_STATUS_CODE.FORBIDDEN */,
            message: "You don't have permission to access this endpoint",
        });
    }
});
exports.withPermission = withPermission;
