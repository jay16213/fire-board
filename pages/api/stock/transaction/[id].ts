// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, StockTransaction } from '@prisma/client'

const prisma = new PrismaClient()

// /api/stock/transaction/[id]
export default async function handle(req: NextApiRequest, res: NextApiResponse<StockTransaction>) {
  const { query, method } = req
  const id = parseInt(query.id as string, 10)

  switch (method) {
    case 'GET':
      const record = await prisma.stockTransaction.findUnique({
        where: { id: id }
      })

      if (record != null) {
        res.status(200).json(record)
      } else {
        res.status(404).end('record not found')
      }
      break;

    case 'PUT':
      res.status(500).end(`Method ${method} Not implemented`)
      break

    case 'DELETE':
      res.status(500).end(`Method ${method} Not implemented`)
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}
