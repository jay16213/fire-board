// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, StockExDividendRecord, StockPosition, StockTransaction } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma'

// fetch all stock transactions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockExDividendRecord[] | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      const data = await prisma.stockExDividendRecord.findMany({
        include: {
          stock: {
            select: {
              name: true,
            }
          }
        }
      })
      res.status(200).json(data)
      break
    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
