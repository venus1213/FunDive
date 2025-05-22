-- DropForeignKey
ALTER TABLE "ErrorLog" DROP CONSTRAINT "ErrorLog_userId_fkey";

-- AlterTable
ALTER TABLE "ErrorLog" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "displayName" TEXT;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
