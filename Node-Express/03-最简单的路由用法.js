// 导入 express
const express = require('express')
// 创建 web 服务器，命名为 app
const app = express()

// 挂载路由
app.get('/', (req, res) => {
    res.send('hello world.')
})
app.post('/', (req, res) => {
    res.send('Post Request.')
})

// 启动 web 服务器
app.listen(800, () => {
    console.log('express server running at http://127.0.0.1:800')
})