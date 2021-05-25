-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isin" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exchange" TEXT,
    "industry" TEXT,
    "website" TEXT,
    "description" TEXT NOT NULL,
    "ceo" TEXT,
    "issueType" TEXT,
    "sector" TEXT,
    "employees" INTEGER,
    "securityName" TEXT,
    "primarySICCode" INTEGER,
    "address" TEXT,
    "address2" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "phone" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company.isin_unique" ON "Company"("isin");

-- CreateIndex
CREATE UNIQUE INDEX "Company.symbol_unique" ON "Company"("symbol");
