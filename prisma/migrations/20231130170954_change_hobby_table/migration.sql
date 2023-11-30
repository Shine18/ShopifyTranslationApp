/*
  Warnings:

  - You are about to drop the column `translation` on the `pagectorder` table. All the data in the column will be lost.
  - Added the required column `token` to the `PagectOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenTranslation` to the `PagectOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagectorder` DROP COLUMN `translation`,
    ADD COLUMN `token` LONGTEXT NOT NULL,
    ADD COLUMN `tokenTranslation` LONGTEXT NOT NULL;
