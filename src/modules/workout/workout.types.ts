import z from "zod";

import {
  addExerciseToWorkoutSchemaResponse,
  addExercisesToWorkoutSchema,
  addSetToWorkoutExerciseResponseSchema,
  addSetToWorkoutExerciseSchema,
  createWorkoutResponseSchema,
  createWorkoutSchema,
  updateWorkoutNameSchema,
} from "./workout.schemas";
import { TExercisesResponse } from "../exercise/exercise.types";

export type TWorkout = z.infer<typeof createWorkoutSchema>;
export type TCreateWorkoutResponse = z.infer<
  typeof createWorkoutResponseSchema
>;
export type TAddExerciseToWorkoutResponse = z.infer<
  typeof addExerciseToWorkoutSchemaResponse
>;
export type TAddSetToWorkoutExercise = z.infer<
  typeof addSetToWorkoutExerciseSchema
>;
export type TAddSetToWorkoutExerciseResponse = z.infer<
  typeof addSetToWorkoutExerciseResponseSchema
>;
export type TUpdateWorkoutName = z.infer<typeof updateWorkoutNameSchema>;
export type TUpdateWorkoutNameResponse = z.infer<
  typeof updateWorkoutNameSchema
>;
export type TMultipleExercisesToWorkout = z.infer<
  typeof addExercisesToWorkoutSchema
>;

export type TWorkoutSetAndExercises = TWorkout & {
  exercises: TExerciseWithSets[];
};

export type TExerciseWithSets = {
  id: string;
  set: any;
  workoutId: string;
  exercise: TExercisesResponse;
  exerciseId: string;
};

export interface IMultipleSetsToWorkoutExercise {
  [id: string]: TAddSetToWorkoutExercise[];
}

export interface IWorkoutActionData {
  startDateTime?: Date;
  endDateTime?: Date;
}
