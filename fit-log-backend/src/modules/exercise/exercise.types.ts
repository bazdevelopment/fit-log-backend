import { z } from "zod";
import { exercisesResponseSchema } from "./exercise.schemas";

export type TExercisesResponse = z.infer<typeof exercisesResponseSchema>;
