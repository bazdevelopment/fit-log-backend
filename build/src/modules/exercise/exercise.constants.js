"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXERCISE_ROUTES = exports.GET_EXERCISES_BY_BODY_PART_LIST = exports.GET_BODY_PART_LIST_ROUTE = exports.GET_EQUIPMENT_LIST_ROUTE = exports.GET_MUSCLE_TARGET_LIST_ROUTE = exports.GET_EXERCISE_BY_EQUIPMENT_ROUTE = exports.GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE = exports.GET_EXERCISE_BY_ID_ROUTE = exports.GET_EXERCISES_BY_NAME_ROUTE = exports.GET_EXERCISES_ROUTE = exports.BODY_PART = exports.EXERCISE_EQUIPMENT = exports.MUSCLE_TARGET = void 0;
var MUSCLE_TARGET;
(function (MUSCLE_TARGET) {
    MUSCLE_TARGET["Abductors"] = "abductors";
    MUSCLE_TARGET["Abs"] = "abs";
    MUSCLE_TARGET["Adductors"] = "adductors";
    MUSCLE_TARGET["Biceps"] = "biceps";
    MUSCLE_TARGET["Calves"] = "calves";
    MUSCLE_TARGET["CardiovascularSystem"] = "cardiovascular system";
    MUSCLE_TARGET["Delts"] = "delts";
    MUSCLE_TARGET["Forearms"] = "forearms";
    MUSCLE_TARGET["Glutes"] = "glutes";
    MUSCLE_TARGET["Hamstrings"] = "hamstrings";
    MUSCLE_TARGET["Lats"] = "lats";
    MUSCLE_TARGET["LevatorScapulae"] = "levator scapulae";
    MUSCLE_TARGET["Pectorals"] = "pectorals";
    MUSCLE_TARGET["Quads"] = "quads";
    MUSCLE_TARGET["SerratusAnterior"] = "serratus anterior";
    MUSCLE_TARGET["Spine"] = "spine";
    MUSCLE_TARGET["Traps"] = "traps";
    MUSCLE_TARGET["Triceps"] = "triceps";
    MUSCLE_TARGET["UpperBack"] = "upper back";
})(MUSCLE_TARGET || (exports.MUSCLE_TARGET = MUSCLE_TARGET = {}));
var EXERCISE_EQUIPMENT;
(function (EXERCISE_EQUIPMENT) {
    EXERCISE_EQUIPMENT["Assisted"] = "assisted";
    EXERCISE_EQUIPMENT["Band"] = "band";
    EXERCISE_EQUIPMENT["Barbell"] = "barbell";
    EXERCISE_EQUIPMENT["BodyWeight"] = "body weight";
    EXERCISE_EQUIPMENT["BosuBall"] = "bosu ball";
    EXERCISE_EQUIPMENT["Cable"] = "cable";
    EXERCISE_EQUIPMENT["Dumbbell"] = "dumbbell";
    EXERCISE_EQUIPMENT["EllipticalMachine"] = "elliptical machine";
    EXERCISE_EQUIPMENT["EZBarbell"] = "ez barbell";
    EXERCISE_EQUIPMENT["Hammer"] = "hammer";
    EXERCISE_EQUIPMENT["Kettlebell"] = "kettlebell";
    EXERCISE_EQUIPMENT["LeverageMachine"] = "leverage machine";
    EXERCISE_EQUIPMENT["MedicineBall"] = "medicine ball";
    EXERCISE_EQUIPMENT["OlympicBarbell"] = "olympic barbell";
    EXERCISE_EQUIPMENT["ResistanceBand"] = "resistance band";
    EXERCISE_EQUIPMENT["Roller"] = "roller";
    EXERCISE_EQUIPMENT["Rope"] = "rope";
    EXERCISE_EQUIPMENT["SkiergMachine"] = "skierg machine";
    EXERCISE_EQUIPMENT["SledMachine"] = "sled machine";
    EXERCISE_EQUIPMENT["SmithMachine"] = "smith machine";
    EXERCISE_EQUIPMENT["StabilityBall"] = "stability ball";
    EXERCISE_EQUIPMENT["StationaryBike"] = "stationary bike";
    EXERCISE_EQUIPMENT["StepmillMachine"] = "stepmill machine";
    EXERCISE_EQUIPMENT["Tire"] = "tire";
    EXERCISE_EQUIPMENT["TrapBar"] = "trap bar";
    EXERCISE_EQUIPMENT["UpperBodyErgometer"] = "upper body ergometer";
    EXERCISE_EQUIPMENT["Weighted"] = "weighted";
    EXERCISE_EQUIPMENT["WheelRoller"] = "wheel roller";
})(EXERCISE_EQUIPMENT || (exports.EXERCISE_EQUIPMENT = EXERCISE_EQUIPMENT = {}));
var BODY_PART;
(function (BODY_PART) {
    BODY_PART["Back"] = "back";
    BODY_PART["Cardio"] = "cardio";
    BODY_PART["Chest"] = "chest";
    BODY_PART["LowerArms"] = "lower arms";
    BODY_PART["LowerLegs"] = "lower legs";
    BODY_PART["Neck"] = "neck";
    BODY_PART["Shoulders"] = "shoulders";
    BODY_PART["UpperArms"] = "upper arms";
    BODY_PART["UpperLegs"] = "upper legs";
    BODY_PART["Waist"] = "waist";
})(BODY_PART || (exports.BODY_PART = BODY_PART = {}));
exports.GET_EXERCISES_ROUTE = "/";
exports.GET_EXERCISES_BY_NAME_ROUTE = "/search";
exports.GET_EXERCISE_BY_ID_ROUTE = "/:exerciseId";
exports.GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE = "/target";
exports.GET_EXERCISE_BY_EQUIPMENT_ROUTE = "/equipment";
exports.GET_MUSCLE_TARGET_LIST_ROUTE = "/muscle-target-list";
exports.GET_EQUIPMENT_LIST_ROUTE = "/equipment-list";
exports.GET_BODY_PART_LIST_ROUTE = "/body-part-list";
exports.GET_EXERCISES_BY_BODY_PART_LIST = "/body-part";
exports.EXERCISE_ROUTES = {
    GET_EXERCISES_ROUTE: exports.GET_EXERCISES_ROUTE,
    GET_EXERCISES_BY_NAME_ROUTE: exports.GET_EXERCISES_BY_NAME_ROUTE,
    GET_EXERCISE_BY_ID_ROUTE: exports.GET_EXERCISE_BY_ID_ROUTE,
    GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE: exports.GET_EXERCISE_BY_MUSCLE_TARGET_ROUTE,
    GET_EXERCISE_BY_EQUIPMENT_ROUTE: exports.GET_EXERCISE_BY_EQUIPMENT_ROUTE,
    GET_MUSCLE_TARGET_LIST_ROUTE: exports.GET_MUSCLE_TARGET_LIST_ROUTE,
    GET_EQUIPMENT_LIST_ROUTE: exports.GET_EQUIPMENT_LIST_ROUTE,
    GET_BODY_PART_LIST_ROUTE: exports.GET_BODY_PART_LIST_ROUTE,
    GET_EXERCISES_BY_BODY_PART_LIST: exports.GET_EXERCISES_BY_BODY_PART_LIST,
};
