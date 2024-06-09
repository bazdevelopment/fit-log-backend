/*
  Warnings:

  - A unique constraint covering the columns `[cardId]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "app_users" ADD COLUMN     "cardId" INTEGER;

-- CreateTable
CREATE TABLE "visit" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_card" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "membership_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visit_user_id_key" ON "visit"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_card_number_key" ON "membership_card"("number");

-- CreateIndex
CREATE UNIQUE INDEX "membership_card_user_id_key" ON "membership_card"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_cardId_key" ON "app_users"("cardId");

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "membership_card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_card" ADD CONSTRAINT "membership_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
