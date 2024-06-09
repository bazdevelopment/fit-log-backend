/*
  Warnings:

  - You are about to drop the column `number` on the `membership_card` table. All the data in the column will be lost.
  - You are about to drop the column `card_id` on the `visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_number]` on the table `membership_card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_number` to the `membership_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_membership_id` to the `visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visit" DROP CONSTRAINT "visit_card_id_fkey";

-- DropIndex
DROP INDEX "membership_card_number_key";

-- AlterTable
ALTER TABLE "membership_card" DROP COLUMN "number",
ADD COLUMN     "card_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visit" DROP COLUMN "card_id",
ADD COLUMN     "card_membership_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "membership_card_card_number_key" ON "membership_card"("card_number");

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_card_membership_id_fkey" FOREIGN KEY ("card_membership_id") REFERENCES "membership_card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
