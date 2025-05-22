-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
