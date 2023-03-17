// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { calculateBalancePrice, calculateUnrealizedGainLossRatio } from '@/lib/stock'
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
      sellOrBuy: transaction.sellOrBuy,
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

// fetch all stock transactions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockTransaction | StockTransaction[] | { error: string }>
) {
  switch (req.method) {
    case 'POST':
      try {
        // TODO: request validation
        const reqData = req.body
        console.log(reqData)
        try {
          // step 1: check stock position
          const position: StockPosition = await prisma.stockPosition.findFirstOrThrow({
            where: {
              stockAccountId: parseInt(reqData.accountId),
              stockId: reqData.stockId,
            },
          })
          let transaction: StockTransaction
          let shares = 0, cost

          // step 2: create transaction and update position
          if (reqData.sellOrBuy == '買') {
            transaction = await createTransaction(reqData)
            shares = position.shares + transaction.shares
          } else {
            if (position.shares >= reqData.shares) {
              transaction = await createTransaction(reqData)
              shares = position.shares - transaction.shares
            } else {
              console.log('Sell too much shares')
              throw Error('Sell too much shares')
            }
          }

          cost = position.cost + transaction.bookPayment // update cost

          await prisma.stockPosition.update({
            where: {
              stockAccountId_stockId: {
                stockAccountId: reqData.stockAccountId,
                stockId: reqData.stockId
              },
            },
            data: {
              shares: shares,
              avgCost: Math.abs(cost / shares).toFixed(2),
              cost: cost,
              balancePrice: calculateBalancePrice(cost, shares, transaction.type == 'ETF'),
            }
          })

          res.status(201).json(transaction);
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError) { // position not found in db
            if (reqData.sellOrBuy == '買') { // first buy transaction
              const transaction = await createTransaction(reqData)

              await prisma.stockPosition.create({
                data: {
                  account: { connect: { id: reqData.stockAccountId } },
                  stock: { connect: { id: reqData.stockId } },
                  shares: reqData.shares,
                  price: 0,
                  marketValue: Math.round(reqData.shares * 0),
                  avgCost: Math.abs(reqData.bookPayment / reqData.shares).toFixed(2),
                  cost: reqData.bookPayment,
                  balancePrice: calculateBalancePrice(reqData.bookPayment, reqData.shares, reqData.type == 'ETF'),
                  unrealizedGainLoss: 0,
                  unrealizedGainLossRatio: calculateUnrealizedGainLossRatio(0, reqData.bookPayment),
                }
              })

              res.status(201).json(transaction)
            } else {
              console.log('賣')
              res.status(403).json({ error: 'Position not found' })
            }
          } else {
            console.log(err)
            res.status(403).json({ error: 'client error' })
          }
        }
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to save transaction.' });
      }
      break;

    case 'GET':
      const transactions = await prisma.stockTransaction.findMany({
        orderBy: [
          {
            date: 'desc',
          },
        ],
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
