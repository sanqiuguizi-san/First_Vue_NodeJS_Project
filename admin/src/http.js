import axios from 'axios'

//编写自定义axios函数，封装axios为http，用于调用基本的get和post代码，减少接口
const http = axios.create({
    //与后端服务器的域名或ip和端口号配置的接口部分对上admin/api
    //是routes/admin/index中的接口设定
    baseURL:'http://localhost:3000/admin/api'
})

export default http

