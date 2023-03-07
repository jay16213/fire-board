// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, StockAccount } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

const prisma = new PrismaClient()

// fetch all stock transactions
export default async function handle(req: NextApiRequest, res: NextApiResponse<{
  name: string,
  minFee: number,
  regularFee: number,
  feeDiscount: Decimal
}[]>) {
  if (req.method == 'POST') {
    res.status(501)
  } else {
    const accountList = await prisma.stockAccount.findMany({
      select: {
        name: true,
        minFee: true,
        regularFee: true,
        feeDiscount: true,
      }
    })
    res.status(200).json(accountList)
  }
}
