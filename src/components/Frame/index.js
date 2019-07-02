import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import logo from './logo2.png'
import { withRouter } from 'react-router-dom'
import './frame.less'
import { adminRoutes} from '../../routes'
const { Header, Content, Sider } = Layout
const navs = adminRoutes.filter(route => route.isNav === true)

class Frame extends Component {

    clickHandler = ({key}) => {
       this.props.history.push(key) 
    }
    render() {
        return (
            <Layout>
                <Header className="admin-header">
                <div className="admin-logo" >
                    <img src={logo} alt=""/>
                </div>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={[navs[0].path]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick= {this.clickHandler}
                    >
                    {
                        navs.map(nav => {
                            return (
                                <Menu.Item
                                    key={nav.path}
                                >
                                <Icon type={nav.icon} />
                                <span>{nav.title}</span>
                                </Menu.Item>
                            )
                        })
                    }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px' }}>
                    <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {this.props.children}
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        )
    }
}
//设计模式中称作是装饰者设计模式
// 高阶组件
// 高阶组件就是一个函数，传递一个组件参数，返回一个新的组件

export default withRouter(Frame) 