import { fetcher } from '@/lib/fetcher';
import { Card } from 'react-bootstrap';
import useSWR from 'swr';

export type StockPositionProps = {
  account: {
    name: string
  }
  stockId: string
  stockName: string
  shares: number
  currentPrice: number
  cost: number
  unrealizedGainsLosses: number
}

const StockPositionCard: React.FC = () => {
  const { data, error } = useSWR<StockPositionProps[], Error>('/api/stock/positions', fetcher)

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
                <th>持有成本</th>
                <th>未實現損益</th>
                <th>獲利率</th>
              </tr>
            </thead>
            <tbody>
              {data.map((position: StockPositionProps, index: number) =>
                <tr key={index}>
                  {/* <td className='text-center'>{position.account.name}</td> */}
                  <td className='text-center'>{position.stockName}</td>
                  <td className='text-end'>{position.shares}</td>
                  <td className='text-end'>{position.currentPrice}</td>
                  <td className='text-end'>{position.currentPrice}</td>
                  <td className='text-end'>{Math.abs(position.cost)}</td>
                  {position.unrealizedGainsLosses > 0
                    ?
                    <>
                      <td className='text-end text-red'>{position.unrealizedGainsLosses}</td>
                      <td className='text-end text-red'>0.00%</td>
                    </>
                    :
                    <>
                      <td className='text-end text-green'>{position.unrealizedGainsLosses}</td>
                      <td className='text-end text-green'>0.00%</td>
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
