import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <Link href={"/"}>
            <Image src={"logo.svg"} width="110" height={"32"} alt="Tabler" className="navbar-brand-image"></Image>
          </Link>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" aria-label="Show notifications">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path></svg>
                <span className="badge bg-red"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Last updates</h3>
                  </div>
                  <div className="list-group list-group-flush list-group-hoverable">
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot status-dot-animated bg-red d-block"></span></div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 1</a>
                          <div className="d-block text-muted text-truncate mt-n1">
                            Change deprecated html tags to text decoration classes (#29604)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions">
                            {/* <!-- Download SVG icon from http://tabler-icons.io/i/star --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot d-block"></span></div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 2</a>
                          <div className="d-block text-muted text-truncate mt-n1">
                            justify-content:between ⇒ justify-content:space-between (#29734)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions show">
                            {/* <!-- Download SVG icon from http://tabler-icons.io/i/star --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon text-yellow" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
              {/* <span className="avatar avatar-sm" style={"background-image: url(../static/avatars/000m.jpg)"}></span> */}
              <div className="d-none d-xl-block ps-2">
                <div>Username</div>
                <div className="mt-1 small text-muted">hello</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              {/* <a href="#" className="dropdown-item">Status</a> */}
              {/* <a href="../profile.html" className="dropdown-item">Profile</a> */}
              <a href="../settings.html" className="dropdown-item">設定</a>
              <a href="../sign-in.html" className="dropdown-item">登出</a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">Feedback</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
