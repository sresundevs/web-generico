import {Cron} from '@/interfaces/Crons.interface'
import { FormInstance } from 'antd'

export interface Props {
  record?: Cron
  form: FormInstance
}
