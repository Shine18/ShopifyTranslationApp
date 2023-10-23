/*
  Warnings:

  - You are about to drop the `BaseLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TargetLanguage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN "TargetLanguagesCode" TEXT;
ALTER TABLE "Shop" ADD COLUMN "baseLanguageCode" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BaseLanguage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TargetLanguage";
PRAGMA foreign_keys=on;
