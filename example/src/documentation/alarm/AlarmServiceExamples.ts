import { AlarmKey, AlarmService, Done, Prefix } from '@manish3323/esw-ts'

// #alarm-service-creation
const alarmService = await AlarmService()
// #alarm-service-creation
const d = async () => {
  //#setseverity
  const alarmKey = new AlarmKey(new Prefix('ESW', 'assemblyComponent'), 'temperature')
  const response: Done = await alarmService.setSeverity(alarmKey, 'Critical')
  //#setseverity
}
