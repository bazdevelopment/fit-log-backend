/*
  Warnings:

  - The primary key for the `app_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `app_users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_userId_fkey";

-- DropIndex
DROP INDEX "app_users_id_key";

-- AlterTable
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "app_users_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_auths"("id") ON DELETE CASCADE ON UPDATE CASCADE;
