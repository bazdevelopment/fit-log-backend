/*
  Warnings:

  - Added the required column `muscular_group` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_exercises" ADD COLUMN     "muscular_group" TEXT NOT NULL;
