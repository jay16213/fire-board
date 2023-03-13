// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { StockPosition } from '@prisma/client'
import { prisma } from '../../../db/prisma'

// fetch all positions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<any[] | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      try {
        // get all positions
        const positions = await prisma.stockPosition.groupBy({
          by: ['stockId', 'stockName'],
          _sum: {
            shares: true,
            cost: true,
          },
        })

        // TODO: fetch stock current price
        const data = positions.map((position) => ({
          stockId: position.stockId,
          stockName: position.stockName,
          shares: position._sum.shares || NaN,
          cost: position._sum.cost || NaN,
          avgCost: Math.abs((position._sum.cost || 0) / (position._sum.shares || 1)).toFixed(2),
          currentPrice: 1,
          currentValue: 10000,
          unrealizedGainsLosses: 0,
          unrealizedGainsRatio: 0.00, // 獲利率
        }))
        res.status(200).json(data)
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: '500 err' })
      }
      break
    default:
      res.status(405).json({ error: 'Method not allowed.' });
      break
  }
}
