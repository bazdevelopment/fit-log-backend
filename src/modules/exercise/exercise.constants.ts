export enum MUSCLE_TARGET {
  Abductors = "abductors",
  Abs = "abs",
  Adductors = "adductors",
  Biceps = "biceps",
  Calves = "calves",
  CardiovascularSystem = "cardiovascular system",
  Delts = "delts",
  Forearms = "forearms",
  Glutes = "glutes",
  Hamstrings = "hamstrings",
  Lats = "lats",
  LevatorScapulae = "levator scapulae",
  Pectorals = "pectorals",
  Quads = "quads",
  SerratusAnterior = "serratus anterior",
  Spine = "spine",
  Traps = "traps",
  Triceps = "triceps",
  UpperBack = "upper back",
}

export enum EXERCISE_EQUIPMENT {
  Assisted = "assisted",
  Band = "band",
  Barbell = "barbell",
  BodyWeight = "body weight",
  BosuBall = "bosu ball",
  Cable = "cable",
  Dumbbell = "dumbbell",
  EllipticalMachine = "elliptical machine",
  EZBarbell = "ez barbell",
  Hammer = "hammer",
  Kettlebell = "kettlebell",
  LeverageMachine = "leverage machine",
  MedicineBall = "medicine ball",
  OlympicBarbell = "olympic barbell",
  ResistanceBand = "resistance band",
  Roller = "roller",
  Rope = "rope",
  SkiergMachine = "skierg machine",
  SledMachine = "sled machine",
  SmithMachine = "smith machine",
  StabilityBall = "stability ball",
  StationaryBike = "stationary bike",
  StepmillMachine = "stepmill machine",
  Tire = "tire",
  TrapBar = "trap bar",
  UpperBodyErgometer = "upper body ergometer",
  Weighted = "weighted",
  WheelRoller = "wheel roller",
}

export enum BODY_PART {
  Back = "back",
  Cardio = "cardio",
  Chest = "chest",
  LowerArms = "lower arms",
  LowerLegs = "lower legs",
  Neck = "neck",
  Shoulders = "shoulders",
  UpperArms = "upper arms",
  UpperLegs = "upper legs",
  Waist = "waist",
}

export const GET_EXERCISES_ROUTE = "/";
export const GET_EXERCISES_BY_NAME_ROUTE = "/search";
export const GET_EXERCISE_BY_ID_ROUTE = "/:exerciseId";
export const GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE = "/target";
export const GET_EXERCISE_BY_EQUIPMENT_ROUTE = "/equipment";
export const GET_MUSCLE_TARGET_LIST_ROUTE = "/muscle-target-list";
export const GET_EQUIPMENT_LIST_ROUTE = "/equipment-list";
export const GET_BODY_PART_LIST_ROUTE = "/body-part-list";
export const GET_EXERCISES_BY_BODY_PART_LIST = "/body-part";

export const EXERCISE_ROUTES = {
  GET_EXERCISES_ROUTE,
  GET_EXERCISES_BY_NAME_ROUTE,
  GET_EXERCISE_BY_ID_ROUTE,
  GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE,
  GET_EXERCISE_BY_EQUIPMENT_ROUTE,
  GET_MUSCLE_TARGET_LIST_ROUTE,
  GET_EQUIPMENT_LIST_ROUTE,
  GET_BODY_PART_LIST_ROUTE,
  GET_EXERCISES_BY_BODY_PART_LIST,
};
