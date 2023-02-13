import { PrismaClient } from '@prisma/client'
import Papa, { ParseResult } from "papaparse"
import { readFileSync } from 'fs';

const prisma = new PrismaClient()

async function main() {
  await prisma.stockAccount.upsert({
    where: { name: '永豐金' },
    update: {},
    create: {
      name: '永豐金',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.4,
    },
  })

  await prisma.stockAccount.upsert({
    where: { name: '玉山富果' },
    update: {},
    create: {
      name: '玉山富果',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.6,
    },
  })

  const csvData = readFileSync('./prisma/seeds/transaction.csv').toString()

  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: async function (results: ParseResult<any>, file) {
      console.log(results)
      results.data.map((transaction, index) =>
        prisma.stockTransaction.create({
          data: {
            date: new Date(transaction['交易日期']),
            stockAccountId: transaction['帳戶'] == '永豐' ? 1 : 2,
            stockId: transaction['代號'],
            stockName: transaction['股票'],
            numOfSharesTraded: parseInt(transaction['成交股數'], 10),
            dealPrice: parseFloat(transaction['成交價格']),
            dealAmount: parseInt(transaction['成交價金'], 10),
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
      )
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
