/*
  Warnings:

  - The primary key for the `_MentionedInMessages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_MentionedInMessages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_MentionedInMessages" DROP CONSTRAINT "_MentionedInMessages_AB_pkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isInvited" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "_MentionedInMessages_AB_unique" ON "_MentionedInMessages"("A", "B");
