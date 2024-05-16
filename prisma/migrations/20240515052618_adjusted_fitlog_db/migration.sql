/*
  Warnings:

  - You are about to drop the column `first_name` on the `app_auths` table. All the data in the column will be lost.
  - Added the required column `user_name` to the `app_auths` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_auths" DROP COLUMN "first_name",
ADD COLUMN     "user_name" TEXT NOT NULL;
