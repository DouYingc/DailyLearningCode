



const path = require('path')

// 文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext) // .html