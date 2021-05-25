/*
  Warnings:

  - You are about to drop the column `assetID` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "assetID",
DROP COLUMN "userID",
ADD COLUMN     "assetId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
