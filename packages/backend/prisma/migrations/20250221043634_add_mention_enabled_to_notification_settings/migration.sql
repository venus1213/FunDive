-- AlterTable
ALTER TABLE "notification_settings" ADD COLUMN     "mentionEnabled" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "notification_archives" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "relatedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentionedInMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "notification_archives_userId_idx" ON "notification_archives"("userId");

-- CreateIndex
CREATE INDEX "notification_archives_createdAt_idx" ON "notification_archives"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_MentionedInMessages_AB_unique" ON "_MentionedInMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_MentionedInMessages_B_index" ON "_MentionedInMessages"("B");

-- AddForeignKey
ALTER TABLE "notification_archives" ADD CONSTRAINT "notification_archives_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentionedInMessages" ADD CONSTRAINT "_MentionedInMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentionedInMessages" ADD CONSTRAINT "_MentionedInMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
