/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentPaymentPeriodEnd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPaymentPeriodStart` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSubscriptionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUB_GROWTH', 'SUB_PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentPaymentPeriodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentPaymentPeriodStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "roles" "Role"[],
ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "tokenHash" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "AuthenticationRequest" (
    "hashedToken" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("hashedToken")
);

-- CreateTable
CREATE TABLE "Login" (
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId","time")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthenticationRequest.identifier_unique" ON "AuthenticationRequest"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "User.stripeSubscriptionId_unique" ON "User"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
