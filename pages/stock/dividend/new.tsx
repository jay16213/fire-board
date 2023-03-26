import PageHeader from '@/components/elements/page/PageHeader';
import { prisma } from '@/db/prisma';
import { IconCalendar } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { calculateCashDividendPayable, calculateStockDividendPayable } from '@/lib/stock';
import { useRouter } from 'next/router';
import "react-datepicker/dist/react-datepicker.css";

type ExDividendData = {
  exDividendDate: Date
  dividendPayDate: Date
  stockAccountId: number
  stockId: String
  shares: number
  cashDividend: number
  cashDividendPayable: number
  stockDividend: number
  stockDividendPayable: number
  tax: number
  fee: number
  healthInsurance: number
  cashActualPayment: number
  stockActualPayment: number
}

type StockNewExDividendFormProps = {
  stockAccountList: {
    id: number,
    name: string,
    minFee: number,
    regularFee: number
    feeDiscount: number,
  }[]
}

const StockNewExDividendForm: React.FC<StockNewExDividendFormProps> = ({ stockAccountList }: StockNewExDividendFormProps) => {
  const router = useRouter()
  const { control, register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm<ExDividendData>({
    defaultValues: {
      exDividendDate: new Date(),
      dividendPayDate: new Date(),
      stockAccountId: 0,
      stockId: '',
      shares: 0,
      cashDividend: 0,
      cashDividendPayable: 0,
      stockDividend: 0,
      stockDividendPayable: 0,
      tax: 0,
      fee: 0,
      healthInsurance: 0,
      cashActualPayment: 0,
      stockActualPayment: 0,
    }
  });

  const [stockName, setStockName] = useState('')

  const onSubmit: SubmitHandler<ExDividendData> = async (data, event) => {
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
      // router.push('/stock')
      router.back()
    }
  }

  const handleStockIdChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const stockId: string = event.target.value

    if (stockId.length >= 4) {
      try {
        // const res = await fetch(`/api/stock/meta?stockId=${stockId}`)
        const res = await fetch(`/api/stock/meta?stockId=${stockId}`)
        const data = await res.json();
        setStockName(data.name)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      setStockName('')
    }
  }

  const handleCashActualPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('cashActualPayment', parseInt(event.target.value))
  }

  const handleStockActualPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('stockActualPayment', parseInt(event.target.value))
  }

  const updateFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shares = getValues('shares')
    const cashDividend = getValues('cashDividend')
    const stockDividend = getValues('stockActualPayment')
    const fee = getValues('fee')
    const tax = getValues('tax')
    const healthInsurance = getValues('healthInsurance')

    if (!Number.isNaN(shares) && !Number.isNaN(cashDividend) && !Number.isNaN(stockDividend) &&
      !Number.isNaN(fee) && !Number.isNaN(tax) && !Number.isNaN(healthInsurance)) {
      const cashPayable = calculateCashDividendPayable(shares, cashDividend)
      const stockPayable = calculateStockDividendPayable(shares, stockDividend)

      setValue('cashDividendPayable', cashPayable)
      setValue('stockDividendPayable', stockPayable)

      setValue('cashActualPayment', cashPayable - fee - tax - healthInsurance)
      setValue('stockActualPayment', stockPayable)
    }
  }

  return (
    <>
      <PageHeader preTitle='台股' title='新增除權息紀錄'>
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
                <Form method='POST' action='/api/stock/dividend' onSubmit={handleSubmit(onSubmit)}>
                  <Card.Header>
                    <Card.Title as='h4'>除權息紀錄</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className='g-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>除權息日</Form.Label>
                        <div className='input-icon'>
                          <Controller
                            name={'exDividendDate'}
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
                        <Form.Label>股利發放日期</Form.Label>
                        <div className='input-icon'>
                          <Controller
                            name={'dividendPayDate'}
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
                        <Form.Label>帳戶</Form.Label>
                        <Form.Select {...register('stockAccountId')}>
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
                        <Form.Control placeholder='台積電' value={stockName} readOnly={true}>
                        </Form.Control>
                      </Form.Group>

                    </Row>

                    <Row className='mt-4'>
                      <Form.Group className='col-lg-2'>
                        <Form.Label>持有股數</Form.Label>
                        <Form.Control
                          type="number"
                          {...register('shares', { min: 1, required: true, onChange: updateFields })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>現金股利</Form.Label>
                        <Form.Control type='number' {...register('cashDividend', { required: true, onChange: updateFields })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>應領現金股利</Form.Label>
                        <Form.Control type='number' {...register('cashDividendPayable', { required: true, onChange: updateFields })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>股票股利</Form.Label>
                        <Form.Control type='number' {...register('stockDividend', { required: true, onChange: updateFields })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>應發股數</Form.Label>
                        <Form.Control type='number' {...register('stockDividendPayable', { required: true })}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>匯費</Form.Label>
                        <Form.Control placeholder='請輸入匯費'
                          type='number'
                          {...register('fee', { required: true, onChange: updateFields })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>稅</Form.Label>
                        <Form.Control placeholder='請輸入'
                          type='number'
                          {...register('tax', { required: true, onChange: updateFields })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>二代健保費</Form.Label>
                        <Form.Control placeholder='請輸入'
                          type='number'
                          {...register('healthInsurance', { required: true, onChange: updateFields })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>實領現金股利</Form.Label>
                        <Form.Control
                          type='number'
                          {...register('cashActualPayment', { required: true, onChange: handleCashActualPaymentChange })}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='col-lg-2'>
                        <Form.Label>實領股數</Form.Label>
                        <Form.Control
                          type='number'
                          {...register('stockActualPayment', { required: true, onChange: handleStockActualPaymentChange })}
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

export default StockNewExDividendForm;
