import React, { Component } from 'react'

const record = [
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    shares: "100",
    cash_dividend: "2",
    stock_dividend: "1",
  },
  {
    date: "2022/07/06",
    account: "永豐金",
    stock_id: "0050",
    stock_name: "台灣50",
    shares: "100",
    cash_dividend: "1",
    stock_dividend: "1",
  },
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    shares: "100",
    cash_dividend: "2",
    stock_dividend: "1",
  },
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    shares: "100",
    cash_dividend: "2",
    stock_dividend: "1",
  },
]

export default class ExDividendRecord extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr className='text-center'>
              <th className="w-1">日期
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm icon-thick" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 15l6 -6l6 6"></path></svg>
              </th>
              <th>股票帳戶</th>
              <th>股票名稱</th>
              <th>持有股數</th>
              <th>現金股利</th>
              <th>股票股利</th>
            </tr>
          </thead>
          <tbody>
            {record.map((data, index) =>
              <tr key={index}>
                <td className='text-center'><span className="text-muted">{data.date}</span></td>
                <td className='text-center'><a href="#" className="text-reset" tabIndex={-1}>{data.account}</a></td>
                <td className='text-center'>{data.stock_name}</td>
                <td className='text-end'>{data.shares}</td>
                <td className='text-end'>{data.cash_dividend}</td>
                <td className='text-end'>{data.stock_dividend}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
