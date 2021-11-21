/*
  Warnings:

  - Made the column `defaultExchangeId` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Settings` MODIFY `defaultExchangeId` VARCHAR(191) NOT NULL;
