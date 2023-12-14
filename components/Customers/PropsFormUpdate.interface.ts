import { Customer } from '@/interfaces/Customers.interface'
import { FormInstance } from 'antd'

export interface Props {
  record?: Customer
  form: FormInstance
}
