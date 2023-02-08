import React, { Component } from 'react'

const transaction_record = [
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    trans_type: "買",
    shares: "100",
    price: "60",
    total_pay: "6000"
  },
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    trans_type: "買",
    shares: "100",
    price: "60",
    total_pay: "6000"
  },
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    trans_type: "買",
    shares: "100",
    price: "60",
    total_pay: "6000"
  },
  {
    date: "2022/01/06",
    account: "永豐金",
    stock_id: "006208",
    stock_name: "富邦台灣50",
    trans_type: "買",
    shares: "100",
    price: "60",
    total_pay: "6000"
  },
]

export default class TransactionRecord extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th className="w-1">日期
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm icon-thick" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 15l6 -6l6 6"></path></svg>
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
            {transaction_record.map((data, index) =>
              <tr key={index}>
                <td><span className="text-muted">{data.date}</span></td>
                <td><a href="#" className="text-reset" tabIndex={-1}>{data.account}</a></td>
                <td>{data.stock_name}</td>
                <td>{data.trans_type}</td>
                <td>{data.shares}</td>
                <td>{data.price}</td>
                <td>{data.total_pay}</td>
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
            <tr>
              <td><span className="text-muted">001402</span></td>
              <td><a href="#" className="text-reset" tabIndex={-1}>UX Wireframes</a></td>
              <td>
                <span className="flag flag-country-gb"></span>
                Adobe
              </td>
              <td>
                87956421
              </td>
              <td>
                12 Apr 2017
              </td>
              <td>
                <span className="badge bg-warning me-1"></span> Pending
              </td>
              <td>$1200</td>
              <td className="text-end">
                <span className="dropdown">
                  <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
