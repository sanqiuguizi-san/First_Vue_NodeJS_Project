import axios from 'axios'
import Vue from 'vue'

//编写自定义axios函数，封装axios为http，用于调用基本的get和post代码，减少接口
const http = axios.create({
    //与后端服务器的域名或ip和端口号配置的接口部分对上admin/api
    //是routes/admin/index中的接口设定
    baseURL:'http://localhost:3000/admin/api'
})

//请求头拦截器，向后端传数据前先加点东西（token)
http.interceptors.request.use(function(config){
    //定义req中的Authorization保存授权的字段，'Bearer '用以表示类型token,注意空格
    config.headers.Authorization = 'Bearer ' + localStorage.token
    return config;
},function(error){
    return Promise.reject(error);
})

//P25:全局接口错误的响应拦截器，如果res中有400以上的状态码报错则执行err
http.interceptors.response.use(res=>{
    return res;
},err=>{
    //当有返回错误信息时才弹出错误信息
    if(err.response.data.message){
        //返回的err对象中response返回对象中包含有状态码和后端返回的内容。可以直接调用
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        return Promise.reject(err);
    }
})

export default http

