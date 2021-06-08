import { setAppConfigPath } from '@manish3323/esw-ts'
import React from 'react'
//#set-app-config-path
// inside App.tsx

setAppConfigPath('randomFolder/randomFile.ts')

export const AppPath = () => <div>{/* children components */}</div>

//#set-app-config-path

/** 
//#folder
/AppRoot
  /src
    /config
      /AppConfig.ts
  /test
  /types
//#folder
*/
