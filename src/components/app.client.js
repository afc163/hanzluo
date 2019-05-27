import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './routes'
import Nav from './nav/nav'
import Footer from './footer/footer'
import './app.less'

const { Header } = Layout

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
)

export default App
