import useAuth from '@/providers/AuthContext'
import { requests } from '@/utils/requests'
import { RightOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space, message } from 'antd'
import Head from 'next/head'
import Image from 'next/image'

type FieldType = {
  email: string
  password: string
}

const SignIn = () => {
  const { login } = useAuth()

  const onFinish = async (values: FieldType) => {
    try {
      const { token } = await requests('/users/login', 'POST', values)
       
      if (!token) {
        message.error('Invalid credentials')
        return
      }
      login(token)
    } catch (err) {
      console.error(err)
    }
  }
  const rules = (item: string) => [{ required: true, message: `Please input ${item}!` }]
  return (
    <>
      <Head>
        <title>{'Login'}</title>
      </Head>
      <main className="mainContainerLogin">
        <Space direction="vertical" align="center">
          <Image src="/LogoBlack.png" alt="Sundevs Logo" width={200} height={60} object-fit="contain" />
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item<FieldType> label="Email" name={'email'} rules={rules('email')}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="Password" name={'password'} rules={rules('password')}>
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </main>
    </>
  )
}

export default SignIn