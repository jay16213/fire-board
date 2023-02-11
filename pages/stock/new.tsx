import PageHeader from '@/components/elements/page/PageHeader';
import PageWrapper from '@/components/elements/page/PageWrapper';
import MyNavbar from '@/components/navbar';
import moment from 'moment';
import Link from 'next/link';
import { Component } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const stock_account: string[] = [
  '永豐金',
  '玉山富果'
]

export default class StockNewTransactionForm extends Component {
  render() {
    return (
      <div className="page">
        {/* Navbar */}
        <MyNavbar></MyNavbar>

        <header className="navbar-expand-md">
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="navbar navbar-light">
              <div className="container-xl">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" href="/">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
                      </span>
                      <span className="nav-link-title">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="../">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                        </svg>
                      </span>
                      <span className="nav-link-title">
                        台股
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path><path d="M12 12l8 -4.5"></path><path d="M12 12l0 9"></path><path d="M12 12l-8 -4.5"></path><path d="M16 5.25l-8 4.5"></path></svg>
                      </span>
                      <span className="nav-link-title">
                        Interface
                      </span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="../empty.html">
                            Empty page
                          </a>
                          <a className="dropdown-item" href="../accordion.html">
                            Accordion
                          </a>
                          <a className="dropdown-item" href="../blank.html">
                            Blank page
                          </a>
                          <a className="dropdown-item" href="../badges.html">
                            Badges
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="../buttons.html">
                            Buttons
                          </a>
                          <div className="dropend">
                            <a className="dropdown-item dropdown-toggle" href="#sidebar-cards" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                              Cards
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <div className="dropdown-menu">
                              <a href="../cards.html" className="dropdown-item">
                                Sample cards
                              </a>
                              <a href="../card-actions.html" className="dropdown-item">
                                Card actions
                                <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                              </a>
                              <a href="../cards-masonry.html" className="dropdown-item">
                                Cards Masonry
                              </a>
                            </div>
                          </div>
                          <a className="dropdown-item" href="../map-fullsize.html">
                            Map fullsize
                          </a>
                          <a className="dropdown-item" href="../maps-vector.html">
                            Vector maps
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="../navigation.html">
                            Navigation
                          </a>
                        </div>
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="../pagination.html">
                            Pagination
                          </a>

                          <a className="dropdown-item" href="../carousel.html">
                            Carousel
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="../lists.html">
                            Lists
                          </a>
                          <a className="dropdown-item" href="../typography.html">
                            Typography
                          </a>
                          <a className="dropdown-item" href="../offcanvas.html">
                            Offcanvas
                          </a>
                          <a className="dropdown-item" href="../markdown.html">
                            Markdown
                          </a>
                          <a className="dropdown-item" href="../dropzone.html">
                            Dropzone
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="../inline-player.html">
                            Inline player
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <div className="dropend">
                            <a className="dropdown-item dropdown-toggle" href="#sidebar-error" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline me-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M9 14l6 0"></path></svg>
                              Error pages
                            </a>
                            <div className="dropdown-menu">
                              <a href="../error-404.html" className="dropdown-item">
                                404 page
                              </a>
                              <a href="../error-500.html" className="dropdown-item">
                                500 page
                              </a>
                              <a href="../error-maintenance.html" className="dropdown-item">
                                Maintenance page
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="../form-elements.html">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 11l3 3l8 -8"></path><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path></svg>
                      </span>
                      <span className="nav-link-title">
                        Form elements
                      </span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-help" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M15 15l3.35 3.35"></path><path d="M9 15l-3.35 3.35"></path><path d="M5.65 5.65l3.35 3.35"></path><path d="M18.35 5.65l-3.35 3.35"></path></svg>
                      </span>
                      <span className="nav-link-title">
                        Help
                      </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="../docs/">
                        Documentation
                      </a>
                      <a className="dropdown-item" href="../changelog.html">
                        Changelog
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <PageWrapper>
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
                              <Form.Control placeholder='請選擇日期' id={'datepicker-icon'} value={moment().format('YYYY-MM-DD')}></Form.Control>
                              <span className="input-icon-addon">
                                {/* Download SVG icon from http://tabler-icons.io/i/calendar */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M16 3l0 4"></path><path d="M8 3l0 4"></path><path d="M4 11l16 0"></path><path d="M11 15l1 0"></path><path d="M12 15l0 3"></path></svg>
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
                            <Form.Control placeholder='2330'></Form.Control>
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
                            <Form.Control placeholder='1000'></Form.Control>
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
        </PageWrapper >
      </div >
    )
  }
}
