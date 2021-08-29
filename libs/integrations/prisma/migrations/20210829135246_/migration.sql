/*
  Warnings:

  - You are about to drop the column `payedUntil` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `currentPaymentPeriodEnd` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPaymentPeriodStart` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Made the column `stripeCustomerId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeSubscriptionId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "payedUntil",
ADD COLUMN     "currentPaymentPeriodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentPaymentPeriodStart" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "stripeCustomerId" SET NOT NULL,
ALTER COLUMN "stripeSubscriptionId" SET NOT NULL;
