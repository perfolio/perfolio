/*
  Warnings:

  - Added the required column `mic` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `mic` VARCHAR(191) NOT NULL;
