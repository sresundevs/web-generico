import FormUpdate from '@/components/cron-generated/FormUpdate'
import columns from '@/components/cron-generated/columns'
import MainLayout from '@/components/Layout/Layout'
import { Cron } from '@/interfaces/Crons.interface'
import { requests } from '@/utils/requests'
import { Button, Form, Modal, Space, Table, message } from 'antd'
import { useEffect, useState } from 'react'

const CronGenerated = () => {
  const [form] = Form.useForm()
  const [crons, setCrons] = useState<Cron[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // const [range, setRange] = useState<moment.Moment[]>([])
  const [cronSelected, setCronSelected] = useState<Cron>()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const data: Cron[] = await requests('/crons', 'GET', undefined, true)
      setCrons(data.map((cron: Cron) => ({ ...cron, key: cron.cron_id })))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async () => {
    let values = await form.validateFields()

    try {
      if (cronSelected) {
        const data = await requests(`/crons/${cronSelected.cron_id}`, 'PUT', values, true)
        if (data) {
          message.success(data.message)
          getData()
        } else {
          message.error(data.message)
        }
      } else {
        const data = await requests('/crons', 'POST', values, true)
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
      setCronSelected(undefined)
    }
    setOpen(false)
    setCronSelected(undefined)
  }

  const onCreateCron = () => {
    setOpen(true)
  }

  const onClickRow = async (record: Cron) => {
    setCronSelected(record)
    setOpen(true)
  }

  const onCancel = () => {
    setOpen(false)
    setCronSelected(undefined)
  }

  return (
    <>
      <MainLayout title="Campaigns">
        <>
          <div className="containerFilterAndButtons">
            <Space align="start" size={24}>
              <Button type="primary" onClick={onCreateCron}>
                Create Campaigns
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
            dataSource={crons}
            bordered
            onRow={record => {
              return { onClick: () => onClickRow(record) }
            }}
          />
        </>
      </MainLayout>
      <Modal
        open={open}
        title={`${cronSelected ? 'Update' : 'Create'} Campaigns`}
        onOk={onFinish}
        onCancel={onCancel}
        okText={cronSelected ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <FormUpdate form={form} record={cronSelected} />
      </Modal>
    </>
  )
}

export default CronGenerated
