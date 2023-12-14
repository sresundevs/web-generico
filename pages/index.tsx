import MainLayout from '@/components/Layout/Layout'
import { theme } from 'antd'

export default function Home() {
  const {
    token: { colorTextBase }
  } = theme.useToken()

  return (
    <MainLayout title="Home">
      <p>Hola</p>
    </MainLayout>
  )
}
