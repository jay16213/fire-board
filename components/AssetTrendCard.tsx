import { ApexOptions } from 'apexcharts';
import { Card } from 'react-bootstrap';
import ApexChart from './elements/ApexChart';

export interface AssetTrendCardProps {
  apexOptions?: ApexOptions,
  height?: number | string,
  width?: number | string
}

type AssetTrendCardState = {}

const series = [{
  name: '庫存市值',
  data: [1000000, 1250000, 1100000, 1300000, 1350000, 1320000, 1400000, 1500000, 1500000, 1550000, 1560000, 1570000]
}]

const defaultOptions: ApexOptions = {
  chart: {
    type: 'area',
    stacked: false,
    // height: '200px',
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      show: false,
      // tools: {
      //   download: true,
      //   reset: true,
      //   pan: false
      // },
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  // title: {
  //   text: '股票資產市值變化',
  //   align: 'left'
  // },
  fill: {
    // type: 'solid',
    // opacity: 0.5,
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.6,
      opacityTo: 0.4,
      stops: [0, 90, 100]
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        return (val / 10000).toFixed(0);
      },
    },
    title: {
      text: '市值 (萬)'
    },
  },
  xaxis: {
    // type: 'datetime',
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val: number) {
        return (val / 10000).toFixed(0)
      }
    }
  }
}

export const AssetTrendCard: React.FC<AssetTrendCardProps> = (props: AssetTrendCardProps) => {
  const { apexOptions = defaultOptions, width = '100%', height = '100%' } = props;

  return (
    <Card>
      <Card.Body>
        <Card.Title as={'h2'} className='fw-bold mb-0'>
          資產市值趨勢變化
        </Card.Title>
        {/* <div className='d-flex flex-column align-items-center'> */}
        <ApexChart
          options={apexOptions}
          series={series}
          type="area"
          height={height}
          width={width}>
        </ApexChart>
        {/* </div> */}
      </Card.Body>
    </Card>
  )
}
