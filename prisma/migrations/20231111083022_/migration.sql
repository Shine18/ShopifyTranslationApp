/*
  Warnings:

  - Added the required column `pageTitle` to the `HumanPageStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTitle` to the `HumanProductStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `humanpagestore` ADD COLUMN `pageTitle` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `humanproductstore` ADD COLUMN `productTitle` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ProductOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productTitle` VARCHAR(191) NOT NULL,
    `languageCode` VARCHAR(191) NOT NULL,
    `translation` LONGTEXT NOT NULL,
    `markcomplete` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PagectOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `pageTitle` VARCHAR(191) NOT NULL,
    `languageCode` VARCHAR(191) NOT NULL,
    `translation` LONGTEXT NOT NULL,
    `markcomplete` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
