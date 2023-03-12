/*
  Warnings:

  - You are about to drop the column `numOfShares` on the `StockPosition` table. All the data in the column will be lost.
  - Added the required column `shares` to the `StockPosition` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StockPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "avgCost" DECIMAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "balancePrice" DECIMAL NOT NULL,
    CONSTRAINT "StockPosition_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StockPosition" ("avgCost", "balancePrice", "cost", "id", "stockAccountId", "stockId", "stockName") SELECT "avgCost", "balancePrice", "cost", "id", "stockAccountId", "stockId", "stockName" FROM "StockPosition";
DROP TABLE "StockPosition";
ALTER TABLE "new_StockPosition" RENAME TO "StockPosition";
CREATE UNIQUE INDEX "StockPosition_stockId_key" ON "StockPosition"("stockId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
