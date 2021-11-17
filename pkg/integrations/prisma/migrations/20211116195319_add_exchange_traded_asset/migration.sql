-- CreateTable
CREATE TABLE `ExchangeTradedAsset` (
    `id` VARCHAR(191) NOT NULL,
    `isin` VARCHAR(191) NOT NULL,
    `ticker` VARCHAR(191) NOT NULL,
    `figi` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ExchangeTradedAsset_isin_key`(`isin`),
    UNIQUE INDEX `ExchangeTradedAsset_ticker_key`(`ticker`),
    UNIQUE INDEX `ExchangeTradedAsset_figi_key`(`figi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
