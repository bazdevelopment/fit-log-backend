-- AlterTable
ALTER TABLE "app_users" ADD COLUMN     "activity_level" TEXT,
ADD COLUMN     "goal" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "weight" INTEGER;
