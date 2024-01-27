/*
  Warnings:

  - You are about to drop the column `role_id` on the `permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_role_id_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "role_id";
