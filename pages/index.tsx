import Link from 'next/link'
import Card from '@/components/Card/Card'
import CardHeader from '@/components/Card/CardHeader'
import Navbar from '@/components/navbar'
import PageWrapper from '@/components/PageWrapper'
import TransactionRecord from '@/components/TransactionRecord'

export default function Home() {
  return (
    <div className="page">
      {/* Navbar */}
      <Navbar></Navbar>

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
        {/* page header */}
        <div className="page-header">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                {/* Page pre-title */}
                <div className="page-pretitle">
                  Overview
                </div>
                <h2 className="page-title">
                  Dashboard
                </h2>
              </div>
              {/* Page title actions */}
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <span className="d-none d-sm-inline">
                    <Link href={"#"} className="btn">New view</Link>
                  </span>
                  <Link href="#" className="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    新增交易
                  </Link>
                  <Link href="#" className="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report" aria-label="Create new report">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* page body */}
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              <div className="col-sm-6 col-lg-3">
                <Card subtitle="總資產"></Card>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Card subtitle="總市值"></Card>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Card subtitle="未實現損益"></Card>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Card subtitle="已領股利" timeFilter={true}></Card>
              </div>

              {/* <div className="col-12">
                <div className="row row-cards"> */}
              <div className="col-sm-12 col-lg-6">
                {/* 圓餅圖 */}
                <Card subtitle="持股分布"></Card>
              </div>

              <div className="col-sm-12 col-lg-6">
                <Card subtitle="持股分布 (產業別)"></Card>
              </div>
              {/* </div> */}
              {/* </div> */}

              <div className="col-12">
                <Card subtitle="資產市值變化" timeFilter={true}></Card>
              </div>

              {/* <div className="col-sm-12 col-lg-6">
                <Card title="最近交易" timeFilter={true}></Card>
              </div> */}

              <div className="col-sm-12 col-lg-6">
                <Card title='最近除權息'>
                  <TransactionRecord></TransactionRecord>
                </Card>
              </div>

              {/* TODO: stock position */}

              {/* stock transaction */}
              <div className="col-12">
                <div className="card">
                  <CardHeader>
                    <h3 className="card-title">台股交易紀錄</h3>
                  </CardHeader>
                  <div className="card-body border-bottom py-3">
                    <div className="d-flex">
                      <div className="text-muted">
                        顯示最近
                        <div className="mx-2 d-inline-block">
                          <input type="text" className="form-control form-control-sm" value="10" size={3} aria-label="Invoices count"></input>
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
                  </div>

                  <TransactionRecord></TransactionRecord>

                  <div className="card-footer d-flex align-items-center">
                    <p className="m-0 text-muted">Showing <span>1</span> to <span>8</span> of <span>16</span> entries</p>
                    <ul className="pagination m-0 ms-auto">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>
                          prev
                        </a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">4</a></li>
                      <li className="page-item"><a className="page-link" href="#">5</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          next
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div> {/* end of container-xl */}
        </div> {/* end of page-body */}
      </PageWrapper>
    </div>
  )
}
