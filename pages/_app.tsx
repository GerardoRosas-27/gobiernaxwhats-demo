import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from '@components/layouts/main';

function MyApp(data: any) {
  let { Component, pageProps } = data
  const Layout = Component?.Layout || EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
const EmptyLayout = (Component: any) => {
  return (
    <>
      {Component.children}
    </>
  )
}

export default MyApp
