import { AuthContextProvider, CheckLogin, RealmRole } from '@manish3323/esw-ts'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// #import-components-example
// #import-components-example
import { AppConfig } from '../config/AppConfig'
import ConfigApp from './config/ConfigApp'
import LoginError from './LoginError'
import NavComponent from './NavComponent'
import Read from './Read'
import RoleError from './RoleError'
import Write from './Write'

//#example-app
const ExampleApp = () => {
  return (
    <div className="row card col s12 m7">
      {
        // #AuthContextProvider-component-usage
        <AuthContextProvider config={AppConfig}>
          <BrowserRouter>
            <div>
              <NavComponent />
              <Route
                exact
                path="/secured"
                render={() => (
                  // #checkLogin-component-usage
                  <CheckLogin error={<LoginError />}>
                    <Write />
                  </CheckLogin>
                  // #checkLogin-component-usage
                )}
              />
              <Route exact path="/config" render={() => <ConfigApp />} />
              <Route
                exact
                path="/example_admin"
                render={() => (
                  <CheckLogin error={<LoginError />}>
                    {/*// #realmRole-component-usage */}
                    <RealmRole
                      realmRole="example-admin-role"
                      error={<RoleError message={'User do not have role : example-admin-role'} />}
                    >
                      <div>Example admin role specific functionality</div>
                    </RealmRole>
                    {/*// #realmRole-component-usage */}
                  </CheckLogin>
                )}
              />
              <Route
                exact
                path="/example_user"
                render={() => (
                  <CheckLogin error={<LoginError />}>
                    <RealmRole
                      realmRole="person-role"
                      error={<RoleError message={'User do not have role : person-role'} />}
                    >
                      <div>Person role specific functionality</div>
                    </RealmRole>
                  </CheckLogin>
                )}
              />
              <Route exact path="/public" component={Read} />
            </div>
          </BrowserRouter>
        </AuthContextProvider>
        // #AuthContextProvider-component-usage
      }
    </div>
  )
}
//#example-app

export default ExampleApp
