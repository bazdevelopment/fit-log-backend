/*
  Warnings:

  - You are about to drop the column `sex` on the `app_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "sex",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "is_onboarded" BOOLEAN NOT NULL DEFAULT false;
