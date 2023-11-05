-- CreateTable
CREATE TABLE `HumanPageStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `baseLanguageCode` VARCHAR(191) NOT NULL,
    `TargetLanguagesCode` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `pageData` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HumanProductStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `baseLanguageCode` VARCHAR(191) NOT NULL,
    `TargetLanguagesCode` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productData` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
