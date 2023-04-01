import { PrismaClient } from '@prisma/client'
import Papa, { ParseResult } from "papaparse"
import { readFileSync } from 'fs';

// https://schema.gov.tw/lists/23, 證券產業別代碼
const industryType: { [index: string]: string } = {
  '01': '水泥工業',
  '02': '食品工業',
  '03': '塑膠工業',
  '04': '紡織纖維',
  '05': '電機機械',
  '06': '電器電纜',
  '08': '玻璃陶瓷',
  '09': '造紙工業',
  '10': '鋼鐵工業',
  '11': '橡膠工業',
  '12': '汽車工業',
  '14': '建材營造',
  '15': '航運業',
  '16': '觀光事業',
  '17': '金融保險',
  '18': '貿易百貨',
  '19': '綜合',
  '20': '其他',
  '21': '化學工業',
  '22': '生技醫療業',
  '23': '油電燃氣業',
  '24': '半導體業',
  '25': '電腦及週邊設備業',
  '26': '光電業',
  '27': '通信網路業',
  '28': '電子零組件業',
  '29': '電子通路業',
  '30': '資訊服務業',
  '31': '其他電子業',
  '32': '文化創意業',
  '33': '農業科技業',
  '34': '電子商務',
  '80': '管理股票',
}

const prisma = new PrismaClient()

async function main() {
  const sinopac = await prisma.stockAccount.upsert({
    where: { name: '永豐金' },
    update: {},
    create: {
      name: '永豐金',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.4,
    },
  })

  const fugle = await prisma.stockAccount.upsert({
    where: { name: '玉山富果' },
    update: {},
    create: {
      name: '玉山富果',
      minFee: 1,
      regularFee: 1,
      feeDiscount: 0.6,
    },
  })

  await prisma.stockTransaction.deleteMany({})

  const transactionData = readFileSync('./prisma/seeds/transaction.csv').toString()
  Papa.parse(transactionData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (transaction, index) => {
        await prisma.stockTransaction.create({
          data: {
            date: new Date(transaction['交易日期']),
            account: {
              connect: { id: transaction['帳戶'] == '永豐' ? sinopac.id : fugle.id }
            },
            stockId: transaction['代號'],
            stockName: transaction['股票'],
            sellOrBuy: transaction['買/賣'],
            type: transaction['交易類別'],
            shares: parseInt(transaction['成交股數'], 10),
            price: parseFloat(transaction['成交價格']).toFixed(2),
            amount: parseInt(transaction['成交價金'], 10),
            fee: parseInt(transaction['手續費'], 10),
            feeAfterDiscount: parseInt(transaction['折讓後手續費'], 10),
            transactionTax: parseInt(transaction['交易稅'], 10),
            transactionCost: parseInt(transaction['交易成本'], 10),
            actualPayment: parseInt(transaction['實際收付'], 10),
            bookPayment: parseInt(transaction['帳面收付'], 10),
          }
        }).catch(async (e) => {
          console.error(e)
        })
      })
    }
  })

  // 上市公司基本資料
  const stockInfo = JSON.parse(readFileSync('./prisma/seeds/stock_info.json').toString())
  stockInfo.map(async (stock: any) => {
    await prisma.stock.upsert({
      where: {
        id: stock['公司代號'],
      },
      update: {},
      create: {
        id: stock['公司代號'],
        name: stock['公司簡稱'],
        industryType: industryType[stock['產業別']] ? industryType[stock['產業別']] : '其他',
        isEtf: false,
      },
    })
  })

  // 上櫃公司基本資料
  const stockInfo2 = JSON.parse(readFileSync('./prisma/seeds/stock_info2.json').toString())
  stockInfo2.map(async (stock: any) => {
    await prisma.stock.upsert({
      where: {
        id: stock['SecuritiesCompanyCode'],
      },
      update: {},
      create: {
        id: stock['SecuritiesCompanyCode'],
        name: stock['公司簡稱'],
        industryType: industryType[stock['SecuritiesIndustryCode']] ? industryType[stock['SecuritiesIndustryCode']] : '其他',
        isEtf: false,
      },
    })
  })

  // etf TODO
  const etf_list = readFileSync('./prisma/seeds/etf_list.csv').toString()
  Papa.parse(etf_list, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (stock, index) => {
        await prisma.stock.upsert({
          where: {
            id: stock['基金代號'],
          },
          update: {},
          create: {
            id: stock['基金代號'],
            name: stock['基金代號'],
            industryType: 'ETF',
            isEtf: false,
          },
        }).catch(async (e) => {
          console.error(e)
        })
      })
    }
  })

  // TODO: wait stock info insert done
  const positionData = readFileSync('./prisma/seeds/position.csv').toString()
  Papa.parse(positionData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (position, index) => {
        await prisma.stockPosition.upsert({
          where: {
            stockId: position['股票代號'],
            // stockAccountId: sinopac.id,
            // stockId: position['股票代號'],
          },
          update: {},
          create: {
            // account: { connect: { id: sinopac.id }, },
            stock: { connect: { id: position['股票代號'] }, },
            shares: parseInt(position['股數'], 10),
            price: parseFloat(position['現價']),
            marketValue: parseInt(position['總市值'], 10),
            cost: parseInt(position['持有成本'], 10),
            avgCost: parseFloat(position['平均成本']).toFixed(2),
            balancePrice: parseFloat(position['損益平衡價']).toFixed(2),
            unrealizedGainLoss: parseInt(position['未實現損益'], 10),
            unrealizedGainLossRatio: parseInt(position['持有成本'], 10) != 0 ? parseFloat(position['獲利率']).toFixed(2) : 0.00,
          }
        }).catch(async (e) => {
          console.error(`${position['股票代號']} fail\n${e}`)
        })
      })
    }
  })

  await prisma.stockExDividendRecord.deleteMany({})

  const dividendData = readFileSync('./prisma/seeds/dividend.csv').toString()
  Papa.parse(dividendData, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    complete: (results: ParseResult<any>, file) => {
      results.data.map(async (record, index) => {
        await prisma.stockExDividendRecord.create({
          data: {
            exDividendDate: new Date(record['除(權)息日期']),
            dividendPayDate: new Date(record['股利發放日期']),
            account: { connect: { id: record['帳戶'] == '永豐' ? sinopac.id : fugle.id } },
            stock: { connect: { id: record['代號'] }, },
            shares: parseInt(record['持有股數']),
            cashDividend: parseFloat(record['現金股利']).toFixed(3),
            cashDividendPayable: parseInt(record['應付金額']),
            stockDividend: parseFloat(record['股票股利']).toFixed(3),
            stockDividendPayable: parseInt(record['應發股數']),
            tax: parseInt(record['稅']),
            healthInsurance: parseInt(record['補充保費']),
            fee: parseInt(record['匯費']),
            cashActualPayment: parseInt(record['實領金額']),
            stockActualPayment: parseInt(record['實領股數']),
          }
        }).catch(async (e) => {
          console.error(`${record['除(權)息日期']} fail\n${e}`)
        })
      })
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
