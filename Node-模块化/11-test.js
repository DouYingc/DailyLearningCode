

// 导入自定义的格式化时间的模块

const TIME = require('./10-dataFormat.js')

// 调用方法，进行时间的格式化

const dt = new Date()
// console.log(dt)
const newDT = TIME.dataFormat(dt)
console.log(newDT)