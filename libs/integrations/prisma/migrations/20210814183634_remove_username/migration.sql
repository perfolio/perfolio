/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User.name_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
