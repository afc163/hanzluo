import React from 'react'
import { StaticRouter } from 'react-router'
import { Layout } from 'antd'
import Routes from './routes'
import Nav from './nav/nav'
import Footer from './footer/footer'

const { Header } = Layout

const App = ({ req, context }) => (
  <StaticRouter
    location={req.originalUrl}
    context={context}
  >
    {/*<Layout>*/}
    {/*<SideBar />*/}
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Routes />
      <Footer />
    </Layout>
    {/*</Layout>*/}
  </StaticRouter>
)

export default App
