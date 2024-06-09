/*
  Warnings:

  - You are about to drop the `visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "visit" DROP CONSTRAINT "visit_card_membership_id_fkey";

-- DropForeignKey
ALTER TABLE "visit" DROP CONSTRAINT "visit_user_id_fkey";

-- DropTable
DROP TABLE "visit";

-- CreateTable
CREATE TABLE "gym_visits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_membership_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gym_visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gym_visits_user_id_key" ON "gym_visits"("user_id");

-- AddForeignKey
ALTER TABLE "gym_visits" ADD CONSTRAINT "gym_visits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_visits" ADD CONSTRAINT "gym_visits_card_membership_id_fkey" FOREIGN KEY ("card_membership_id") REFERENCES "membership_card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
