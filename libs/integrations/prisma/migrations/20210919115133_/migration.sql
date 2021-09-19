/*
  Warnings:

  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `portfolioId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Access" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userId",
ADD COLUMN     "portfolioId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "access" "Access" NOT NULL,
    "grantReadAccess" TEXT[],

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "AuthenticationRequest.identifier_unique" RENAME TO "AuthenticationRequest_identifier_key";

-- RenameIndex
ALTER INDEX "Settings.userId_unique" RENAME TO "Settings_userId_key";

-- RenameIndex
ALTER INDEX "StockMap.isin_unique" RENAME TO "StockMap_isin_key";

-- RenameIndex
ALTER INDEX "StockMap.name_unique" RENAME TO "StockMap_name_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.stripeCustomerId_unique" RENAME TO "User_stripeCustomerId_key";

-- RenameIndex
ALTER INDEX "User.stripeSubscriptionId_unique" RENAME TO "User_stripeSubscriptionId_key";
