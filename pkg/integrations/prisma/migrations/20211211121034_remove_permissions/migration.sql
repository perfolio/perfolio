/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[description]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Role` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `_PermissionToRole`;

-- CreateIndex
CREATE UNIQUE INDEX `Role_description_key` ON `Role`(`description`);
