/*
  Warnings:

  - You are about to drop the column `value` on the `permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "value";

-- CreateTable
CREATE TABLE "user_permission" (
    "user_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "user_permission_pkey" PRIMARY KEY ("user_id","permission_id")
);

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
