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
const exercises_1 = require("../mocks/exercises");
const prisma_1 = __importDefault(require("../src/config/prisma"));
/**
 * helper function used to populate "fitness_exercises" db table with data
 */
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const exercise of exercises_1.fitnessExercises) {
        yield prisma_1.default.exercise.create({
            data: exercise,
        });
    }
});
seedDatabase()
    .catch((error) => {
    throw error;
})
    .finally(() => prisma_1.default.$disconnect);
