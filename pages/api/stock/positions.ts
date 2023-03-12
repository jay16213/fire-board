// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { StockPosition } from '@prisma/client'
import { prisma } from '../../../db/prisma'

// fetch all positions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockPosition[] | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      const positions = await prisma.stockPosition.findMany({
        include: {
          account: {
            select: { name: true }
          }
        }
      })

      // TODO: fetch stock current price
      const data = positions.map((position) => ({
        ...position,
        currentPrice: 1,
        unrealizedGainsLosses: 0,
      }))
      res.status(200).json(data)
      break
    default:
      res.status(405).json({ error: 'Method not allowed.' });
      break
  }
}
