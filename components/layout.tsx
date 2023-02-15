import { IconHome, IconLifebuoy } from '@tabler/icons-react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';
import PageWrapper from './elements/page/PageWrapper';
import MyNavbar from './navbar';

export const siteTitle = 'FireBoard'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

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
                        <IconHome className='icon'></IconHome>
                      </span>
                      <span className="nav-link-title">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="../">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconHome className='icon'></IconHome>
                      </span>
                      <span className="nav-link-title">
                        台股
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#navbar-help" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconLifebuoy className='icon'></IconLifebuoy>
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
    </>
  )
}

export default Layout;
