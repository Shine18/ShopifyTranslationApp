-- CreateTable
CREATE TABLE "BaseLanguage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopifyId" TEXT NOT NULL,
    "baseLanguage" TEXT NOT NULL,
    "baseLanguageCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TargetLanguage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopifyId" TEXT NOT NULL,
    "targetLanguages" TEXT NOT NULL,
    "TargetLanguagesCode" TEXT NOT NULL
);
