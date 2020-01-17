const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title:{ type:String },
    categories:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Category' },],
    body:{ type:String },
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Article',schema)