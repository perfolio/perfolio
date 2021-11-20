/*
  Warnings:

  - Added the required column `logo` to the `ExchangeTradedAsset` table without a default value. This is not possible if the table is not empty.
  - Made the column `figi` on table `ExchangeTradedAsset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ExchangeTradedAsset` ADD COLUMN `logo` VARCHAR(191) NOT NULL,
    MODIFY `figi` VARCHAR(191) NOT NULL;
