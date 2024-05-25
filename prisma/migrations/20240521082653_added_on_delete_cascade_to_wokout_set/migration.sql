-- DropForeignKey
ALTER TABLE "workout_sets" DROP CONSTRAINT "workout_sets_workout_exercise_id_fkey";

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workout_exercise_id_fkey" FOREIGN KEY ("workout_exercise_id") REFERENCES "workout_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
