/*
  Warnings:

  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stockId` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `stockName` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stock` table. All the data in the column will be lost.
  - The primary key for the `StockPosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StockPosition` table. All the data in the column will be lost.
  - You are about to drop the column `stockName` on the `StockPosition` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `StockTransaction` table. All the data in the column will be lost.
  - Added the required column `isEtf` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketValue` to the `StockPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `StockPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unrealizedGainLoss` to the `StockPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unrealizedGainLossRatio` to the `StockPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellOrBuy` to the `StockTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stock_stockId_key";

-- DropIndex
DROP INDEX "StockPosition_stockId_key";

-- AlterTable
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pkey",
DROP COLUMN "stockId",
DROP COLUMN "stockName",
DROP COLUMN "type",
ADD COLUMN     "isEtf" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Stock_id_seq";

-- AlterTable
ALTER TABLE "StockPosition" DROP CONSTRAINT "StockPosition_pkey",
DROP COLUMN "id",
DROP COLUMN "stockName",
ADD COLUMN     "marketValue" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unrealizedGainLoss" INTEGER NOT NULL,
ADD COLUMN     "unrealizedGainLossRatio" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "StockPosition_pkey" PRIMARY KEY ("stockAccountId", "stockId");

-- AlterTable
ALTER TABLE "StockTransaction" DROP COLUMN "category",
ADD COLUMN     "sellOrBuy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StockValue" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockPosition" ADD CONSTRAINT "StockPosition_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
