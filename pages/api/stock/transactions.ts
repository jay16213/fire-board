// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, StockPosition, StockTransaction } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma'

// TODO: backend validation
const createTransaction = async (transaction: any) => {
  const actualCost = transaction.feeAfterDiscount + transaction.tax
  const bookCost = transaction.fee + transaction.tax

  let actualPayment = 0
  let bookPayment = 0

  if (transaction.sellOrBuy == '買') {
    actualPayment = -transaction.amount - actualCost
    bookPayment = -transaction.amount - bookCost
  }
  else {
    actualPayment = transaction.amount - actualCost
    bookPayment = transaction.amount - bookCost
  }

  const savedData = await prisma.stockTransaction.create({
    data: {
      date: new Date(transaction.date),
      account: {
        connect: { id: parseInt(transaction.accountId) }
      },
      stockId: transaction.stockId,
      stockName: transaction.stockName,
      type: transaction.type,
      category: transaction.sellOrBuy,
      shares: parseInt(transaction.shares, 10),
      price: parseFloat(transaction.price).toFixed(2),
      amount: parseInt(transaction.amount, 10),
      fee: parseInt(transaction.fee, 10),
      feeAfterDiscount: transaction.feeAfterDiscount,
      transactionTax: transaction.tax,
      transactionCost: actualCost,
      actualPayment: actualPayment,
      bookPayment: bookPayment,
    }
  })

  return savedData
}

const calculateBalancePrice = (cost: number, shares: number, isEtf: boolean) => {
  const ratio = isEtf ? (1 - 0.002425) : (1 - 0.004425)
  return Number(Math.abs(cost) / (shares * ratio)).toFixed(2)
}

// fetch all stock transactions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockTransaction | StockTransaction[] | { error: string }>
) {
  switch (req.method) {
    case 'POST':
      try {
        // TODO: request validation
        const transaction: StockTransaction = await createTransaction(req.body)

        // step 2: update stock position
        try {
          const position: StockPosition = await prisma.stockPosition.findFirstOrThrow({ where: { stockId: transaction.stockId } })
          let shares = 0, cost

          // update shares
          if (transaction.category == '買') {
            shares = position.shares + transaction.shares
          } else {
            if (position.shares >= transaction.shares) {
              shares = position.shares - transaction.shares
            } else {
              console.log('Sell too much shares')
              throw Error('Sell too much shares')
            }
          }

          // update cost
          cost = position.cost + transaction.bookPayment

          await prisma.stockPosition.update({
            where: { stockId: transaction.stockId },
            data: {
              shares: shares,
              avgCost: Math.abs(cost / shares).toFixed(2),
              cost: cost,
              balancePrice: calculateBalancePrice(cost, shares, transaction.type == 'ETF'),
            }
          })
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (transaction.category == '買') {
              await prisma.stockPosition.create({
                data: {
                  account: { connect: { id: transaction.stockAccountId } },
                  stockId: transaction.stockId,
                  stockName: transaction.stockName,
                  shares: transaction.shares,
                  avgCost: Math.abs(transaction.bookPayment / transaction.shares).toFixed(2),
                  cost: transaction.bookPayment,
                  balancePrice: calculateBalancePrice(transaction.bookPayment, transaction.shares, transaction.type == 'ETF'),
                }
              })
            } else {
              console.log('賣')
              res.status(403).json({ error: 'Position not found' })
            }
          } else {
            console.log(err)
            res.status(403).json({ error: 'client error' })
          }
        }

        res.status(201).json(transaction);
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to save transaction.' });
      }
      break;

    case 'GET':
      const transactions = await prisma.stockTransaction.findMany({
        include: {
          account: {
            select: {
              name: true,
            }
          }
        }
      })
      res.status(200).json(transactions)
      break;

    default:
      res.status(405).json({ error: 'Method not allowed.' });
      break;
  }
}
