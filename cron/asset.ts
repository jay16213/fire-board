import { PrismaClient } from '@prisma/client'
import { HttpClient } from "@fugle/realtime";
import cron from "node-cron";

const prisma = new PrismaClient()

const FUGLE_API_KEY = process.env.FUGLE_API_KEY ? process.env.FUGLE_API_KEY : ''

const updateStockValue = async () => {
  const fugleClient = new HttpClient({ apiToken: FUGLE_API_KEY })

  const positions = await prisma.stockPosition.groupBy({
    by: ["stockId"],
    _sum: {
      shares: true,
    },
  })

  const totalValue = await Promise.all(positions.map(async (position) => {
    const res = await fugleClient.intraday.quote({ symbolId: position.stockId });

    if (res.error) {
      return 0
    } else {
      const data = res.data;
      const val = Math.round(data.quote.trade.price * (position._sum.shares || 0))
      console.log(`${position.stockId}: ${val}, (${position._sum.shares || 0}, ${data.quote.trade.price})`)
      return val
    }
  })).then(values => values.reduce((prev, curr) => prev + curr, 0))

  console.log(`Total value: ${totalValue}`)

  await prisma.stockValueTrend.create({
    data: {
      value: totalValue,
    },
  });
}

cron.schedule("0 0 * * *", async () => {
  try {
    updateStockValue()
    console.log("Daily asset calculation and saving succeeded");
  } catch (error) {
    console.log("Daily asset calculation and saving failed:", error);
  }
});

updateStockValue()
