/*
  Warnings:

  - You are about to drop the column `password_reset_expires` on the `app_auths` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `app_auths` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_auths" DROP COLUMN "password_reset_expires",
DROP COLUMN "password_reset_token";
