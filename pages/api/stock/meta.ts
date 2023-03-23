// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/db/prisma'
import { HttpClient } from '@fugle/realtime'
import { Stock } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const FUGLE_API_KEY = process.env.FUGLE_API_KEY ? process.env.FUGLE_API_KEY : ''

export default async function handle(req: NextApiRequest, res: NextApiResponse<Stock | any>) {
  switch (req.method) {
    case 'GET':
      const { stockId } = req.query
      if (stockId) {
        const data = await handleGetMeta(stockId)
        res.status(200).json(data)
      }
      else {
        res.status(404).end(`not found`)
      }
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break;
  }
}

const handleGetMeta = async (stockId: string | string[]) => {
  try {
    const id = typeof stockId === 'string' ? stockId : stockId[0]

    const data = await prisma.stock.findUnique({
      where: {
        id: id,
      }
    })

    if (data != null) {
      return data
    }

    const fugleClient = new HttpClient({ apiToken: FUGLE_API_KEY })
    const res = await fugleClient.intraday.meta({ symbolId: id })
    console.log(res)

    if (res.error) {
      return ''
    } else {
      const data = res.data
      return {
        id: id,
        name: data.meta.nameZhTw,
        industryType: data.meta.industryZhTw,
        isEtf: data.meta.typeZhTw == 'ETF'
      }
    }
  } catch (err) {
    console.error(err)
    return ''
  }
}
