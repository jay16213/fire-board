-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "industryType" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StockAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "minFee" INTEGER NOT NULL,
    "regularFee" INTEGER NOT NULL,
    "feeDiscount" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "StockPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "numOfShares" INTEGER NOT NULL,
    "avgCost" DECIMAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "balancePrice" DECIMAL NOT NULL,
    CONSTRAINT "StockPosition_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StockTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "stockAccountId" INTEGER NOT NULL,
    "stockId" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "feeAfterDiscount" INTEGER NOT NULL,
    "transactionTax" INTEGER NOT NULL,
    "transactionCost" INTEGER NOT NULL,
    "actualPayment" INTEGER NOT NULL,
    "bookPayment" INTEGER NOT NULL,
    CONSTRAINT "StockTransaction_stockAccountId_fkey" FOREIGN KEY ("stockAccountId") REFERENCES "StockAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_stockId_key" ON "Stock"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockAccount_name_key" ON "StockAccount"("name");
