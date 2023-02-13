import PageHeader from '@/components/elements/page/PageHeader';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const stock_account: string[] = [
  '永豐金',
  '玉山富果'
]

export default function StockNewTransactionForm() {
  const [stockIdIsValid, setstockIdIsValid] = useState('');

  const checkStockIdOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stockId: string = event.target.value
    // TODO
    if (stockId == '') {
      setstockIdIsValid('')
    } else if (stockId != '2330') {
      setstockIdIsValid('is-invalid')
      console.log('stock id check invalid')
    } else {
      setstockIdIsValid('is-valid')
      console.log('stock id check valid')
    }
  }

  return (
    <>
      <PageHeader preTitle='台股' title='新增交易'>
        {/* Page title actions */}
        <div className="col-auto ms-auto">
          <div className="btn-list">
            <Link href="/" className="btn btn-secondary d-none d-sm-inline-block">
              返回
            </Link>
          </div>
        </div>
      </PageHeader>

      {/* page body */}
      <div className="page-body">
        <Container>
          <Row className='row-cards'>
            <Col className='col-12'>
              <Card>
                <Form>
                  <Card.Header>
                    <Card.Title as='h4'>台股交易</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className='g-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易日期</Form.Label>
                        <div className='input-icon'>
                          <Form.Control type='date' placeholder={moment().format('YYYY-MM-DD')} id={'datepicker-icon'}></Form.Control>
                          <span className="input-icon-addon">
                            {/* Download SVG icon from http://tabler-icons.io/i/calendar */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                              <path d="M16 3l0 4"></path><path d="M8 3l0 4"></path>
                              <path d="M4 11l16 0"></path><path d="M11 15l1 0"></path>
                              <path d="M12 15l0 3">
                              </path></svg>
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易帳戶</Form.Label>
                        <Form.Select>
                          {stock_account.map((account_name, index) =>
                            <option key={index}>{account_name}</option>
                          )}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>股票代號</Form.Label>
                        <Form.Control placeholder='2330' onChange={checkStockIdOnChange} className={stockIdIsValid}></Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>買賣別</Form.Label>
                        <Form.Select>
                          <option>買</option>
                          <option>賣</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易類別</Form.Label>
                        <Form.Select>
                          <option>一般</option>
                          <option>ETF</option>
                          <option>定期定額</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>股票名稱 TODO</Form.Label>
                        <Form.Control placeholder='台積電'></Form.Control>
                      </Form.Group>
                    </Row>

                    <Row className='mt-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易股數</Form.Label>
                        <Form.Control type='number' placeholder='1000'></Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>成交價格</Form.Label>
                        <Form.Control placeholder='500'></Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>手續費 TODO</Form.Label>
                        <Form.Control placeholder='500'></Form.Control>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                  <Card.Footer className='text-end'>
                    <div className='d-flex'>
                      <Link href={'/'} className='btn btn-link'>取消</Link>
                      <Button type='submit' className='ms-auto'>送出</Button>
                    </div>
                  </Card.Footer>
                </Form>
              </Card>
            </Col>
          </Row>

        </Container>
      </div > {/* end of page-body */}
    </>
  )
}
