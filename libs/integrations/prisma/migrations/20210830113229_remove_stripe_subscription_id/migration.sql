/*
  Warnings:

  - You are about to drop the column `stripeSubscriptionId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User.stripeSubscriptionId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeSubscriptionId";
