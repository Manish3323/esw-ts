import { ComponentId } from 'models/ComponentId'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse
} from 'clients/command/models/CommandResponse'
import { Subscription, Ws } from 'utils/Ws'
import { CurrentState } from 'models/params/CurrentState'
import { post } from 'utils/Http'
import { ComponentCommandFactory } from 'clients/command/ComponentCommandFactory'
import { ControlCommand } from 'models/params/Command'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'

export interface CommandService {
  validate(command: ControlCommand): Promise<ValidateResponse>
  submit(command: ControlCommand): Promise<SubmitResponse>
  oneway(command: ControlCommand): Promise<OneWayResponse>
  query(runId: string): Promise<SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription
}

export const CommandService = (
  host: string,
  port: number,
  componentId: ComponentId
): CommandService => {
  const commandFactory = new ComponentCommandFactory(componentId)
  const httpPost = <T>(gatewayCommand: GatewayComponentCommand) =>
    post<GatewayComponentCommand, T>(host, port, gatewayCommand)

  const validate = async (command: ControlCommand) =>
    httpPost<ValidateResponse>(commandFactory.validate(command))

  const submit = async (command: ControlCommand) =>
    httpPost<SubmitResponse>(commandFactory.submit(command))

  const oneway = async (command: ControlCommand) =>
    httpPost<OneWayResponse>(commandFactory.oneway(command))

  const query = async (runId: string) => httpPost<SubmitResponse>(commandFactory.query(runId))

  const subscribeCurrentState = (
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription =>
    new Ws(host, port).sendThenSubscribe(
      commandFactory.subscribeCurrentState(stateNames),
      onStateChange
    )

  const queryFinal = async (runId: string, timeoutInSeconds: number) =>
    new Promise<SubmitResponse>((resolve) => {
      new Ws(host, port).sendThenSubscribe(
        commandFactory.queryFinal(runId, timeoutInSeconds),
        (submitResponse: SubmitResponse) => {
          resolve(submitResponse)
        }
      )
    })

  return { validate, submit, oneway, query, queryFinal, subscribeCurrentState }
}
