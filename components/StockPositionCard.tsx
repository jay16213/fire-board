import { fetcher } from '@/lib/fetcher';
import { StockPositionModel, StockPositionResponse } from '@/pages/api/stock/positions';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';

export type StockPositionCardProps = {
  positions?: StockPositionResponse
  searchField?: boolean
  fields?: string[]
}

const defaultFields = [
  '股票名稱',
  '持有股數',
  '現價',
  '市值',
  '持有成本',
  '平均成本',
  '損益平衡價',
  '未實現損益',
  '獲利率',
]

const StockPositionCard: React.FC<StockPositionCardProps> = (
  { positions, searchField = false, fields = defaultFields }: StockPositionCardProps
) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [recordPerPage, setRecordPerPage] = useState(5)

  const { data, error } = useSWR<StockPositionResponse, Error>(
    typeof positions === 'undefined' ? '/api/stock/positions' : null,
    fetcher,
    { fallbackData: positions }
  )

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  const pageCount = Math.ceil(data.positions.length / recordPerPage)
  const offset = currentPage * recordPerPage;
  const currentPageData = data ? data.positions.slice(offset, offset + recordPerPage) : [];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }

  const handleRecordPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as={'h3'}>台股庫存</Card.Title>
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
          {searchField &&
            <div className="ms-auto text-muted">
              搜尋
              <div className="ms-2 d-inline-block">
                <input type="text" className="form-control form-control-sm" aria-label="Search invoice"></input>
              </div>
            </div>
          }
        </div>
      </Card.Body>

      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr className='text-center'>
              {fields.map((f: string, index: number) => <th key={index} className={f === fields[0] ? '' : 'text-end'}>{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((position: StockPositionModel, index: number) =>
              <tr key={index}>
                <td className='text-center'>{position.stockName}</td>
                <td className='text-end'>{position.shares}</td>
                <td className='text-end'>{position.price}</td>
                <td className='text-end'>{position.marketValue.toLocaleString()}</td>
                <td className='text-end'>{Math.abs(position.cost).toLocaleString()}</td>
                <td className='text-end'>{position.avgCost}</td>
                <td className='text-end'>{position.balancePrice}</td>
                {position.unrealizedGainLoss > 0
                  ?
                  <>
                    <td className='text-end text-red'>{position.unrealizedGainLoss}</td>
                    <td className='text-end text-red'>{`${position.unrealizedGainLossRatio}%`}</td>
                  </>
                  :
                  <>
                    <td className='text-end text-green'>{position.unrealizedGainLoss}</td>
                    <td className='text-end text-green'>{`${position.unrealizedGainLossRatio}%`}</td>
                  </>
                }
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Card.Footer className='d-flex align-items-center'>
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
      </Card.Footer>
    </Card >
  )
}

export default StockPositionCard
