/*
  Warnings:

  - You are about to alter the column `type` on the `ExchangeTradedAsset` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("ExchangeTradedAsset_type")`.

*/
-- AlterTable
ALTER TABLE `ExchangeTradedAsset` MODIFY `type` ENUM('MUTUAL_FUND', 'COMMON_STOCK', 'CRYPTO', 'TODO') NOT NULL;
