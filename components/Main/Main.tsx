/* import React, { useContext } from 'react'
import Head from 'next/head'
import { ThemeContext } from '../providers/ThemeContext'
import useAuth from '../providers/AuthContext'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function main({ children, title }: { children: JSX.Element; title?: string }): JSX.Element {
  //const { spinning } = useAuth()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={`mainContainerApp`}>
        {spining && (
          <div className="loading">
            <Spin indicator={<LoadingOutlined />} tip={'loading'} spinning={spinning} size="large"></Spin>
          </div>
        )}
        {children}
      </main>
    </>
  )
}
 */
