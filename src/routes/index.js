import {
    Login,
    Article,
    DashBoard,
    Settings,
    NotFound

} from '../views'

// 不需要权限的路由路径
export const mainRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    }
]
// 需要权限的路由路径
export const adminRoutes = [
    
    {
        path: '/admin/dashboard',
        component: DashBoard,
        isNav: true,
        title: '仪表盘',
        icon: 'dashboard'

    },
    {
        path: '/admin/article',
        component: Article,
        isNav: true,
        title: '文章管理',
        icon: 'unordered-list'
    },
    {
        path: '/admin/settings',
        component: Settings,
        isNav: true,
        title: '系统设置',
        icon: 'radius-setting'
    }
]