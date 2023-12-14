// import Filter from '@/components/Filters'
import MainLayout from '@/components/Layout/Layout'
import FormCreateAndUpdate from '@/components/Users/Form'
import columns from '@/components/Users/columns'
import { User } from '@/interfaces/Users.interface'
// import { FilterType } from '@/types/types'
import { requests } from '@/utils/requests'
import { Button, Form, Space, Table, message, Modal } from 'antd'
import { useEffect, useState } from 'react'

const Users = () => {
  const [form] = Form.useForm()

  // const [range, setRange] = useState<moment.Moment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [userSelected, setUserSelected] = useState<User>()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const data = await requests('/users', 'GET', undefined, true)
      setUsers(data.map((user: User) => ({ ...user, key: user.user_id })))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // const onFilter = (values: FilterType) => {
  //   values.range = values.range?.map((date, index) => (index === 0 ? date.startOf('day') : date.endOf('day')))
  //   setRange(values.range || [])
  // }

  const onClickRow = (record: User) => {
    setUserSelected(record)
    setOpen(true)
  }

  const onCreateUser = () => {
    setOpen(true)
  }

  const onFinish = async () => {
    const values = await form.validateFields()
    try {
      if (userSelected) {
        if (values.password === '') {
          delete values.password
        }
        const data = await requests(`/users/${userSelected.user_id}`, 'PUT', values, true)

        if (data) {
          message.success(data.message)
          getData()
        } else {
          message.error(data.message)
        }
      } else {
        const data = await requests('/users', 'POST', values, true)
        console.log(data)
        if (data) {
          message.success(data.message)
          getData()
        } else {
          message.error(data.message)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setOpen(false)
      setUserSelected(undefined)
    }
  }

  const onCancel = () => {
    console.log('onCancel')
    setOpen(false)
    setUserSelected(undefined)
  }

  return (
    <>
      <MainLayout title="Users">
        <>
          <div className="containerFilterAndButtons">
            <Space align="start" size={24}>
              <Button type="primary" onClick={onCreateUser}>
                Create User
              </Button>
              {/* <Button type="primary" onClick={getData}>
                Data
              </Button> */}
              <Button type="primary">Export Excel</Button>
            </Space>

            {/* <Filter onFinish={onFilter} /> */}
          </div>
          <Table
            loading={loading}
            columns={columns()}
            dataSource={users}
            bordered
            onRow={record => {
              return { onClick: () => onClickRow(record) }
            }}
          />
        </>
      </MainLayout>
      <Modal
        open={open}
        title={`${userSelected ? 'Update' : 'Create'} user`}
        onOk={onFinish}
        onCancel={onCancel}
        okText={userSelected ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <FormCreateAndUpdate form={form} record={userSelected} />
      </Modal>
    </>
  )
}

export default Users
