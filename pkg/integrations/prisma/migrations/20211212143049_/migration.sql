/*
  Warnings:

  - You are about to drop the column `publicAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[magicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `magicId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_publicAddress_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `publicAddress`,
    ADD COLUMN `magicId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_magicId_key` ON `User`(`magicId`);
