import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { ColumnType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
import { ReactNode, useState } from 'react'
import Highlighter from 'react-highlight-words'

const GetColumnSearchProps = (dataIndex: string, title: string, customRender?: (text: any) => ReactNode): ColumnType<any> => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
    setSearchedColumn('')
  }

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value: any, record) =>
      customRender
        ? customRender(record[dataIndex])?.toString()?.toLowerCase()?.includes(value?.toLowerCase())
        : record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={customRender ? customRender(text)?.toString() : text?.toString()}
        />
      ) : customRender ? (
        customRender(text)
      ) : (
        text
      )
  }
}

export default GetColumnSearchProps
