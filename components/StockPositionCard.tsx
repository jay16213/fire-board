import { Card } from 'react-bootstrap';

const positions = [
  {
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    shares: "2000",
    current_price: 69,
    unrealized_gains_losses: 2000
  },
  {
    account: "永豐金",
    stock_id: "0050",
    stock_name: "台灣50",
    shares: "1000",
    current_price: 120,
    unrealized_gains_losses: -1000,
  },
  {
    account: "玉山富果",
    stock_id: "2330",
    stock_name: "台積電",
    shares: "250",
    current_price: 500,
    unrealized_gains_losses: 4500,
  },
]

const StockPositionCard = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>台股庫存 TODO</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr className='text-center'>
                <th>股票帳戶</th>
                <th>股票名稱</th>
                <th>持有股數</th>
                <th>市值</th>
                <th>未實現損益</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((data, index) =>
                <tr key={index}>
                  <td className='text-center'>{data.account}</td>
                  <td className='text-center'>{data.stock_name}</td>
                  <td className='text-end'>{data.shares}</td>
                  <td className='text-end'>{data.current_price}</td>
                  {data.unrealized_gains_losses > 0
                    ? <td className='text-end text-green'>{data.unrealized_gains_losses}</td>
                    : <td className='text-end text-red'>{data.unrealized_gains_losses}</td>
                  }
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  )
}

export default StockPositionCard
