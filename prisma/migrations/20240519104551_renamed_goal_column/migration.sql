/*
  Warnings:

  - You are about to drop the column `goal` on the `app_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "goal",
ADD COLUMN     "goals" TEXT[] DEFAULT ARRAY[]::TEXT[];
