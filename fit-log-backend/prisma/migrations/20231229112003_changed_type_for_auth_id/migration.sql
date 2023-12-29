/*
  Warnings:

  - The primary key for the `app_auths` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_userId_fkey";

-- AlterTable
ALTER TABLE "app_auths" DROP CONSTRAINT "app_auths_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "app_auths_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "app_auths_id_seq";

-- AlterTable
ALTER TABLE "app_users" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "app_users_id_key" ON "app_users"("id");

-- AddForeignKey
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_auths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
