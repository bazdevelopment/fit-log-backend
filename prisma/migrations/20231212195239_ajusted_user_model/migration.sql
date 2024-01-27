-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "birth_date" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "password_reset_token" DROP NOT NULL,
ALTER COLUMN "password_reset_expires" DROP NOT NULL;
