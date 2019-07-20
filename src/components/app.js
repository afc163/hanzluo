import React from 'react'
import { Switch, Route } from 'react-router'
import { createI18n, I18nProvider } from 'react-simple-i18n'
import { Layout } from 'antd'
import Home from './home/home'
import Resume from './resume/resume'
import Nav from './nav/nav'
import Footer from './footer/footer'
import './app.less'

const { Header } = Layout

const App = ({ langData, Router, routerProps }) => (
  <I18nProvider i18n={createI18n(langData, { lang: 'enUS' })}>
    <Router {...routerProps}>
      <Layout>
        <Header>
          <Nav />
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/resume" component={Resume} />
        </Switch>
        <Footer />
      </Layout>
    </Router>
  </I18nProvider>
)

export default App
