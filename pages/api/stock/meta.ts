// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpClient } from '@fugle/realtime'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../../db/prisma'

type StockMeta = {
  name: string,
  industry: string,
  type: string,
}

const FUGLE_API_KEY = process.env.FUGLE_API_KEY ? process.env.FUGLE_API_KEY : ''

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
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

async function handleGetMeta(stockId: string | string[]) {
  const id = typeof stockId === 'string' ? stockId : stockId[0]
  const fugleClient = new HttpClient({ apiToken: FUGLE_API_KEY })

  try {
    const res = await fugleClient.intraday.meta({ symbolId: id })
    console.log(res)

    if (res.error) {
      return ''
    } else {
      const data = res.data
      return {
        name: data.meta.nameZhTw,
        industry: data.meta.industryZhTw,
        type: data.meta.typeZhTw
      }
    }
  } catch (err) {
    console.error(err)
    return ''
  }
}
