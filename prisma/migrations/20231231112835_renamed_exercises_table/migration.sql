/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exercise";

-- CreateTable
CREATE TABLE "fitness_exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "gif_url" TEXT NOT NULL,
    "image" TEXT,
    "secondary_muscles" TEXT[],
    "instructions" TEXT[],

    CONSTRAINT "fitness_exercises_pkey" PRIMARY KEY ("id")
);
