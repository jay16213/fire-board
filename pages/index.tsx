import { AssetTrendCard } from '@/components/AssetTrendCard';
import ApexChart from '@/components/elements/ApexChart';
import PageHeader from '@/components/elements/page/PageHeader';
import ExDividendRecord from '@/components/ExDividendRecord';
import StockPositionCard from '@/components/StockPositionCard';
import TransactionRecordCard from '@/components/TransactionRecordCard';
import { fetcher } from '@/lib/fetcher';
import { IconPlus } from '@tabler/icons-react';
import { ApexOptions } from 'apexcharts';
import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import useSWR from 'swr';


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
  const { data, error } = useSWR<any[], Error>('/api/stock/positions', fetcher)

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
                  <div className="d-flex flex-column align-items-center">
                    <div className="h1 mb-0 me-2">
                      {`\$${data.reduce((total, position) => total + position.currentValue, 0)}`}
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
                  <div className="d-flex flex-column align-items-center">
                    <div className="h1 mb-0 me-2">
                      {`\$${data.reduce((total, position) => total + position.unrealizedGainsLosses, 0)}`}
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

            <Col sm={12} lg={6}>
              {/* 圓餅圖 */}
              <Card>
                <Card.Body>
                  <div className='d-flex flex-column align-items-center'>
                    <h2>持股分布</h2>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex flex-column align-items-center'>
                      <h3>按市值</h3>
                      {/* <PieChart width={400} height={200}>
                        <Legend layout='vertical' align='right' verticalAlign='middle'></Legend>
                        <Pie
                          data={data_a}
                          innerRadius={50}
                          outerRadius={80}
                          label={renderCustomizedLabel}
                          labelLine={false}
                          fill="#8884d8"
                          paddingAngle={2}
                          nameKey="name"
                          dataKey="value"
                        >
                          {data_a.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart> */}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} lg={4}>
              <Card>
                <Card.Header>
                  <Card.Title as={'h3'}>持股分布 (產業別)</Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* <div className='d-flex align-items-center'>
                    <div className='subheader'>持股分布 (產業別)</div>
                  </div> */}
                  <div className='d-flex flex-column align-items-center'>
                    <ApexChart
                      options={{ ...defaultOptions, labels: data.map((d) => d.stockName) }}
                      series={data.map((d) => d.currentValue)}
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
