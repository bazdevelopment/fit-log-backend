/*
  Warnings:

  - You are about to drop the column `bodyPart` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `gifUrl` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryMuscles` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `body_part` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gif_url` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "bodyPart",
DROP COLUMN "gifUrl",
DROP COLUMN "secondaryMuscles",
ADD COLUMN     "body_part" TEXT NOT NULL,
ADD COLUMN     "gif_url" TEXT NOT NULL,
ADD COLUMN     "secondary_muscles" TEXT[];
