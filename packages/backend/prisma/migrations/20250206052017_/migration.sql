-- AlterEnum
ALTER TYPE "PlanType" ADD VALUE 'startup_partner';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SubscriptionStatus" ADD VALUE 'upgraded';
ALTER TYPE "SubscriptionStatus" ADD VALUE 'downgrade_scheduled';
ALTER TYPE "SubscriptionStatus" ADD VALUE 'pending_downgrade';

-- AlterTable
ALTER TABLE "subscription_history" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "nextPlanPriceId" TEXT,
ADD COLUMN     "nextPlanStartDate" TIMESTAMP(3),
ADD COLUMN     "prorationAmount" DOUBLE PRECISION;
