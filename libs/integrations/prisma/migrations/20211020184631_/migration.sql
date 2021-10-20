/*
  Warnings:

  - You are about to drop the column `auth0UserId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_auth0UserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth0UserId";
