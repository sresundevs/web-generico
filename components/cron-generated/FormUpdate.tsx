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
    <Form<any> form={form} layout="vertical">
      <Form.Item<any> name="cronName" rules={rules('cron-name')} label="Nombre del Cron:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="interval" rules={rules('interval')} label="Intervalo de Tiempo:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateTime" rules={rules('template-time')} label="Tiempo de ejecucion:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateRun" rules={rules('template-run')} label="Antes o despues de la fecha registrada:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateName" rules={rules('template-name')} label="Nombre de la plantilla:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateCode" rules={rules('template-code')} label="Codigo de lenguaje:">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormUpdate
