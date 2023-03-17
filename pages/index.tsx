import { AssetTrendCard } from '@/components/AssetTrendCard';
import ApexChart from '@/components/elements/ApexChart';
import PageHeader from '@/components/elements/page/PageHeader';
import ExDividendRecord from '@/components/ExDividendRecord';
import StockPositionCard from '@/components/StockPositionCard';
import TransactionRecordCard from '@/components/TransactionRecordCard';
import { fetcher } from '@/lib/fetcher';
import { IconPlus, IconTrendingUp } from '@tabler/icons-react';
import { ApexOptions } from 'apexcharts';
import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import useSWR from 'swr';
import { StockPositionModel, StockPositionResponse } from './api/stock/positions';


const defult_filter_list: string[] = [
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
];

const data_a = [
  { name: '台積電', value: 80000 },
  { name: '富邦台灣50', value: 70000 },
  { name: '國泰永續高股息', value: 75000 },
  { name: '群聯', value: 200000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor='middle' dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const defaultOptions: ApexOptions = {
  chart: {
    type: 'donut',
    height: 300,
    width: 300,
    fontFamily: 'inherit',
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: true,
  },
  theme: {
    palette: 'palette4',
    monochrome: {
      enabled: true,
      color: '#008FFB',
      shadeTo: 'light',
      shadeIntensity: 0.6
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        // labels: {
        // show: true,
        // name: {
        //   show: true,
        // },
        // value: {
        //   show: true,
        // },
        // total: {
        //   show: true,
        //   showAlways: true,
        // }
        // }
      }
    }
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: 'dark',
    fillSeriesColor: false
  },
  legend: {
    show: true,
    position: 'right',
  },
  /*
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        height: 250,
        width: 400
      },
      legend: {
        show: true,
        position: 'bottom',
        offsetY: 12,
        markers: {
          width: 10,
          height: 10,
          radius: 100,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 8
        },
      },
    }
  }]
  */
}

function timeFilter(filter_list: string[]) {
  return (
    <div className="ms-auto lh-1">
      < div className="dropdown" >
        <Link className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{filter_list[0]}</Link>
        <div className="dropdown-menu dropdown-menu-end">
          {filter_list.map((filter, index) =>
            <Link className="dropdown-item" href="#" key={index}>{filter}</Link>
          )}
        </div>
      </div >
    </div >
  )
}

const Home = (props: any) => {
  const { data, error } = useSWR<StockPositionResponse, Error>('/api/stock/positions', fetcher)

  if (error) return <div>An error occured.</div>
  if (!data) return <div>Loading ...</div>

  return (
    <>
      <PageHeader preTitle='Overview' title='Dashboard'>
        {/* Page title actions */}
        <div className="col-auto ms-auto">
          <div className="btn-list">
            <Link href="/stock/new" className="btn btn-primary d-none d-sm-inline-block">
              <IconPlus className='icon'></IconPlus>
              新增交易
            </Link>
          </div>
        </div>
      </PageHeader>

      {/* page body */}
      <div className="page-body">
        <Container fluid='xl'>
          <Row className='row-deck row-cards'>
            <Col sm={6} lg={3}>
              <Card>
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>總資產</h2>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className="h1 mb-0 me-2">$2,000,000</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card>
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>股票總市值</h2>
                  </div>
                  <div className='d-flex justify-content-center align-items-baseline'>
                    <div className='h1 mb-0 me-2'>
                      ${data.totalMarketValue.toLocaleString('en-US')}
                    </div>
                    <div>
                      <span className='d-inline-flex align-items-center lh-1 text-muted'>
                        (持有成本: {Math.abs(data.totalCost).toLocaleString('en-US')})
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card>
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>未實現損益</h2>
                  </div>
                  <div className="d-flex justify-content-center align-items-baseline">
                    <div className="h1 mb-0 me-2">
                      ${data.totalUnrealizedGainLoss}
                    </div>
                    <div>
                      <span className="text-red d-inline-flex align-items-center lh-1">
                        {data.totalUnrealizedGainLossRatio}%<IconTrendingUp className='icon ms-1'></IconTrendingUp>
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card>
                <Card.Body>
                  <div className='d-flex align-items-center'>
                    <div className='subheader'>已領股利</div>
                    {timeFilter(defult_filter_list)}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} lg={4}>
              {/* 圓餅圖 */}
              <Card>
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>持股分布 (按市值)</h2>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex flex-column align-items-center'>
                      {/* <h3>按市值</h3> */}
                      <ApexChart
                        options={{ ...defaultOptions, labels: data.positions.map((d) => d.stockName) }}
                        series={data.positions.map((d) => d.marketValue)}
                        type='donut'
                        width={380}
                      >
                      </ApexChart>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} lg={4}>
              <Card>
                {/* <Card.Header>
                  <Card.Title as={'h3'}>持股分布 (產業別)</Card.Title>
                </Card.Header> */}
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>持股分布 (產業別)</h2>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <ApexChart
                      options={{
                        ...defaultOptions,
                        labels: data.positions.reduce((acc: string[], position: StockPositionModel) => {
                          if (!acc.includes(position.industryType)) {
                            acc.push(position.industryType)
                          }
                          return acc
                        }, [])
                      }}
                      series={Array.from(data.positions.reduce((acc: Map<string, number>, position: StockPositionModel) => {
                        const val = acc.get(position.industryType)
                        acc.set(position.industryType, val !== undefined ? val + 1 : 1)
                        // acc[position.industryType] = (acc[position.industryType] || 0) + 1
                        return acc
                      }, new Map()).values())}
                      type='donut'
                      width={380}
                    >
                    </ApexChart>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} lg={6}>
              <AssetTrendCard></AssetTrendCard>
            </Col>

            <Col sm={12} lg={6}>
              <StockPositionCard positions={data}></StockPositionCard>
            </Col>

            <Col sm={12} lg={6}>
              <Card>
                <Card.Header>
                  <Card.Title as={'h3'}>最近除權息</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ExDividendRecord></ExDividendRecord>
                </Card.Body>
              </Card>
            </Col>

            {/* stock transaction */}
            <Col className="col-12">
              <TransactionRecordCard></TransactionRecordCard>
            </Col>
          </Row>
        </Container>
      </div > {/* end of page-body */}
    </>
  )
}

export default Home;
