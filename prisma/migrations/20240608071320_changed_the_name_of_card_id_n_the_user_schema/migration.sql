/*
  Warnings:

  - You are about to drop the column `cardId` on the `app_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_membership_id]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "app_users_cardId_key";

-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "cardId",
ADD COLUMN     "card_membership_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "app_users_card_membership_id_key" ON "app_users"("card_membership_id");
