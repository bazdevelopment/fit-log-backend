-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_permission_id_fkey";

-- AlterTable
ALTER TABLE "user_permission" ADD COLUMN     "roleId" TEXT;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
