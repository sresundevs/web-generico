import GenerateColumns from '@/components/GenerateColumbs/GenerateColumns'
import { Customer } from '@/interfaces/Customers.interface'
import { ColumnsType } from 'antd/es/table'

const columns = (): ColumnsType<Customer> => {
  return GenerateColumns([
    {
      title: 'Name',
      dataIndex: 'name',
      search: true
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      search: true
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      search: true
    }
  ])
}

export default columns
