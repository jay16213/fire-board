import moment from 'moment'
import useSWR from 'swr'

export type StockTransactionProps = {
  id: number
  date: Date
  account: {
    name: string
  }
  stockId: string
  stockName: string
  numOfSharesTraded: number
  dealPrice: number
  dealAmount: number
  fee: number
  feeAfterDiscount: number
  transactionTax: number
  transactionCost: number
  actualPayment: number
  bookPayment: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

// const TransactionRecord: React.FC<{ transactions: StockTransactionProps[] }> = ({ transactions }) => {
const TransactionRecord: React.FC = () => {
  const { data, error } = useSWR<StockTransactionProps[], Error>('/api/stock/transactions', fetcher)

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  return (
    <div className="table-responsive">
      <table className="table card-table table-vcenter text-nowrap datatable">
        <thead>
          <tr className='text-center'>
            <th className="w-1">日期
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm icon-thick" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 15l6 -6l6 6"></path>
              </svg>
            </th>
            <th>交易帳戶</th>
            <th>股票名稱</th>
            <th>買賣別</th>
            <th>成交股數</th>
            <th>成交價格</th>
            <th>帳面收付</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction: StockTransactionProps, index: number) =>
            <tr key={index} className='text-center'>
              <td><span className="text-muted">{moment(transaction.date).format('YYYY/MM/DD')}</span></td>
              <td><a href="#" className="text-reset" tabIndex={-1}>{transaction.account.name}</a></td>
              <td>{transaction.stockName}</td>
              <td>{'TODO'}</td>
              <td className='text-end'>{transaction.numOfSharesTraded}</td>
              <td>{transaction.dealPrice}</td>
              {transaction.bookPayment > 0
                ? <td className='text-end text-red'>{transaction.bookPayment}</td>
                : <td className='text-end text-green'>{transaction.bookPayment}</td>
              }
              <td className="text-end">
                <span className="dropdown">
                  <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="#">
                      編輯
                    </a>
                    <a className="dropdown-item" href="#">
                      刪除
                    </a>
                  </div>
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionRecord
