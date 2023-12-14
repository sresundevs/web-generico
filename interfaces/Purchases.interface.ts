import { Customer } from './Customers.interface'

export interface Purchase extends Customer {
  IdCompra: string
  FechaCompra: Date
  CompraVerificable: string
  MetodoPago: string
  PagoAprobado: string
  Evidencia: string
}
