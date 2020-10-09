import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { ConfigFileInfo, ConfigFileRevision, ConfigId, ConfigMetadata } from '..'
import { ciLiteral, Decoder } from '../utils/Decoder'

export const FileTypeD = ciLiteral('Normal', 'Annex')

export const ConfigIdD: Decoder<ConfigId> = pipe(
  D.string,
  D.parse((name) => D.success(new ConfigId(name)))
)

export const ConfigFileInfoD: Decoder<ConfigFileInfo> = D.type({
  path: D.string,
  id: ConfigIdD,
  author: D.string,
  comment: D.string
})

export const ConfigFileRevisionD: Decoder<ConfigFileRevision> = D.type({
  id: ConfigIdD,
  author: D.string,
  comment: D.string,
  time: D.string
})

export const ConfigMetadataD: Decoder<ConfigMetadata> = D.type({
  repoPath: D.string,
  annexPath: D.string,
  annexMinFileSize: D.string,
  maxConfigFileSize: D.string
})