import { LocationConfig } from '../../config'
import { ComponentType, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { Subscription } from '../../utils/Ws'
import { Connection, ConnectionType } from './models/Connection'
import { TimeUnit } from './models/Duration'
import { Location } from './models/Location'
import { Done } from './models/LocationResponses'
import { TrackingEvent } from './models/TrackingEvent'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Option } from '../../utils/Option'
import { WebSocketTransport } from '../../utils/WebSocketTransport'
import { LocationServiceImpl } from './Impl'

export interface LocationService {
  list(): Promise<Location[]>

  listByComponentType(componentType: ComponentType): Promise<Location[]>

  listByHostname(hostname: string): Promise<Location[]>

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>

  listByPrefix(prefix: Prefix): Promise<Location[]>

  find(connection: Connection): Promise<Option<Location>>

  unregister(connection: Connection): Promise<Done>

  resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>>

  track(connection: Connection): (callBack: (trackingEvent: TrackingEvent) => void) => Subscription
}

export const LocationService: () => LocationService = () => {
  const webSocketEndpoint = getWebSocketEndPoint({
    host: LocationConfig.hostName,
    port: LocationConfig.port
  })
  const postEndpoint = getPostEndPoint({ host: LocationConfig.hostName, port: LocationConfig.port })
  return new LocationServiceImpl(new HttpTransport(postEndpoint), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}
