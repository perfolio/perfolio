/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSubscriptionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Subscription";

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "readAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.stripeSubscriptionId_unique" ON "User"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
