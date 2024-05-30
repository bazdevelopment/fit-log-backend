import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createWorkoutFields = {
  name: z.string(),
  musclesGroupTarget: z.array(z.string()),
  creationDate: z.string().optional(),
};

export const createWorkoutSchema = z.object(createWorkoutFields);
export const addExercisesToWorkoutSchema = z.object({
  exercisesIds: z.array(z.string()),
});

export const createWorkoutResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  musclesGroupTarget: z.array(z.string()),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const addExerciseToWorkoutSchemaResponse = z.object({
  id: z.string(),
  workoutId: z.string(),
  exerciseId: z.string(),
});

export const addSetToWorkoutExerciseSchema = z.object({
  weight: z.number(),
  reps: z.number(),
});
export const addSetToWorkoutExerciseResponseSchema = z.object({
  id: z.string(),
  workoutExerciseId: z.string(),
  weight: z.number(),
  reps: z.number(),
});

export const updateWorkoutNameSchema = z.object({
  name: z.string(),
});

export const { schemas: workoutSchemas, $ref } = buildJsonSchemas(
  {
    createWorkoutJsonSchema: createWorkoutSchema,
    addSetToWorkoutExerciseJsonSchema: addSetToWorkoutExerciseSchema,
    updateWorkoutNameJsonSchema: updateWorkoutNameSchema,
    addExercisesToWorkoutJsonSchema: addExercisesToWorkoutSchema,
  },
  { $id: "workoutSchema" }
);
