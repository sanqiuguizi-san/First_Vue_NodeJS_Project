//函数接收一个参数：app对象（服务器对象）
module.exports = app =>{
    //引入MongoDB数据库对象
    //直接连接到数据库node-vue-moba（新建）
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        //参数：？查查看
        useNewUrlParser:true
    })
}
