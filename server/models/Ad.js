const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{ type:String },
    items:[{
        image:{ type:String },
        url:{ type:String },
    }]
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Ad',schema)