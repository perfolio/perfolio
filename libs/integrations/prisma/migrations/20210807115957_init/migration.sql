-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetId" TEXT NOT NULL,
    "executedAt" INTEGER NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "defaultCurrency" "Currency" NOT NULL,
    "defaultExchange" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StockMap" (
    "ticker" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("ticker")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.name_unique" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings.userId_unique" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StockMap.isin_unique" ON "StockMap"("isin");

-- CreateIndex
CREATE UNIQUE INDEX "StockMap.name_unique" ON "StockMap"("name");
