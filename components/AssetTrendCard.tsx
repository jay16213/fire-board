import { ApexOptions } from 'apexcharts';
import { Card } from 'react-bootstrap';
import ApexChart from './elements/ApexChart';

export interface AssetTrendCardProps {
  apexOptions?: ApexOptions
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
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
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
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
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

export const AssetTrendCard = (props: AssetTrendCardProps) => {
  const { apexOptions = defaultOptions } = props;

  return (
    <Card>
      <Card.Body>
        <div className='d-flex align-items-center'>
          <h2>資產市值趨勢變化</h2>
          {/* {timeFilter(defult_filter_list)} */}
        </div>
        <div className='d-flex flex-column align-items-center'>
          <ApexChart
            options={apexOptions}
            series={series}
            type="area"
            width='600'>
          </ApexChart>
        </div>
      </Card.Body>
    </Card>
  )
}
