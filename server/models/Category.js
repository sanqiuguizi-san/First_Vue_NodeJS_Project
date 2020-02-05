const mongoose = require('mongoose')

//此处为MongoDB的数据库知识，多去看看
//Category模型实例
//设置数据库字段name和parent(例如mysql中的列)
//ref要进行关联一个模型寻找上级分类（子分类找爹）（这里都是在一个表中，所以是'Category'）
const schema = new mongoose.Schema({
    name:{ type:String },
    parent:{ type:mongoose.SchemaTypes.ObjectId,ref:'Category' },
})
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})
//定义虚拟字段 
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Category',schema)