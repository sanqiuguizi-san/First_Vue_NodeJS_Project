const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{ type:String },
    //保存图片地址
    icon:{ type:String },
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Item',schema)