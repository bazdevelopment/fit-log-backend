/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "app_auths" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password_reset_token" TEXT DEFAULT '',
    "password_reset_expires" TIMESTAMP(3),
    "otp_code" TEXT NOT NULL,
    "salt_otp" TEXT NOT NULL,
    "otp_expiration" TIMESTAMP(3),
    "is_verified_otp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "app_auths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_users" (
    "id" INTEGER NOT NULL,
    "avatar_image" TEXT,
    "sex" TEXT,
    "birth_date" TIMESTAMP(3),
    "phone_number" TEXT,
    "nationality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_auths_id_key" ON "app_auths"("id");

-- CreateIndex
CREATE UNIQUE INDEX "app_auths_userId_key" ON "app_auths"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "app_auths_email_key" ON "app_auths"("email");

-- AddForeignKey
ALTER TABLE "app_auths" ADD CONSTRAINT "app_auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
