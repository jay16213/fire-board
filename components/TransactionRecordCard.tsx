import { fetcher } from '@/lib/fetcher';
import moment from 'moment';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import useSWR from 'swr';

export type StockTransactionProps = {
  id: number
  date: Date
  account: {
    name: string
  }
  stockId: string
  stockName: string
  shares: number
  category: string
  price: number
  amount: number
  fee: number
  feeAfterDiscount: number
  transactionTax: number
  transactionCost: number
  actualPayment: number
  bookPayment: number
}

// const TransactionRecord: React.FC<{ transactions: StockTransactionProps[] }> = ({ transactions }) => {
const TransactionRecordCard: React.FC = () => {
  const [recentTransactionCnt, setRecentTransactionCnt] = useState(10)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecentTransactionCnt(parseInt(event.target.value, 10))
  }

  const { data, error } = useSWR<StockTransactionProps[], Error>('/api/stock/transactions', fetcher)

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>台股交易紀錄</Card.Title>
      </Card.Header>
      <Card.Body className='border-bottom py-3'>
        <div className="d-flex">
          <div className="text-muted">
            顯示最近
            <div className="mx-2 d-inline-block">
              <input type="number" className="form-control form-control-sm" value={recentTransactionCnt} onChange={onChange} size={3} aria-label="Invoices count"></input>
            </div>
            筆交易
          </div>
          <div className="ms-auto text-muted">
            搜尋
            <div className="ms-2 d-inline-block">
              <input type="text" className="form-control form-control-sm" aria-label="Search invoice"></input>
            </div>
          </div>
        </div>
      </Card.Body>

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
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((transaction: StockTransactionProps, index: number) =>
              < tr key={index} className='text-center' >
                <td><span className="text-muted">{moment(transaction.date).format('YYYY/MM/DD')}</span></td>
                <td><a href="#" className="text-reset" tabIndex={-1}>{transaction.account.name}</a></td>
                <td>{transaction.stockName}</td>
                <td>{transaction.category}</td>
                <td className='text-end'>{transaction.shares}</td>
                <td className='text-end'>{Number(transaction.price).toFixed(2)}</td>
                {
                  transaction.bookPayment > 0
                    ? <td className='text-end text-red'>{transaction.bookPayment}</td>
                    : <td className='text-end text-green'>{transaction.bookPayment}</td>
                }
                {/* < td className="text-end" >
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
                </td> */}
              </tr>
            )}
          </tbody>
        </table>
      </div >

      <Card.Footer className='d-flex align-items-center'>
        <p className="m-0 text-muted">Showing <span>1</span> to <span>8</span> of <span>16</span> entries</p>
        <ul className="pagination m-0 ms-auto">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>
              prev
            </a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">4</a></li>
          <li className="page-item"><a className="page-link" href="#">5</a></li>
          <li className="page-item">
            <a className="page-link" href="#">
              next
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </a>
          </li>
        </ul>
      </Card.Footer>
    </Card >

  )
}

export default TransactionRecordCard
