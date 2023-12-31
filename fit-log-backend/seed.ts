import { fitnessExercises } from "./mocks/exercises";
import prisma from "./src/config/prisma";

/**
 * helper function used to populate "fitness_exercises" db table with data
 */
const seedDatabase = async () => {
  for (const exercise of fitnessExercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }
};

seedDatabase()
  .catch((error) => {
    throw error;
  })
  .finally(() => prisma.$disconnect);
