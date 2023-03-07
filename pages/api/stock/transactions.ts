// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StockTransaction } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma'

// fetch all stock transactions
export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'POST':
      const transaction = req.body
      console.log(transaction)
      try {
        // const savedData = await prisma.stockTransaction.create({
        //   data: {
        //     date: transaction.date,
        //     stockId: transaction.stockId,
        //     stockName: transaction.stockName,
        //     numOfSharesTraded: transaction.shares,
        //     dealPrice: transaction.price,
        //     dealAmount: transaction.amount,
        //     fee: transaction.fee,
        //     feeAfterDiscount: transaction.feeAfterDiscount,
        //     transactionTax: transaction.tax,
        //     transactionCost: transaction.feeAfterDiscount + transaction.tax,
        //     actualPayment: ,
        //     bookPayment: ,
        //   }
        // })
        res.status(201).json({ error: 'Failed to save transaction.' });
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
