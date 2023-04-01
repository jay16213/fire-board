// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Stock, StockPosition } from '@prisma/client'
import { prisma } from '../../../db/prisma'
import { calculateBalancePrice, calculateUnrealizedGainLossRatio } from '@/lib/stock'

export interface StockPositionModel {
  stockId: string
  stockName: string
  industryType: string
  isEtf: boolean
  shares: number
  price: number
  marketValue: number
  avgCost: string
  cost: number
  balancePrice: string
  unrealizedGainLoss: number
  unrealizedGainLossRatio: string
}

export interface StockPositionResponse {
  totalMarketValue: number
  totalUnrealizedGainLoss: number
  totalUnrealizedGainLossRatio: string
  totalCost: number
  positions: StockPositionModel[]
}

// fetch all positions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StockPositionResponse | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      try {
        // get all positions
        const positions = await prisma.stockPosition.findMany({
          include: {
            stock: true,
          }
        })

        const data = positions.reduce((result: StockPositionModel[], position: StockPosition & { stock: Stock }) => {
          // const existingPosition = result.find((p) => p.stockId === position.stockId)

          // if (existingPosition) {
          //   existingPosition.shares += position.shares
          //   existingPosition.cost += position.cost
          //   existingPosition.marketValue += position.marketValue
          //   existingPosition.avgCost = Math.abs(existingPosition.cost / existingPosition.shares).toFixed(2)
          //   existingPosition.balancePrice = calculateBalancePrice(existingPosition.cost, existingPosition.shares, existingPosition.isEtf)
          //   existingPosition.unrealizedGainLoss += position.unrealizedGainLoss
          //   existingPosition.unrealizedGainLossRatio = calculateUnrealizedGainLossRatio(existingPosition.unrealizedGainLoss, existingPosition.cost)
          // } else {
          result.push({
            stockId: position.stock.id,
            stockName: position.stock.name,
            industryType: position.stock.industryType,
            isEtf: position.stock.isEtf,
            shares: position.shares,
            price: parseFloat(position.price.toFixed(2)),
            marketValue: position.marketValue,
            avgCost: position.avgCost.toFixed(2),
            cost: position.cost,
            balancePrice: position.balancePrice.toFixed(2),
            unrealizedGainLoss: position.unrealizedGainLoss,
            unrealizedGainLossRatio: position.unrealizedGainLossRatio.toFixed(2),
          })
          // }
          return result
        }, [])

        const totalMarketValue = data.reduce((sum, p) => sum += p.marketValue, 0)
        const totalUnrealizedGainLoss = data.reduce((sum, p) => sum += p.unrealizedGainLoss, 0)
        const totalCost = data.reduce((sum, p) => sum += p.cost, 0)

        res.status(200).json({
          totalMarketValue: totalMarketValue,
          totalUnrealizedGainLoss: totalUnrealizedGainLoss,
          totalUnrealizedGainLossRatio: calculateUnrealizedGainLossRatio(totalUnrealizedGainLoss, totalCost),
          totalCost: totalCost,
          positions: data,
        })
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
