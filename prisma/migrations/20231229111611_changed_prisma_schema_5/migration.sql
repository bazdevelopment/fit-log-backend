/*
  Warnings:

  - You are about to drop the column `userId` on the `app_auths` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `app_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_auths" DROP CONSTRAINT "app_auths_userId_fkey";

-- DropIndex
DROP INDEX "app_auths_userId_key";

-- AlterTable
ALTER TABLE "app_auths" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "app_users" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "app_users_userId_key" ON "app_users"("userId");

-- AddForeignKey
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_auths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
