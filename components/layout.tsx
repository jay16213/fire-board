import { IconHome, IconLifebuoy } from '@tabler/icons-react';
import Link from 'next/link';
import Script from 'next/script';
import { Container, Navbar } from 'react-bootstrap';
import PageWrapper from './elements/page/PageWrapper';
import MyNavbar from './navbar';

export const siteTitle = 'FireBoard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='page'>
        <MyNavbar></MyNavbar>

        {/* sub navber */}
        <header className="navbar-expand-md">
          <Navbar.Collapse id="navbar-menu">
            <div className="navbar navbar-light">
              <Container fluid='xl'>
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" href="/">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconHome></IconHome>
                      </span>
                      <span className="nav-link-title">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="../">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconHome></IconHome>
                      </span>
                      <span className="nav-link-title">
                        台股
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#navbar-help" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconLifebuoy></IconLifebuoy>
                      </span>
                      <span className="nav-link-title">
                        Help
                      </span>
                    </Link>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" href="../docs/">
                        Documentation
                      </Link>
                      <Link className="dropdown-item" href="../changelog.html">
                        Changelog
                      </Link>
                    </div>
                  </li>
                </ul>
              </Container>
            </div>
          </Navbar.Collapse>
        </header>

        <PageWrapper>{children}</PageWrapper>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></Script>
    </>
  )
}
