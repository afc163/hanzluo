import React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const Nav = ({ location }) => (
  <Row type="flex" justify="center">
    <Col xs={24} sm={20} md={18} lg={14}>
      <Menu
        theme="light"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        id="desktop-nav"
        selectedKeys={[location.pathname]}
        className={location.pathname === '/' ? 'home' : ''}
      >
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" /> Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/resume">
          <Link to="/resume">Resume</Link>
        </Menu.Item>
        {/*<Menu.Item key="4">nav 3</Menu.Item>*/}
      </Menu>
    </Col>
  </Row>
)

export default withRouter(Nav)
