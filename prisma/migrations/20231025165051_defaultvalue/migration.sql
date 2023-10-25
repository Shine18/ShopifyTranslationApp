-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "plan" INTEGER,
    "baseLanguageCode" TEXT,
    "TargetLanguagesCode" TEXT,
    "wordsUsed" INTEGER DEFAULT 0
);
INSERT INTO "new_Shop" ("TargetLanguagesCode", "baseLanguageCode", "id", "plan", "shop", "wordsUsed") SELECT "TargetLanguagesCode", "baseLanguageCode", "id", "plan", "shop", "wordsUsed" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
