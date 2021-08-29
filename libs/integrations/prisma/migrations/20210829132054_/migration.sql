/*
  Warnings:

  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Subscription` table. All the data in the column will be lost.
  - Made the column `payedUntil` on table `Subscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeSubscriptionId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Subscription.stripeSubscriptionId_unique";

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "id",
ALTER COLUMN "payedUntil" SET NOT NULL,
ALTER COLUMN "stripeSubscriptionId" SET NOT NULL,
ADD PRIMARY KEY ("stripeSubscriptionId");
