/*
  Warnings:

  - The primary key for the `StockPosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stockAccountId` on the `StockPosition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockPosition" DROP CONSTRAINT "StockPosition_stockAccountId_fkey";

-- AlterTable
ALTER TABLE "StockPosition" DROP CONSTRAINT "StockPosition_pkey",
DROP COLUMN "stockAccountId",
ADD CONSTRAINT "StockPosition_pkey" PRIMARY KEY ("stockId");
