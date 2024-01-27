/*
  Warnings:

  - Added the required column `salt_otp` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `otp_code` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "salt_otp" TEXT NOT NULL,
ALTER COLUMN "otp_code" SET NOT NULL,
ALTER COLUMN "otp_code" SET DATA TYPE TEXT;
