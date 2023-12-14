import { Modal } from 'antd'
import { FC } from 'react'
import { Props } from './Props.interface'

const ModalEdit: FC<Props> = ({ open, onOk, onCancel, children }) => {
  return (
    <Modal title="Title" open={open} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  )
}

export default ModalEdit
