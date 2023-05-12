import { message } from 'antd'
import axios, { HttpStatusCode } from 'axios'
import {getInfo} from '../api/incex'
const service = axios.create({
    baseURL:'http://47.98.219.152:3000'
})

//请求拦截器
service.interceptors.request.use(config =>{
     if(sessionStorage.getItem('token')){
        config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
     }
     return config
})
//响应拦截器
service.interceptors.response.use(response =>{
     const data = response.data
     if(data.code===-1){
        message.error(data.msg||'请求错误')
        return Promise.reject(data.msg||'请求错误')
     }else if(HttpStatusCode == 401){
          sessionStorage.clear()
          getInfo()
     }
     return data
})
export default service