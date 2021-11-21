/*
  Warnings:

  - You are about to drop the column `defaultExchangeMic` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `defaultExchangeMic`,
    ADD COLUMN `defaultExchangeId` VARCHAR(191) NULL;
