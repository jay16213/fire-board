import Link from "next/link";
import CardBody from "./CardBody"
import CardHeader from "./CardHeader"

const filter_list: string[] = [
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
];

export default function Card({
  title,
  subtitle,
  timeFilter,
  children
}: {
  title?: string,
  subtitle?: string,
  timeFilter?: boolean,
  children?: React.ReactNode,
}) {
  return (
    <div className="card">
      {title &&
        <CardHeader>
          <h3 className="card-title">{title}</h3>
        </CardHeader>
      }

      <CardBody>
        {subtitle &&
          <div className="d-flex align-items-center">
            <div className="subheader">{subtitle}</div>
            {timeFilter &&
              <div className="ms-auto lh-1">
                <div className="dropdown">
                  <Link className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{filter_list[0]}</Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    {filter_list.map((filter, index) =>
                      <Link className="dropdown-item" href="#" key={index}>{filter}</Link>
                    )}
                  </div>
                </div>
              </div>
            }
          </div>
        }

        {/* display default div if children is empty */}
        {children ? children :
          <div className="d-flex align-items-center">
            <div className="h1 mb-0 me-2">$4,300</div>
            <div className="me-auto">
              <span className="text-green d-inline-flex align-items-center lh-1">
                8% ($1000)
                <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 17l6 -6l4 4l8 -8"></path>
                  <path d="M14 7l7 0l0 7"></path>
                </svg>
              </span>
            </div>
          </div>
        }

      </CardBody >
    </div >
  )
}
