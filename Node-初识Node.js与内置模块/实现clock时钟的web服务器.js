// 导入http模块
const http = require('http')
// 导入fs模块
const fs = require('fs')
// 导入path模块
const path = require('path')

// 创建web服务器
const server = http.createServer()
// 监听web服务器的request事件
server.on('request', (req, res) => {
    // 获取客户端请求的url地址
    const url = req.url
    // 把请求的URL地址映射为具体文件的存放路径
    // const fpath = path.join(__dirname, url)
    // 预定义一个空白的文件存放路径
    let fpath = ''
    if(url === '/') {
        fpath = path.join(__dirname, './clock/index.html')
    } else {
        fpath = path.join(__dirname, '/clock', url)
    }

    // 根据映射过来的文件路径。来读取文件的内容
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        // 读取失败，向客户端响应固定的错误消息
        if(err) return res.end('404 Not Found.')
        // 读取成功，将读取成功的内容，响应给客户端
        res.end(dataStr)
    })
})
// 启动服务器
server.listen(800, () => {
    console.log('server running at http://127.0.0.1:800')
})