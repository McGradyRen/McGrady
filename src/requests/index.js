import axios from 'axios'

// 判断时候为开发环境
const isDev = process.env.NOOE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev?  'http://rap2api.taobao.org/app/mock/223498' : '真实的url'
})

// 拦截
ajax.interceptors.request.use(config => {
    config.data = {
        authToken: 'asdasdasdasdasdaasd'
    }

    return config
})

ajax.interceptors.response.use(resp => {
    return resp
})

// 请求接口

// 请求文章列表
export const getArticleList = () => {
    return ajax.post('/api/v1/getArticleList')
}