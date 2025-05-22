-- CreateEnum
CREATE TYPE "EmailABTestStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EmailScheduleType" AS ENUM ('ONE_TIME', 'RECURRING');

-- CreateEnum
CREATE TYPE "EmailScheduleStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EmailScheduleExecutionStatus" AS ENUM ('SUCCESS', 'FAILED', 'SKIPPED');

-- AlterTable
ALTER TABLE "email_templates" ADD COLUMN     "previewData" JSONB;

-- CreateTable
CREATE TABLE "email_ab_tests" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "variantA" JSONB NOT NULL,
    "variantB" JSONB NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "EmailABTestStatus" NOT NULL DEFAULT 'DRAFT',
    "winningVariant" TEXT,
    "metrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_ab_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_ab_test_results" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "clicked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_ab_test_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_schedules" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "recipientIds" TEXT[],
    "scheduleType" "EmailScheduleType" NOT NULL,
    "cronExpression" TEXT,
    "sendAt" TIMESTAMP(3),
    "variables" JSONB,
    "status" "EmailScheduleStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastRunAt" TIMESTAMP(3),
    "nextRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_schedule_execution_logs" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "status" "EmailScheduleExecutionStatus" NOT NULL,
    "emailLogId" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_schedule_execution_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_ab_tests" ADD CONSTRAINT "email_ab_tests_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "email_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_ab_test_results" ADD CONSTRAINT "email_ab_test_results_testId_fkey" FOREIGN KEY ("testId") REFERENCES "email_ab_tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_ab_test_results" ADD CONSTRAINT "email_ab_test_results_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "email_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_schedules" ADD CONSTRAINT "email_schedules_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "email_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_schedule_execution_logs" ADD CONSTRAINT "email_schedule_execution_logs_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "email_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_schedule_execution_logs" ADD CONSTRAINT "email_schedule_execution_logs_emailLogId_fkey" FOREIGN KEY ("emailLogId") REFERENCES "email_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
