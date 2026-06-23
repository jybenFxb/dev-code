import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Typography, theme, Badge } from 'antd'
import {
  DashboardOutlined,
  BugOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useUserStore } from '@/store/userStore'
import { usePageView } from '@/monitor/hooks/usePageView'
import styles from './MainLayout.module.css'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const menuItems: MenuProps['items'] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '总览',
  },
  {
    key: 'monitor',
    icon: <BugOutlined />,
    label: '监控中心',
    children: [
      {
        key: '/monitor/errors',
        icon: <BugOutlined />,
        label: '错误监控',
      },
      {
        key: '/monitor/performance',
        icon: <ThunderboltOutlined />,
        label: '性能分析',
      },
      {
        key: '/monitor/behavior',
        icon: <BarChartOutlined />,
        label: '行为埋点',
      },
    ],
  },
]

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, logout } = useUserStore()
  const { token } = theme.useToken()

  // 自动追踪页面 PV
  usePageView()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  // 根据当前路径展开对应的父菜单
  const openKeys = location.pathname.startsWith('/monitor') ? ['monitor'] : []

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{ background: token.colorBgContainer }}
        className={styles.sider}
      >
        {/* Logo 区域 */}
        <div className={styles.logo}>
          <BugOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
          {!collapsed && (
            <Text strong style={{ marginLeft: 8, fontSize: 16, color: token.colorPrimary }}>
              Monitor Admin
            </Text>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={openKeys}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Header
          style={{ background: token.colorBgContainer, padding: '0 24px' }}
          className={styles.header}
        >
          {/* 折叠按钮 */}
          <div
            className={styles.trigger}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* 右侧操作区 */}
          <div className={styles.headerRight}>
            <Badge count={3} size="small">
              <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className={styles.userInfo}>
                <Avatar
                  src={userInfo?.avatar}
                  icon={<UserOutlined />}
                  size="small"
                />
                <Text style={{ marginLeft: 8 }}>{userInfo?.name}</Text>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
