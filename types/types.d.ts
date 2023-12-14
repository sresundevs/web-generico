import { ReactNode } from 'react'
import moment from 'moment'

export type MenuItems = {
  path: string
  title: string
  icon: JSX.Element
}

export type FilterType = {
  range: moment.Moment[]
}

export type GenerateColumn = {
  title: string
  dataIndex: string
  sorter?: boolean
  render?: (text: any) => ReactNode
  search?: boolean
}
