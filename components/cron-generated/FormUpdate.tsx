import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, RadioChangeEvent  } from 'antd';
import { Props } from './PropsFormUpdate.interface';
import axios from 'axios';
import { Radio } from 'antd';


const FormUpdate: FC<Props> = ({ record, form }) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateLanguage, setSelectedTemplateLanguage] = useState<string>('');

  useEffect(() => {
    const fetchTemplates = async () => {
      const url = "https://graph.facebook.com/v19.0/228863580311073/message_templates";
      const access_token = "EAAQK5XmYumQBO55HfJzzMZBYQjhTVeHQrSllwfCJZBz9svRRUGzK8ZACGMA1K8KmRuZCld1CwwB7rfUuAaJR3LDlFlYY0jB4OSLuPYnwheQDfXzGbayeHZAPZBySOD84XrdALiiisuk466eKFvNGIXsjZCuZAnTcQrS7IjGHzIRHuo2FXmRLoihN7cgmUuzoLjaFZAhuq64T1KypLDWq8M2CKlZA0I6ToZD";
      
      const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await axios.get(url, { headers });
        const data = response.data.data; // Accede a la propiedad data dentro de la respuesta
        setTemplates(data);
      } catch (error) {
        console.error('Error al obtener los templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateChange = (value: string) => {
    setSelectedTemplateLanguage(value);
    const selectedTemplate = templates.find(template => template.name === value);
    if (selectedTemplate) {
      // Actualiza el valor del campo templateCode con el lenguaje seleccionado
      form.setFieldsValue({ templateCode: selectedTemplate.language });
    }
  };

  const { Option } = Select;

  const rules = (item: string) => [{ required: true, message: `Please input ${item}!` }];

  return (
    <Form<any> form={form} layout="vertical">
      <Form.Item<any> name="cronName" rules={rules('cron-name')} label="Nombre del Cron:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="intervalTime" rules={rules('intervalTime')} label="Intervalo de Tiempo:">
            <Radio.Group>
              <Radio value="minutes"> Minutes </Radio>
              <Radio value="hours"> Hours </Radio>
            </Radio.Group>
          </Form.Item>
      <Form.Item<any> name="interval" rules={rules('interval')} label="Intervalo:">
        <Input />
      </Form.Item>
      <Form.Item<any> name="templateTime" rules={rules('template-time')} label="Tiempo de ejecucion:">
        <Input />
      </Form.Item>
      <Form.Item name="templateRun" rules={rules('template-run')} label="Desea programar el evento antes o después de la fecha registrada:">
        <Select>
          <Option value="<=">Antes</Option>
          <Option value=">=">Después</Option>
        </Select>
      </Form.Item>
      <Form.Item<any> name="templateName" rules={rules('template-name')} label="Nombre de la plantilla:">
        <Select onChange={handleTemplateChange}>
          {templates.map((template, index) => (
            <Option key={index} value={template.name}>{template.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item<any> name="templateCode" rules={rules('template-code')} label="Codigo de lenguaje:">
        <Input disabled value={selectedTemplateLanguage} />
      </Form.Item>
    </Form>
  );
};

export default FormUpdate;