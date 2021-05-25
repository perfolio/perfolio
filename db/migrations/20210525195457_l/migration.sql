-- CreateTable
CREATE TABLE "Price" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("symbol","time")
);
