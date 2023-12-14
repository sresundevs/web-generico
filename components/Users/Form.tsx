import { User } from '@/interfaces/Users.interface'
import { Form, Input, Switch } from 'antd'
import { FC, useEffect } from 'react'
import { Props } from './PropsForm.interface'

const FormCreateAndUpdate: FC<Props> = ({ record, form }) => {
  useEffect(() => {
    form.resetFields()
    if (record) {
      record.password = ''
      form.setFieldsValue(record)
    }
  }, [record, form])

  const rules = (item: string) => [{ required: true, message: `Please input ${item}!` }]
  return (
    <Form<User> form={form} layout="vertical">
      <Form.Item<User> name="name" rules={rules('name')} label="Name">
        <Input />
      </Form.Item>
      <Form.Item<User> name="last_name" rules={rules('last_name')} label="Last Name">
        <Input />
      </Form.Item>
      <Form.Item<User> name="email" rules={rules('email')} label="Email">
        <Input />
      </Form.Item>
      <Form.Item<User> name="password" label="Password">
        <Input.Password />
      </Form.Item>
    </Form>
  )
}

export default FormCreateAndUpdate
