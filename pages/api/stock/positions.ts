// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { StockPosition } from '@prisma/client'
import { prisma } from '../../../db/prisma'

// fetch all positions
export default async function handle(req: NextApiRequest, res: NextApiResponse<StockPosition[]>) {
  if (req.method == 'POST') {
    res.status(501).end('not implemented')
  } else {
    const positions = await prisma.stockPosition.findMany({
    })
    res.status(200).json(positions)
  }
}
