/*
  Warnings:

  - You are about to drop the column `roleId` on the `user_permission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_roleId_fkey";

-- AlterTable
ALTER TABLE "user_permission" DROP COLUMN "roleId";
