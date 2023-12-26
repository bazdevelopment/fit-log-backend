-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_verified_otp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp_code" INTEGER,
ADD COLUMN     "otp_expiration" TIMESTAMP(3);
