/*
  Warnings:

  - You are about to drop the column `userId` on the `role_permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_userId_fkey";

-- AlterTable
ALTER TABLE "role_permissions" DROP COLUMN "userId";
