-- DropForeignKey
ALTER TABLE "gym_visits" DROP CONSTRAINT "gym_visits_card_membership_id_fkey";

-- AddForeignKey
ALTER TABLE "gym_visits" ADD CONSTRAINT "gym_visits_card_membership_id_fkey" FOREIGN KEY ("card_membership_id") REFERENCES "membership_card"("card_number") ON DELETE CASCADE ON UPDATE CASCADE;
