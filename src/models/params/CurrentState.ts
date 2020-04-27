import { Parameter } from 'models/params/Parameter'

export interface CurrentState {
  prefix: string
  stateName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramSet?: Parameter<any>[]
}