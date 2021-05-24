/*
  Warnings:

  - A unique constraint covering the columns `[symbol,time]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `time` on the `Price` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `executedAt` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "executedAt",
ADD COLUMN     "executedAt" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Price_symbol_time_unique_constraint" ON "Price"("symbol", "time");
