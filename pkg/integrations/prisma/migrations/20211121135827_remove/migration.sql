/*
  Warnings:

  - You are about to alter the column `defaultCurrency` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Enum("Settings_defaultCurrency")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Settings` MODIFY `defaultCurrency` VARCHAR(191) NOT NULL;
