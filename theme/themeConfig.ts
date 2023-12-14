import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#002140',
    colorInfo: '#002140'
  },
  components: {
    Button: {
      primaryShadow: undefined
    },
    Select: {
      controlItemBgActive: 'rgba(115, 123, 128, 0.18)',
      controlOutline: undefined
    }
  }
}

export default theme
