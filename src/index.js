import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes'
import App from './App'
import zhCN from 'antd/es/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

render(
    <LocaleProvider locale={zhCN}>
   <Router>
       <Switch>
        <Route 
            path="/admin"
            render={
                () => {
                    // 会做权限判断，有登录过的用户，进入管理主页页面
                    // TODO......
                    return <App/>
                }
            }
        />
        {
            mainRoutes.map(route => {
                return <Route key={route.path}  {...route}/>
            })
        }
        <Redirect  to="/admin" from="/" exact />
        <Redirect to="/404" />
       </Switch>
   </Router>
   </LocaleProvider>,
    document.querySelector('#root')
)