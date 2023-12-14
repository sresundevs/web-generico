import { AuthProvider } from '@/providers/AuthContext'
import '@/styles/index.scss'
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/es_ES'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'

import theme from 'theme/themeConfig'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={locale} theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ConfigProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await App.getInitialProps(appContext)
  return { ...appProps }
}
