/*
  Warnings:

  - You are about to drop the `StockValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StockValue";

-- CreateTable
CREATE TABLE "StockValueTrend" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockValueTrend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockExDividendRecord" (
    "id" SERIAL NOT NULL,
    "exDividendDate" TIMESTAMP(3) NOT NULL,
    "dividendPayDate" TIMESTAMP(3) NOT NULL,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "cashDividend" DECIMAL(65,30) NOT NULL,
    "cashDividendPayable" INTEGER NOT NULL,
    "stockDividend" DECIMAL(65,30) NOT NULL,
    "stockDividendPayable" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "healthInsurance" INTEGER NOT NULL,
    "cashActualPayment" INTEGER NOT NULL,
    "stockActualPayment" INTEGER NOT NULL,

    CONSTRAINT "StockExDividendRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockExDividendRecord" ADD CONSTRAINT "StockExDividendRecord_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockExDividendRecord" ADD CONSTRAINT "StockExDividendRecord_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
