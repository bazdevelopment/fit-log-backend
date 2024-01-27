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
exports.userRoutes = void 0;
const user_controllers_1 = require("./user.controllers");
const user_schemas_1 = require("./user.schemas");
const user_constants_1 = require("./user.constants");
/**
 * Routes associated to user model
 */
const userRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get(user_constants_1.USER_ROUTES.GET_CURRENT_USER_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            tags: ["User" /* SWAGGER_TAGS.USER */],
            summary: "Get current user",
            description: "Endpoint used to get the current user info",
        },
    }, user_controllers_1.getCurrentUserController);
    app.patch(user_constants_1.USER_ROUTES.UPDATE_USER_BY_USER_ID_ROUTE, {
        preHandler: [app.authenticate],
        schema: {
            body: (0, user_schemas_1.$ref)("userResponseToJsonSchema"),
            tags: ["User" /* SWAGGER_TAGS.USER */],
            summary: "Update the used by userId",
            description: "Endpoint user to update the user info",
        },
    }, user_controllers_1.updateUserByUserIdController);
});
exports.userRoutes = userRoutes;
