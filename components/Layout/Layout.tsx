import { MenuItems } from '@/types/types'
import { ArrowUpOutlined, HomeOutlined, ShoppingOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Image, Layout, Menu, MenuProps, theme } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'
import { Props } from './Props.interface'
import useAuth from '@/providers/AuthContext'

const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const MainLayout: FC<Props> = ({ children, title }) => {
  const router = useRouter()
  const { logout } = useAuth()

  const [collapsed, setCollapsed] = useState(false)
  const [selectOption, setSelectOption] = useState<string[]>(['0'])
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const menuItems: MenuItems[] = useMemo(
    () => [
      { path: '/', title: 'Home', icon: <HomeOutlined /> },
      { path: '/customers', title: 'Customers', icon: <ShoppingOutlined /> },
      { path: '/customers-movie', title: 'Customers Cinemas', icon: <SmileOutlined /> },
      { path: '/users', title: 'Users', icon: <UserOutlined /> },
      { path: '/cron-generated', title: 'Cron Generator', icon: <UserOutlined /> }
    ],
    []
  )

  useEffect(() => {
    menuItems.map((item, index) => {
      if (router.pathname === item.path) {
        setSelectOption([(index + 1).toString()])
      }
    })
  }, [router.pathname, menuItems])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Layout className="mainLayout">
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo">
              {collapsed ? (
                <Image src="/Logo.png" preview={false} alt="Sundevs Logo" />
              ) : (
                <Image src="/LogoWhite.png" preview={false} alt="Sundevs Logo" />
              )}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={selectOption}
              items={menuItems.map(
                (item, index): MenuItem => ({ label: <Link href={item.path}>{item.title}</Link>, key: index + 1, icon: item.icon })
              )}
            />
          </Sider>
          <Layout>
            <Header className="headerLayout" style={{ background: colorBgContainer }}>
              <h1>{title}</h1>
              <Button onClick={() => logout()}>Logout</Button>
            </Header>
            <Content className="contentLayout" style={{ background: colorBgContainer }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </main>
    </>
  )
}

export default MainLayout
