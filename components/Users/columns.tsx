import GenerateColumns from '@/components/GeneretaColumbs/GenerateColumns'
import { User } from '@/interfaces/Users.interface'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'

const columns = (): ColumnsType<User> => {
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
      title: 'Email',
      dataIndex: 'email',
      search: true
    }
  ])
}

export default columns
