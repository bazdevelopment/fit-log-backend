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
const generateUniqueId_1 = require("../src/utils/generateUniqueId");
/**
 * helper function used to populate roles db table with data
 */
const roles = [
    { id: (0, generateUniqueId_1.generateUniqueId)(), name: "USER" },
    { id: (0, generateUniqueId_1.generateUniqueId)(), name: "ADMIN" },
];
/** populate the roles table */
const seedRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const role of roles) {
        yield prisma_1.default.role.create({
            data: { id: role.id, name: role.name },
        });
    }
});
seedRoles()
    .catch((error) => {
    throw error;
})
    .finally(() => prisma_1.default.$disconnect);
