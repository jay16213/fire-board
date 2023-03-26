// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { calculateAvgCost, calculateBalancePrice, calculateUnrealizedGainLoss, calculateUnrealizedGainLossRatio } from '@/lib/stock'
import { Prisma, StockPosition, StockTransaction } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpClient } from '@fugle/realtime'
import { prisma } from '../../../db/prisma'

const fugleClient = new HttpClient({ apiToken: process.env.FUGLE_API_KEY ?? '' })

// TODO: backend validation
const createTransaction = async (reqData: any): Promise<StockTransaction> => {
  const actualCost = reqData.feeAfterDiscount + reqData.tax
  const bookCost = reqData.fee + reqData.tax

  let actualPayment = 0
  let bookPayment = 0

  if (reqData.sellOrBuy == '買') {
    actualPayment = -reqData.amount - actualCost
    bookPayment = -reqData.amount - bookCost
  }
  else {
    actualPayment = reqData.amount - actualCost
    bookPayment = reqData.amount - bookCost
  }

  const savedData = await prisma.stockTransaction.create({
    data: {
      date: new Date(reqData.date),
      account: {
        connect: { id: parseInt(reqData.accountId) }
      },
      stockId: reqData.stockId,
      stockName: reqData.stockName,
      type: reqData.type,
      sellOrBuy: reqData.sellOrBuy,
      shares: parseInt(reqData.shares, 10),
      price: parseFloat(reqData.price).toFixed(2),
      amount: parseInt(reqData.amount, 10),
      fee: parseInt(reqData.fee, 10),
      feeAfterDiscount: reqData.feeAfterDiscount,
      transactionTax: reqData.tax,
      transactionCost: actualCost,
      actualPayment: actualPayment,
      bookPayment: bookPayment,
    }
  })

  return savedData
}

const getStockTransactions = async () => {
  const data = await prisma.stockTransaction.findMany({
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
  return data
}

const getStockPrice = async (stockId: string) => {
  const res = await fugleClient.intraday.quote({ symbolId: stockId })
  if (res.error) {
    throw new Error(res.error.message)
  } else {
    const data = res.data
    console.log(data)
    return data.quote.trade.price
  }
}

// fetch all stock transactions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockTransaction | StockTransaction[] | { error: string }>
) {
  switch (req.method) {
    case 'POST':
      // TODO: request validation
      const reqData = req.body
      console.log(reqData)

      try {
        let transaction: StockTransaction
        let shares = 0, cost

        // step 1: check stock position
        const position: StockPosition = await prisma.stockPosition.findFirstOrThrow({
          where: {
            stockAccountId: parseInt(reqData.accountId),
            stockId: reqData.stockId,
          },
        })

        // step 2: get price of stock
        const price = await getStockPrice(reqData.stockId)

        // step 3: create transaction and update position
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
        const unrealizedGainLoss = calculateUnrealizedGainLoss(shares, price, cost, reqData.type == 'ETF')

        // step 4: update position to database
        await prisma.stockPosition.update({
          where: {
            stockAccountId_stockId: {
              stockAccountId: transaction.stockAccountId,
              stockId: transaction.stockId
            },
          },
          data: {
            shares: shares,
            price: price,
            marketValue: Math.round(shares * price),
            avgCost: calculateAvgCost(cost, shares),
            cost: cost,
            balancePrice: calculateBalancePrice(cost, shares, transaction.type == 'ETF'),
            unrealizedGainLoss: unrealizedGainLoss,
            unrealizedGainLossRatio: calculateUnrealizedGainLossRatio(unrealizedGainLoss, cost),
          }
        })

        // step 5: return transaction
        res.status(201).json(transaction);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) { // position not found in db
          if (reqData.sellOrBuy == '買') { // first buy transaction
            const transaction = await createTransaction(reqData)

            const price = await getStockPrice(transaction.stockId)
            const unrealizedGainLoss = calculateUnrealizedGainLoss(transaction.shares, price, transaction.bookPayment, reqData.type == 'ETF')

            await prisma.stockPosition.create({
              data: {
                account: { connect: { id: transaction.stockAccountId } },
                stock: { connect: { id: transaction.stockId } },
                shares: transaction.shares,
                price: price,
                marketValue: Math.round(transaction.shares * price),
                avgCost: calculateAvgCost(transaction.bookPayment, transaction.shares),
                cost: transaction.bookPayment,
                balancePrice: calculateBalancePrice(transaction.bookPayment, transaction.shares, reqData.type == 'ETF'),
                unrealizedGainLoss: unrealizedGainLoss,
                unrealizedGainLossRatio: calculateUnrealizedGainLossRatio(unrealizedGainLoss, transaction.bookPayment),
              }
            })

            res.status(201).json(transaction)
          } else {
            console.log('賣')
            res.status(403).json({ error: 'Position not found' })
          }
        } else {
          console.error(err)
          res.status(500).json({ error: 'internal error' })
        }
      }
      break;

    case 'GET':
      const transactions = await getStockTransactions()
      res.status(200).json(transactions)
      break;

    default:
      res.status(405).json({ error: 'Method not allowed.' });
      break;
  }
}
