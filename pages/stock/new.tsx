import PageHeader from '@/components/elements/page/PageHeader';
import { prisma } from '@/db/prisma';
import { calculateFeeByAmount, calculateStockTransactionFee, calculateTax } from '@/lib/stock';
import { IconCalendar } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from 'next/router';
import "react-datepicker/dist/react-datepicker.css";

type TransactionData = {
  date: Date
  accountId: number // accountId
  stockId: string
  stockName: string
  type: string
  sellOrBuy: string
  shares: number
  price: number
  amount: number
  fee: number
  feeAfterDiscount: number
  tax: number
}

type StockNewTransactionFormProps = {
  stockAccountList: {
    id: number,
    name: string,
    minFee: number,
    regularFee: number
    feeDiscount: number,
  }[]
}

const StockNewTransactionForm: React.FC<StockNewTransactionFormProps> = ({ stockAccountList }: StockNewTransactionFormProps) => {
  const router = useRouter()
  const { control, register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm<TransactionData>({
    defaultValues: {
      date: new Date(),
      accountId: 0,
      stockId: '',
      stockName: '',
      type: '一般',
      sellOrBuy: '買',
      shares: 0,
      price: 0,
      amount: 0,
      fee: 0,
      feeAfterDiscount: 0,
      tax: 0
    }
  });

  const [discountDisplay, setDiscountDisplay] = useState('')

  const onSubmit: SubmitHandler<TransactionData> = async (data, event) => {
    // Stop the form from submitting and refreshing the page.
    // event.preventDefault()

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
    }

    const res = await fetch('/api/stock/transactions', options)
    if (res.status != 201) {
      alert('錯誤')
    } else {
      router.back()
    }
  }

  const handleStockIdChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const stockId: string = event.target.value

    if (stockId.length >= 4) {
      try {
        const res = await fetch(`/api/stock/meta?stockId=${stockId}`)
        const data = await res.json();

        setValue('stockName', data.name)
        setValue('type', data.type)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      setValue('stockName', '')
    }
  }

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value)
    const account = stockAccountList.find((a) => a.id == id)

    if (account) {
      setDiscountDisplay(`(${(account.feeDiscount * 10)}折)`)
    }
  }

  const updateFields = (shares: number, price: number) => {
    const sellOrBuy = getValues('sellOrBuy')
    const stockType = getValues('type')
    const account = stockAccountList.find((a) => a.id == getValues('accountId'))

    if (account && !Number.isNaN(shares) && !Number.isNaN(price)) {
      let amount = Math.round(shares * price)
      let { fee, feeAfterDiscount } = calculateStockTransactionFee(shares, price, account.feeDiscount, account.minFee)

      setValue('amount', amount)
      setValue('fee', fee)
      setValue('feeAfterDiscount', feeAfterDiscount)

      if (sellOrBuy == '賣') {
        let tax = calculateTax(shares, price, stockType == 'ETF')
        setValue('tax', tax)
      }
    }
  }

  const handleSharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shares = event.target.valueAsNumber
    const price = getValues('price')

    updateFields(shares, price)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shares = getValues('shares')
    const price = event.target.valueAsNumber

    updateFields(shares, price)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.valueAsNumber
    const account = stockAccountList.find((a) => a.id == getValues('accountId'))

    if (account && !Number.isNaN(amount)) {
      let { fee, feeAfterDiscount } = calculateFeeByAmount(amount, account.feeDiscount, account.minFee)

      setValue('fee', fee)
      setValue('feeAfterDiscount', feeAfterDiscount)
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
                <Form method='POST' action='/api/stock/transactions' onSubmit={handleSubmit(onSubmit)}>
                  <Card.Header>
                    <Card.Title as='h4'>台股交易</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className='g-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易日期</Form.Label>
                        <div className='input-icon'>
                          <Controller
                            name={'date'}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                placeholderText='請選擇日期'
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat='yyyy/MM/dd'
                                className='form-control ps-3' // TODO: fix padding
                              />
                            )}
                          />
                          <span className="input-icon-addon">
                            <IconCalendar className='icon'></IconCalendar>
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易帳戶</Form.Label>
                        <Form.Select {...register('accountId', { required: true })} onChange={handleAccountChange}>
                          {stockAccountList.map((account, index) =>
                            <option key={index} value={account.id}>{account.name}</option>
                          )}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>股票代號</Form.Label>
                        <Form.Control placeholder='2330'
                          {...register('stockId', { minLength: 4, required: true, onChange: handleStockIdChange })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>股票名稱</Form.Label>
                        <Form.Control placeholder='台積電' {...register('stockName', { required: true })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>買賣別</Form.Label>
                        <Form.Select {...register('sellOrBuy', { required: true })}>
                          <option>買</option>
                          <option>賣</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易類別</Form.Label>
                        <Form.Select {...register('type', { required: true })}>
                          <option>一般</option>
                          <option>ETF</option>
                          <option>定期定額</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row className='mt-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易股數</Form.Label>
                        <Form.Control
                          type="number"
                          {...register('shares', { min: 1, required: true, onChange: handleSharesChange })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>成交價格</Form.Label>
                        <Form.Control type='number' {...register('price', { required: true, onChange: handlePriceChange })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>成交價金</Form.Label>
                        <Form.Control placeholder='成交價金'
                          type='number'
                          {...register('amount', { required: true, onChange: handleAmountChange })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>手續費</Form.Label>
                        <Form.Control placeholder='折扣前手續費'
                          type='number'
                          {...register('fee', { required: true })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>
                          折讓後手續費 {discountDisplay}
                        </Form.Label>
                        <Form.Control placeholder='折扣後手續費'
                          type='number'
                          {...register('feeAfterDiscount', { required: true })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>交易稅</Form.Label>
                        <Form.Control placeholder='賣出交易稅'
                          type='number'
                          {...register('tax', { required: (watch('sellOrBuy') == '賣') })}
                          disabled={(watch('sellOrBuy') == '買')}
                        >
                        </Form.Control>
                      </Form.Group>
                    </Row>

                    {/* transaction info */}
                    <Row className='mt-4 border-top pt-3'>
                      <Col className='col-12'>
                        <h2>以下是您本次交易明細：</h2>
                      </Col>
                      <Col>
                        T.B.D
                      </Col>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stockAccountList = await prisma.stockAccount.findMany({
    select: {
      id: true,
      name: true,
      minFee: true,
      regularFee: true,
      feeDiscount: true,
    }
  })

  console.log(stockAccountList)
  return { props: { stockAccountList: JSON.parse(JSON.stringify(stockAccountList)) } }
}

export default StockNewTransactionForm;
