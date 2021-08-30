-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "visibleAfter" TIMESTAMP(3),
ADD COLUMN     "visibleBefore" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
