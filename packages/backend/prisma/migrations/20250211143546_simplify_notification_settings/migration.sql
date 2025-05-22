/*
  Warnings:

  - You are about to drop the column `emailNotifications` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `notificationPreferences` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `pushNotifications` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_settings" DROP COLUMN "emailNotifications",
DROP COLUMN "notificationPreferences",
DROP COLUMN "pushNotifications",
ADD COLUMN     "directMessageEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "projectMessageEnabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password";
