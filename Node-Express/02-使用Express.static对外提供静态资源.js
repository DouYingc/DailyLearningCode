




// 导入 express 
const express = require('express')
// 调用 express 函数
const app = express()

// 调用 express.static() 方法，快速的对外提供静态资源
app.use('/files', express.static('./files'))
app.use(express.static('./clock'))



// 调用 app.listen 方法启动服务器
app.listen(800, () => {
    console.log('express server running at http://127.0.0.1:800')
})