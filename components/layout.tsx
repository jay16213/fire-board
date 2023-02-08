import Head from 'next/head'
// import Link from 'next/link'
import Script from 'next/script'

export const siteTitle = 'FireBoard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />

        <meta name="og:title" content={siteTitle} />
      </Head> */}
      <Script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></Script>
      <main>{children}</main>
    </>
  )
}
