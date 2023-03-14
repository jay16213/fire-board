import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
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
  const [currentPage, setCurrentPage] = useState(0)
  const [recordPerPage, setRecordPerPage] = useState(5)

  const { data, error } = useSWR<StockPosition[], Error>(
    typeof positions === 'undefined' ? '/api/stock/positions' : null,
    fetcher,
    { fallbackData: positions }
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
            {currentPageData.map((position: StockPosition, index: number) =>
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

export default StockPositionCard
