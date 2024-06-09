/*
  Warnings:

  - A unique constraint covering the columns `[card_membership_id]` on the table `gym_visits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gym_visits_card_membership_id_key" ON "gym_visits"("card_membership_id");
