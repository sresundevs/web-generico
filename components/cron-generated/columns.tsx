import GenerateColumns from '@/components/GenerateColumbs/GenerateColumns'
import { Cron } from '@/interfaces/Crons.interface'
import { ColumnsType } from 'antd/es/table'
import { CaretRightOutlined, PauseOutlined, DeleteOutlined } from '@ant-design/icons'

const columns = (): ColumnsType<Cron> => {
  return GenerateColumns([
    {
      title: 'Name',
      dataIndex: 'cronName',
      search: true
    },
    {
      title: 'Interval Time',
      dataIndex: 'intervalTime',
      search: true
    },
    {
      title: 'Template Run',
      dataIndex: 'templateRun',
      search: true
    },
    {
      title: 'Template Time',
      dataIndex: 'templateTime',
      search: true
    },
    {
      title: 'Template Name',
      dataIndex: 'templateName',
      search: true
    },
    {
      title: 'Template Code',
      dataIndex: 'templateCode',
      search: true
    }
  ])
}

export default columns
