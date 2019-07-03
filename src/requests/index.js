import axios from 'axios'
import { message } from 'antd'

// 判断时候为开发环境
const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev ?  'http://rap2api.taobao.org/app/mock/223498' : '真实的url'
})

// 拦截
ajax.interceptors.request.use(config => {
    // 将用于身份认证的 token 数据在每次请求中都传递到服务器端
    config.data = {
        authToken: 'asdasdasdasdasdaasd'
    }

    return config
})

ajax.interceptors.response.use(resp => {
    if (resp.status === 200 && resp.data.code === 200){
        return resp.data.data
    } else {
        // 错误处理
        message.error('错误，请重试');
    }
})

// 请求接口

// 请求文章列表
export const getArticleList = () => {
    return ajax.post('/api/v1/getArticleList')
}

// 根据id删除文章信息
export const deleteArticle = (id) => {
    return ajax.post(`/api/v1/article/delete/${id}`)
}