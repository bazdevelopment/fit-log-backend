/*
  Warnings:

  - The primary key for the `app_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `app_users` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `permissions` table. All the data in the column will be lost.
  - The primary key for the `user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `user_role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `app_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_userId_fkey";

-- DropIndex
DROP INDEX "app_users_userId_key";

-- AlterTable
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "app_users_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "roleId",
ADD COLUMN     "role_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_pkey",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_user_id_key" ON "app_users"("user_id");

-- AddForeignKey
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_auths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
