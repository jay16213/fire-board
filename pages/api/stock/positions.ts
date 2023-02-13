// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, StockPosition } from '@prisma/client'

const prisma = new PrismaClient()

// fetch all stock transactions
export default async function handle(req: NextApiRequest, res: NextApiResponse<StockPosition[]>) {
  if (req.method == 'POST') {
    res.status(501).end('not implemented')
  } else {
    const positions = await prisma.stockPosition.findMany()
    res.status(200).json(positions)
  }
}
