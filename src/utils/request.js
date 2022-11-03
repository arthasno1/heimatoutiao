import theAxios from 'axios'
import Notify from '@/ui/Notify.js'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { getNewTokenAPI } from '@/api/index'
import router from '@/router/index'
const axios = theAxios.create({ baseURL: 'http://toutiao.itheima.net/', timeout: 20000 })
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log('触发config', config)
    // 在发送请求之前做些什么
    if (getStorage('geek-itheima')?.length > 0 && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${getStorage('geek-itheima')}`
      console.log('config', config)
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error) {
    // 对响应错误做点什么
    // 用户过期返回登录页
    console.log('显示error11111111', error)
    console.dir(error)
    if (error.response.status === 401) {
      console.log('触发refresh', error)
      Notify({ type: 'warning', message: '您的身份已过期', duration: 1000 })
      removeStorage('geek-itheima')
      const res = await getNewTokenAPI()
      console.log('res', res)
      setStorage('geek-itheima', res.data.data.token)
      error.config.headers.Authorization = `Bearer ${res.data.data.token}`
      return axios(error.config)
    } else if (
      error.response.status === 500 &&
      error.config.method === 'put' &&
      error.config.url === '/v1_0/authorizations'
    ) {
      Notify({ type: 'warning', message: '您的身份已过期', duration: 1000 })
      localStorage.clear()
      router.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
