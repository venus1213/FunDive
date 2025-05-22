-- AlterTable
ALTER TABLE "users" ADD COLUMN     "invitationExpires" TIMESTAMP(3),
ADD COLUMN     "invitedBy" TEXT;
