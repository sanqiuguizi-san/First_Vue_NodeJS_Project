const mongoose = require('mongoose')

//此处为MongoDB的数据库知识，多去看看
//Category模型实例
const schema = new mongoose.Schema({
    name:{ type:String }
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Category',schema)