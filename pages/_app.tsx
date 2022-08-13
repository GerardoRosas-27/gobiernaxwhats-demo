import '../styles/globals.css'



function MyApp(data: any) {
  let { Component, pageProps, router } = data
  console.log(router.pathname)
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
