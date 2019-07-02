import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { adminRoutes } from './routes'
import Frame from './components/Frame'
import './App.less'


export default class App extends Component {
  render() {
    return (
        <Frame>
          <Switch>
            {
              adminRoutes.map(route => {
                return <Route 
                        key={route.path}
                        path={route.path} 
                        component={route.component}
                      />
              })
            }
            <Redirect to="/admin/dashboard" from="/admin" exact />
            <Redirect to="/404" />
          </Switch>
        </Frame>
    )
  }
}
