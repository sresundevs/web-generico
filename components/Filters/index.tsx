import { FilterType } from '@/types/types'
import { Button, DatePicker, Form } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'
import { FC } from 'react'
import { Props } from './Props.interface'

const Filter: FC<Props> = ({ onFinish }) => {
  const { RangePicker } = DatePicker

  const disabledDate: RangePickerProps['disabledDate'] = current => current > moment().endOf('day')

  return (
    <Form<FilterType> name="range" onFinish={onFinish} className="containerFilter">
      <Form.Item<FilterType> name="range">
        <RangePicker format={'DD/MM/YYYY'} disabledDate={disabledDate} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="searchButton" htmlType="submit" title="Search">
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Filter
