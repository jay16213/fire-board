import { fetcher } from '@/lib/fetcher';
import moment from 'moment';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
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
  type: string
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
  const [currentPage, setCurrentPage] = useState(0)
  const [recordPerPage, setRecordPerPage] = useState(10)

  const { data, error } = useSWR<StockTransactionProps[], Error>('/api/stock/transactions', fetcher)

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  const pageCount = Math.ceil(data.length / recordPerPage)
  const offset = currentPage * recordPerPage;
  const currentPageData = data ? data.slice(offset, offset + recordPerPage) : [];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRecordPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>台股交易紀錄</Card.Title>
      </Card.Header>
      <Card.Body className='border-bottom py-3'>
        <div className="d-flex">
          <div className="text-muted">
            顯示
            <div className="mx-2 d-inline-block w-25">
              <input type="number" className="form-control form-control-sm" value={recordPerPage} onChange={handleRecordPerPageChange}>
              </input>
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
              <th>交易類別</th>
              <th>成交股數</th>
              <th>成交價格</th>
              <th>手續費</th>
              <th>折讓後手續費</th>
              <th>交易稅</th>
              <th>帳面收付</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((transaction: StockTransactionProps, index: number) =>
              < tr key={index} className='text-center' >
                <td><span className="text-muted">{moment(transaction.date).format('YYYY/MM/DD')}</span></td>
                <td><a href="#" className="text-reset" tabIndex={-1}>{transaction.account.name}</a></td>
                <td>{transaction.stockName}</td>
                <td>{transaction.category}</td>
                <td>{transaction.type}</td>
                <td className='text-end'>{transaction.shares}</td>
                <td className='text-end'>{Number(transaction.price).toFixed(2)}</td>
                <td className='text-end'>{transaction.fee}</td>
                <td className='text-end'>{transaction.feeAfterDiscount}</td>
                <td className='text-end'>{transaction.category == '賣' ? transaction.transactionTax : '-'}</td>
                {
                  transaction.bookPayment > 0
                    ? <td className='text-end text-red'>{transaction.bookPayment}</td>
                    : <td className='text-end text-green'>{transaction.bookPayment}</td>
                }
                < td className="text-end" >
                  <span className="dropdown">
                    <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">操作</button>
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
      </div >

      <Card.Footer className='d-flex align-items-center'>
        <p className="m-0 text-muted">
          顯示第 <span>{`${currentPage * recordPerPage + 1}`}</span> - <span>{`${currentPage * recordPerPage + recordPerPage}`}</span> 筆交易
        </p>
        <ReactPaginate
          previousLabel={'< prev'}
          nextLabel={'next >'}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination m0 ms-auto'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </Card.Footer>
    </Card >

  )
}

export default TransactionRecordCard
