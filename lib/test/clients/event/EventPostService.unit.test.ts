import { EventKey, EventName, ObserveEvent } from '../../../src/clients/event'
import { Done } from '../../../src/clients/location'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { EventServiceImpl } from '../../../src/clients/event/EventService'
import { GatewayGetEvent, GatewayPublishEvent } from '../../../src/clients/gateway/models/Gateway'
import { Prefix } from '../../../src/models'

const requestRes: jest.Mock = jest.fn()

const client = new EventServiceImpl(mockHttpTransport(requestRes), mockWsTransport())
describe('Event Service', () => {
  test('should publish event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = new ObserveEvent(
      'event1',
      prefix,
      eventName,
      new Date(2020, 1, 1).toISOString(),
      []
    )
    await client.publish(observeEvent)

    expect(requestRes).toBeCalledWith(new GatewayPublishEvent(observeEvent), Done)
  })

  test('should get event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

    await client.get(eventKeys)

    expect(requestRes).toBeCalledWith(new GatewayGetEvent([...eventKeys]), expect.anything())
  })
})

afterEach(() => jest.clearAllMocks())
