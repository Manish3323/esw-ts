import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { Struct } from '../models/params/Struct'
import type { Decoder } from './Decoder'
import { ParameterD } from './ParameterDecoder'

export const StructD: Decoder<Struct> = D.lazy('Struct', () =>
  pipe(
    D.type({
      paramSet: D.array(ParameterD)
    }),
    D.parse((s) => D.success(new Struct(s.paramSet)))
  )
)
