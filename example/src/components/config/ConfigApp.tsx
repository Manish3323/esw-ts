import { AuthContext, CheckLogin, RealmRole } from '@manish3323/esw-ts'
import React from 'react'
import LoginError from '../LoginError'
import RoleError from '../RoleError'
import ConfigServiceProvider from './context/ConfigServiceProvider'
import { CreateConfig } from './CreateConfig'
import GetConfig from './GetConfig'
import ListConfig from './ListConfig'

//#config-app
const ConfigApp = () => {
  return (
    <div className="row card col s12 m7">
      <ConfigServiceProvider authContext={AuthContext}>
        <ListConfig />
        <GetConfig />
        {
          <CheckLogin error={<LoginError />}>
            {/*// #create-config-component*/}
            <RealmRole
              realmRole="config-admin"
              error={
                <RoleError message={"User do not have role 'config-admin' to create config"} />
              }
            >
              <CreateConfig />
            </RealmRole>
            {/*// #create-config-component*/}
          </CheckLogin>
        }
      </ConfigServiceProvider>
    </div>
  )
}
//#config-app

export default ConfigApp
