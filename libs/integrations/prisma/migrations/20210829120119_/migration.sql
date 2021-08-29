/*
  Warnings:

  - You are about to drop the column `payedUntil` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payedUntil` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeCustomerId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSubscriptionId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.stripeCustomerId_unique";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "payedUntil" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "payedUntil",
DROP COLUMN "plan",
DROP COLUMN "stripeCustomerId";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription.stripeSubscriptionId_unique" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription.stripeCustomerId_unique" ON "Subscription"("stripeCustomerId");
