/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `StockValueTrend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockValueTrend" DROP COLUMN "updatedAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
