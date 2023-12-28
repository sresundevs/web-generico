import FormUpdate from '@/components/Customers/FormUpdate'
import columns from '@/components/Customers/columns'
import MainLayout from '@/components/Layout/Layout'
import { Customer } from '@/interfaces/Customers.interface'
// import { FilterType } from '@/types/types'
import { requests } from '@/utils/requests'
import { Button, Form, Modal, Space, Table, message } from 'antd'
// import moment from 'moment-timezone'
import { useEffect, useState } from 'react'

const Customers = () => {
  const [form] = Form.useForm()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // const [range, setRange] = useState<moment.Moment[]>([])
  const [customerSelected, setCustomerSelected] = useState<Customer>()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const data = await requests('/cinemas', 'GET', undefined, true)
      setCustomers(data.map((customer: Customer) => ({ ...customer, key: customer.customer_id })))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async () => {
    const values = await form.validateFields()
    try {
      if (customerSelected) {
        const data = await requests(`/cinemas/${customerSelected.customer_id}`, 'PUT', values, true)
        if (data) {
          message.success(data.message)
          getData()
        } else {
          message.error(data.message)
        }
      } else {
        const data = await requests('/cinemas', 'POST', values, true)
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
      setCustomerSelected(undefined)
    }
  }

  const onCreateCustomer = () => {
    setOpen(true)
  }

  const onClickRow = async (record: Customer) => {
    setCustomerSelected(record)
    setOpen(true)
  }

  const onCancel = () => {
    setOpen(false)
    setCustomerSelected(undefined)
  }

  return (
    <>
      <MainLayout title="Customers">
        <>
          <div className="containerFilterAndButtons">
            <Space align="start" size={24}>
              <Button type="primary" onClick={onCreateCustomer}>
                Create Customer
              </Button>
              <Button type="primary">Export Excel</Button>
              {/* <Button type="primary" onClick={getData}>
              Data
            </Button> */}
              {/* <Filter onFinish={values => setRange(values.range || [])} /> */}
            </Space>
          </div>

          <Table
            loading={loading}
            columns={columns()}
            dataSource={customers}
            bordered
            onRow={record => {
              return { onClick: () => onClickRow(record) }
            }}
          />
        </>
      </MainLayout>
      <Modal
        open={open}
        title={`${customerSelected ? 'Update' : 'Create'} customer`}
        onOk={onFinish}
        onCancel={onCancel}
        okText={customerSelected ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <FormUpdate form={form} record={customerSelected} />
      </Modal>
    </>
  )
}

export default Customers
