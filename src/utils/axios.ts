import axios from 'axios'
import type { AxiosInstance,InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElNotification } from 'element-plus'

const service:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //替换成环境变量
  timeout: 5000 //请求超时时间
})

//请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   
  return config
}, (error:AxiosError) => {
   ElNotification({
    title: '错误',
    message: '请求错误' + error.message,
    type: 'error',
   })
   return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  if(response.data.code !== 200) {
    ElNotification({
      title: '错误',
      message: '响应错误' + response.data.msg,
      type: 'error',
    })
  }
  return response.data
  } , (error: AxiosError) => {
    ElNotification({
      title: '错误',
      message: '响应错误' + error.message,
      type: 'error',
  })
})

export default service