/*
  Warnings:

  - Made the column `avatar_image` on table `app_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sex` on table `app_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birth_date` on table `app_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `app_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `app_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "app_users" ALTER COLUMN "avatar_image" SET NOT NULL,
ALTER COLUMN "sex" SET NOT NULL,
ALTER COLUMN "birth_date" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL;
