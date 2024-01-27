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
const prisma_1 = __importDefault(require("../src/config/prisma"));
const permissions_name_1 = require("../src/enums/permissions-name");
const generateUniqueId_1 = require("../src/utils/generateUniqueId");
/**
 * helper function used to populate permissions db table with data
 */
const transformedUserPermissions = Object.keys(permissions_name_1.PERMISSIONS_NAME).map((name) => name);
/** Populate the permissions table */
const seedPermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const userPermission of transformedUserPermissions) {
        yield prisma_1.default.permission.create({
            data: {
                id: (0, generateUniqueId_1.generateUniqueId)(),
                name: userPermission,
            },
        });
    }
});
seedPermissions()
    .catch((error) => {
    throw error;
})
    .finally(() => prisma_1.default.$disconnect);
