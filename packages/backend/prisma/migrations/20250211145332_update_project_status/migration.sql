/*
  Warnings:

  - The values [closed] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('draft', 'active', 'suspended');
ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "projects" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;
