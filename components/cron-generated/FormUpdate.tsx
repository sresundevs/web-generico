import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Select, Radio } from 'antd'
import { Props } from './PropsFormUpdate.interface'
import axios from 'axios'

const FormUpdate: FC<Props> = ({ record, form }) => {
  const [templates, setTemplates] = useState<any[]>([])
  const [selectedTemplateLanguage, setSelectedTemplateLanguage] = useState<string>('')
  const [headerVariable, setHeaderVariable] = useState<string>('')
  const [bodyVariables, setBodyVariables] = useState<string[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      const url = process.env.NEXT_PUBLIC_FACEBOOK_API_URL || ''
      const access_token = process.env.NEXT_PUBLIC_FACEBOOK_API_KEY || ''

      const headers = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }

      try {
        const response = await axios.get(url, { headers })
        const data = response.data.data // Accede a la propiedad data dentro de la respuesta
        setTemplates(data)
      } catch (error) {
        console.error('Error al obtener los templates:', error)
      }
    }

    fetchTemplates()
  }, [])

  const handleTemplateChange = (value: string) => {
    setSelectedTemplateLanguage(value)
    const selectedTemplate = templates.find(template => template.name === value)
    if (selectedTemplate) {
      form.setFieldsValue({ templateCode: selectedTemplate.language })

      let headerVar: string = ''

      let bodyVars: string[] = []

      selectedTemplate.components.forEach((component: any) => {
        if (component.type === 'HEADER' && component.example && component.example.header_text && component.example.header_text.length > 0) {
          headerVar = component.example.header_text[0]
        }

        if (component.type === 'BODY' && component.example && component.example.body_text && component.example.body_text.length > 0) {
          component.example.body_text[0].forEach((text: string) => {
            bodyVars.push(text)
          })
        }
      })

      setHeaderVariable(headerVar)
      setBodyVariables(bodyVars)
    }
  }

  const { Option } = Select

  const rules = (item: string) => [{ required: true, message: `Please input ${item}!` }]

  return (
    <Form<any> form={form} layout="vertical">
      <Form.Item<any> name="cronName" rules={rules('cron-name')} label="Nombre del Cron:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="intervalTime" rules={rules('intervalTime')} label="Intervalo de Tiempo:">
        <Radio.Group>
          <Radio value="Minutes"> Minutes </Radio>
          <Radio value="Hours"> Hours </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item<any> name="interval" rules={rules('interval')} label="Intervalo:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateTime" rules={rules('template-time')} label="Tiempo de ejecucion:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateRun" rules={rules('template-run')} label="Desea programar el evento antes o después de la fecha registrada:">
        <Select>
          <Option value="Antes">Antes</Option>
          <Option value="Despues">Después</Option>
        </Select>
      </Form.Item>
      <Form.Item<any> name="templateName" rules={rules('template-name')} label="Nombre de la plantilla:">
        <Select onChange={handleTemplateChange}>
          {templates.map((template, index) => (
            <Option key={index} value={template.name}>
              {template.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {headerVariable && (
        <Form.Item<any> label="Variable del header:">
          <Form.Item name="variableHeader" rules={rules(`${headerVariable}`)} label={headerVariable}>
            <Input placeholder={headerVariable} />
          </Form.Item>
        </Form.Item>
      )}
      {bodyVariables.length > 0 && (
        <Form.Item label={'Variables del body'}>
          {bodyVariables.map((variable, index) => (
            <Form.Item<any> key={index} name={['variablesBody', `${index}`]} rules={rules(`${variable}`)} label={`${variable}:`}>
              <Input placeholder={variable} />
            </Form.Item>
          ))}
        </Form.Item>
      )}

      <Form.Item<any> name="templateCode" rules={rules('template-code')} label="Codigo de lenguaje:">
        <Input disabled value={selectedTemplateLanguage} />
      </Form.Item>
    </Form>
  )
}

export default FormUpdate
