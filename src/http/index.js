import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:3000/api/admin/v1/',
  baseURL: 'http://1.117.1.94:8889/api/admin/v1/',
  timeout: 5000,
  method: 'GET'
})

instance.interceptors.request.use(
  config => {
    console.log('请求成功')
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  },
  err => {
    console.log('请求失败', err)
  }
)

instance.interceptors.response.use(
  config => {
    console.log('响应成功')
    return config
  },
  err => {
    console.log('响应失败', err)
  }
)

export default instance
