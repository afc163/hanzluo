import React, { useState } from 'react'
import { Menu, Icon, Row, Col, Dropdown, Drawer } from 'antd'
import { withRouter } from 'react-router'
import { withI18n } from 'react-simple-i18n'
import { Link } from 'react-router-dom'
import './nav.less'

const Nav = ({ location, t, i18n }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false)

  return (
    <Row type="flex" justify="center">
      <Col xs={24} sm={20} md={18} lg={14}>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          id="nav"
          selectedKeys={[location.pathname]}
          className={location.pathname === '/' ? 'nav-home' : ''}
        >
          <Menu.Item 
            id="nav-mobile-menu-trigger"
            className="nav-item-mobile"
            key="menu"
            onClick={() => setDrawerVisible(!isDrawerVisible)}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
            <Drawer closable={false} placement="left" visible={isDrawerVisible} onClose={() => setDrawerVisible(false)}>
              <Menu id="nav-mobile-drawer" selectedKeys={[location.pathname]}>
                <Menu.Item className="nav-item-desktop" key="/">
                  <Link to="/">
                    <Icon type="home" /> {t('nav.home')}
                  </Link>
                </Menu.Item>
                <Menu.Item className="nav-item-desktop" key="/resume">
                  <Link to="/resume">{t('nav.resume')}</Link>
                </Menu.Item>
              </Menu>
            </Drawer>
          </Menu.Item>
          <Menu.Item className="nav-item-desktop" key="/">
            <Link to="/">
              <Icon type="home" /> {t('nav.home')}
            </Link>
          </Menu.Item>
          <Menu.Item className="nav-item-desktop" key="/resume">
            <Link to="/resume">{t('nav.resume')}</Link>
          </Menu.Item>
          <Menu.Item key="4" id="language-dropdown-nav-item">
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={() => i18n.setLang('enUS')}>
                      English
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => i18n.setLang('zhCN')}>
                      中文
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link" href="#">
                {t('nav.language')} <i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

export default withRouter(withI18n(Nav))
