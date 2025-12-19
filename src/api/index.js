import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:3000/api',
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 如果返回的状态码不是200，则判断为错误
    if (res.code !== 200) {
      // 根据不同的状态码进行处理
      switch (res.code) {
        case 401:
          // 未授权
          console.error('登录过期，请重新登录')
          break
        case 403:
          // 拒绝访问
          console.error('拒绝访问')
          break
        case 404:
          // 请求资源不存在
          console.error('请求资源不存在')
          break
        case 500:
          // 服务器内部错误
          console.error('服务器内部错误')
          break
        default:
          console.error(res.message || 'Error')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service