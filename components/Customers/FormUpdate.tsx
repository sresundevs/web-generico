import { Customer } from '@/interfaces/Customers.interface'
import { Form, Input } from 'antd'
import { FC, useEffect } from 'react'
import { Props } from './PropsFormUpdate.interface'

const FormUpdate: FC<Props> = ({ record, form }) => {
  useEffect(() => {
    form.resetFields()
    if (record) {
      form.setFieldsValue(record)
    }
  }, [record, form])

  const rules = (item: string) => [{ required: true, message: `Please input ${item}!` }]
  return (
    <Form<Customer> form={form} layout="vertical">
      <Form.Item<Customer> name="name" rules={rules('name')} label="Name">
        <Input />
      </Form.Item>
      <Form.Item<Customer> name="last_name" rules={rules('last_name')} label="Last name">
        <Input />
      </Form.Item>
      <Form.Item<Customer> name="phone" rules={rules('phone')} label="Phone">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormUpdate
