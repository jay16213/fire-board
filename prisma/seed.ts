import { PrismaClient } from '@prisma/client'
import Papa, { ParseResult } from "papaparse"
import { readFileSync } from 'fs';

const prisma = new PrismaClient()

async function main() {
  const sinopac = await prisma.stockAccount.upsert({
    where: { name: '永豐金' },
    update: {},
    create: {
      name: '永豐金',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.4,
    },
  })

  const fugle = await prisma.stockAccount.upsert({
    where: { name: '玉山富果' },
    update: {},
    create: {
      name: '玉山富果',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.6,
    },
  })

  const transactionData = readFileSync('./prisma/seeds/transaction.csv').toString()
  Papa.parse(transactionData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (transaction, index) => {
        await prisma.stockTransaction.create({
          data: {
            date: new Date(transaction['交易日期']),
            account: {
              connect: { id: transaction['帳戶'] == '永豐' ? sinopac.id : fugle.id }
            },
            stockId: transaction['代號'],
            stockName: transaction['股票'],
            category: transaction['買/賣'],
            type: transaction['交易類別'],
            shares: parseInt(transaction['成交股數'], 10),
            price: parseFloat(transaction['成交價格']).toFixed(2),
            amount: parseInt(transaction['成交價金'], 10),
            fee: parseInt(transaction['手續費'], 10),
            feeAfterDiscount: parseInt(transaction['折讓後手續費'], 10),
            transactionTax: parseInt(transaction['交易稅'], 10),
            transactionCost: parseInt(transaction['交易成本'], 10),
            actualPayment: parseInt(transaction['實際收付'], 10),
            bookPayment: parseInt(transaction['帳面收付'], 10),
          }
        }).catch(async (e) => {
          console.error(e)
        })
      })
    }
  })

  const positionData = readFileSync('./prisma/seeds/position.csv').toString()
  Papa.parse(positionData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (position, index) => {
        await prisma.stockPosition.create({
          data: {
            account: {
              connect: { id: sinopac.id },
            },
            stockId: position['股票代號'],
            stockName: position['股票名稱'],
            shares: parseInt(position['股數'], 10),
            cost: parseInt(position['持有成本'], 10),
            avgCost: parseInt(position['平均成本'], 10),
            balancePrice: parseInt(position['損益平衡價'], 10),
          }
        }).catch(async (e) => {
          console.error(e)
        })
      })
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
