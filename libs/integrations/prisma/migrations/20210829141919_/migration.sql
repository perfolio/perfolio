/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Subscription.stripeCustomerId_unique";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "stripeCustomerId";
