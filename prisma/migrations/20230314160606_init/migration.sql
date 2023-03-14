-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "industryType" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockAccount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "minFee" INTEGER NOT NULL,
    "regularFee" INTEGER NOT NULL,
    "feeDiscount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "StockAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPosition" (
    "id" SERIAL NOT NULL,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "avgCost" DECIMAL(65,30) NOT NULL,
    "cost" INTEGER NOT NULL,
    "balancePrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "StockPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "amount" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "feeAfterDiscount" INTEGER NOT NULL,
    "transactionTax" INTEGER NOT NULL,
    "transactionCost" INTEGER NOT NULL,
    "actualPayment" INTEGER NOT NULL,
    "bookPayment" INTEGER NOT NULL,

    CONSTRAINT "StockTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_stockId_key" ON "Stock"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockAccount_name_key" ON "StockAccount"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StockPosition_stockId_key" ON "StockPosition"("stockId");

-- AddForeignKey
ALTER TABLE "StockPosition" ADD CONSTRAINT "StockPosition_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransaction" ADD CONSTRAINT "StockTransaction_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
