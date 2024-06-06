const CREATE_WORKOUT_ROUTE = "/";
const ADD_EXERCISE_TO_WORKOUT = "/:workoutId/exercises/:exerciseId";
const ADD_MULTIPLE_EXERCISES_TO_WORKOUT = "/:workoutId/exercises";
const ADD_SET_TO_WORKOUT_EXERCISE = "/workout-exercise-set/:workoutExerciseId";
const ADD_MULTIPLE_SETS_TO_WORKOUT_EXERCISE = "/workout-exercise-sets";
const UPDATE_WORKOUT_NAME = "/:workoutId";
const DELETE_WORKOUT = "/:workoutId";
const UPDATE_SET = "/workout-sets/:setId";
const DELETE_SET = "/workout-sets/:setId";
const GET_DETAILED_WORKOUT = "/:workoutId";
const GET_USER_WORKOUTS = "/user-workouts";
const GET_USER_WORKOUTS_BY_DATE = "/user-workouts/:date";

export const WORKOUT_ROUTES = {
  CREATE_WORKOUT_ROUTE,
  ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_WORKOUT_EXERCISE,
  UPDATE_WORKOUT_NAME,
  DELETE_WORKOUT,
  UPDATE_SET,
  DELETE_SET,
  GET_DETAILED_WORKOUT,
  GET_USER_WORKOUTS,
  GET_USER_WORKOUTS_BY_DATE,
  ADD_MULTIPLE_EXERCISES_TO_WORKOUT,
  ADD_MULTIPLE_SETS_TO_WORKOUT_EXERCISE,
};
