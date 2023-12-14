import { GenerateColumn } from '@/types/types'
import { ColumnType } from 'antd/es/table'
import GetColumnSearchProps from './GetColumnSearchProps'

const GenerateColumns = (columns: GenerateColumn[], actions?: (record: any) => JSX.Element) => {
  const transformedColumns = [
    ...columns.map(column => {
      var actualColumn: ColumnType<any> = { title: column.title, dataIndex: column.dataIndex }
      if (column.render) actualColumn.render = column.render
      if (column.sorter) actualColumn.sorter = (a, b) => a[column.dataIndex] || 0 - b[column.dataIndex] || 0

      if (column.search) actualColumn = { ...actualColumn, ...GetColumnSearchProps(column.dataIndex, column.title, column.render) }
      return actualColumn
    })
  ]
  return actions ? [...transformedColumns, { title: 'Actions', key: 'actions', render: actions }] : transformedColumns
}

export default GenerateColumns
