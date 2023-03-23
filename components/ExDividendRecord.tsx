import { fetcher } from '@/lib/fetcher';
import { StockExDividendRecord } from '@prisma/client';
import moment from 'moment';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';

export type ExDividendRecordCardProps = {
  dividendRecords?: StockExDividendRecord[]
  headers?: string[]
  pagination?: boolean
}

const defaultHeaders = [
  '除權息日期',
  '股票名稱',
  '持有股數',
  '實領現金',
  '實領股票',
]

const ExDividendRecordCard: React.FC<ExDividendRecordCardProps> = (
  { dividendRecords, headers = defaultHeaders, pagination = true }: ExDividendRecordCardProps
) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [recordPerPage, setRecordPerPage] = useState(5)

  const { data, error } = useSWR<StockExDividendRecord[], Error>(
    typeof dividendRecords === 'undefined' ? '/api/stock/dividends' : null,
    fetcher,
    { fallbackData: dividendRecords }
  )

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  const pageCount = Math.ceil(data.length / recordPerPage)
  const offset = currentPage * recordPerPage;
  const currentPageData = data ? data.slice(offset, offset + recordPerPage) : [];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }

  const handleRecordPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>除權息紀錄</Card.Title>
      </Card.Header>
      <Card.Body className='border-bottom py-3'>
        <div className="d-flex">
          <div className="text-muted">
            一頁顯示
            <div className="mx-2 d-inline-block w-25">
              <input type="number" className="form-control form-control-sm" value={recordPerPage} onChange={handleRecordPerPageChange}>
              </input>
            </div>
            筆
          </div>
        </div>
      </Card.Body>

      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr className='text-center'>
              {headers.map((f: string, index: number) => <th key={index} className={f === headers[0] ? '' : 'text-end'}>{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((record: StockExDividendRecord, index: number) =>
              <tr key={index}>
                <td className='text-center'>{moment(record.exDividendDate).format('YYYY.MM.DD')}</td>
                <td className='text-end'>{record.stockId}</td>
                <td className='text-end'>{record.shares}</td>
                <td className='text-end'>{record.cashActualPayment}</td>
                <td className='text-end'>{record.stockActualPayment}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Card.Footer className='d-flex align-items-center'>
        {pagination &&
          <>
            <p className="m-0 text-muted">
              顯示第 <span>{`${currentPage * recordPerPage + 1}`}</span> - <span>{`${currentPage * recordPerPage + recordPerPage}`}</span> 筆庫存
            </p>
            <ReactPaginate
              previousLabel={'< prev'}
              nextLabel={'next >'}
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={'pagination m-0 ms-auto'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </>
        }
      </Card.Footer>
    </Card >
  )
}

export default ExDividendRecordCard
