import { fetcher } from '@/lib/fetcher';
import { Card } from 'react-bootstrap';
import useSWR from 'swr';

export type StockPosition = {
  // account: {
  //   name: string
  // }
  stockId: string
  stockName: string
  shares: number
  currentPrice: number
  cost: number
  avgCost: number
  unrealizedGainsLosses: number
  unrealizedGainsRatio: number
}

export type StockPositionCardProps = {
  positions?: StockPosition[]
}

const StockPositionCard: React.FC<StockPositionCardProps> = ({ positions }: StockPositionCardProps) => {
  const { data, error } = useSWR<StockPosition[], Error>(
    typeof positions === 'undefined' ? '/api/stock/positions' : null,
    fetcher,
    { fallbackData: positions }
  )

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>台股庫存</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr className='text-center'>
                {/* <th>股票帳戶</th> */}
                <th>股票名稱</th>
                <th>持有股數</th>
                <th>現價</th>
                <th>市值</th>
                <th>持有成本 (平均成本)</th>
                <th>未實現損益</th>
                <th>獲利率</th>
              </tr>
            </thead>
            <tbody>
              {data.map((position: StockPosition, index: number) =>
                <tr key={index}>
                  {/* <td className='text-center'>{position.account.name}</td> */}
                  <td className='text-center'>{position.stockName}</td>
                  <td className='text-end'>{position.shares}</td>
                  <td className='text-end'>{position.currentPrice}</td>
                  <td className='text-end'>{position.currentPrice}</td>
                  <td className='text-end'>{`${Math.abs(position.cost)} (${Math.abs(position.avgCost)})`}</td>
                  {position.unrealizedGainsLosses > 0
                    ?
                    <>
                      <td className='text-end text-red'>{position.unrealizedGainsLosses}</td>
                      <td className='text-end text-red'>{`${position.unrealizedGainsRatio.toFixed(2)}%`}</td>
                    </>
                    :
                    <>
                      <td className='text-end text-green'>{position.unrealizedGainsLosses}</td>
                      <td className='text-end text-green'>{`${position.unrealizedGainsRatio.toFixed(2)}%`}</td>
                    </>
                  }
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card >
  )
}

export default StockPositionCard
