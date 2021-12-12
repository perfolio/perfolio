/*
  Warnings:

  - A unique constraint covering the columns `[publicAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `publicAddress` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_publicAddress_key` ON `User`(`publicAddress`);
