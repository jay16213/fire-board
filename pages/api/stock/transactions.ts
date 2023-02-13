// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, StockTransaction } from '@prisma/client'

const prisma = new PrismaClient()

async function newStockTransaction(req: NextApiRequest) {
  await prisma.stockTransaction.create(req.body)
}

// fetch all stock transactions
export default async function handle(req: NextApiRequest, res: NextApiResponse<StockTransaction[]>) {
  if (req.method == 'POST') {
    await newStockTransaction(req)
    res.status(501)
  } else {
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
  }
}
