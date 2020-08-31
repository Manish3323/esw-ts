import { Connection } from '../../..'
import { Prefix } from '../../../models'

export class SpawnSequenceComponent {
  readonly _type: 'SpawnSequenceComponent' = 'SpawnSequenceComponent'
  constructor(
    readonly agentPrefix: Prefix,
    readonly componentName: string,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class SpawnSequenceManager {
  readonly _type: 'SpawnSequenceManager' = 'SpawnSequenceManager'
  constructor(
    readonly agentPrefix: Prefix,
    readonly obsModeConfigPath: string,
    readonly isConfigLocal: boolean,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class KillComponent {
  readonly _type: 'KillComponent' = 'KillComponent'
  constructor(readonly connection: Connection) {}
}

export type AgentServiceRequest = SpawnSequenceComponent | SpawnSequenceManager | KillComponent