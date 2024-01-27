-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_role_id_fkey";

-- AlterTable
ALTER TABLE "role_permissions" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
