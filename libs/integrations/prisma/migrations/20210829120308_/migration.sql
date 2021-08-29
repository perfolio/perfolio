/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "payedUntil" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin";
