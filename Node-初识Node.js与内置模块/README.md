## 初识Node.js

[Node.js中文网](https://nodejs.org/zh-cn/)

>Node.js®is a JavaScript runtime builton Chrome's V8 JavaScript engine
>
>Node.js 是一个基于ChromeV8 引擎的JavaScript 运行环境

Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和API。然而，基于 Node.js 提供的这些基础能，很多强大的工具和框架如雨后春笋，层出不穷，所以学会了 Node.js ，可以让前端程序员胜任更多的工作和岗位：

- 基于 Express 框架（http://www.expressjs.com.cn/），可以快速构建 Web 应用
- 基于 Electron 框架（https://electronjs.org/），可以构建跨平台的桌面应用
- 基于 restify 框架（http://restify.com/），可以快速构建 API 接口项目
- 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…

### 终端中的快捷键

①使用 ↑键，可以快速定位到上一次执行的命令

②使用 tab键，能够快速补全路径

③使用 esc键，能够快速清空当前已输入的命令

④输入 cls命令，可以清空终端

## fs文件系统模块

fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求

例如：

- fs.readFile()方法，用来读取指定文件中的内容
- fs.writeFile()方法，用来向指定的文件中写入内容

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```javascript
const fs = require('fs')
```

### fs.readFile() 读取文件

语法：

```javascript
fs.readFile(path[, options], callback)
```

>path：必选参数，字符串，表示文件的路径。
>
>options：可选参数，表示以什么编码格式来读取文件。
>
>callback：必选参数，文件读取完成后，通过回调函数拿到读取的结果。

### fs.writeFile()写入文件

语法：

```javascript
fs.writeFile(file, data[, options], callback)
```

>file：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
>
>data：必选参数，表示要写入的内容
>
>options：可选参数，表示以什么格式写入文件内容，默认值是 utf8
>
>callback：必选参数，文件写入完成后的回调函数

### 整理成绩案例

原数据：

```
小红=99 小白=100 小黄=70 小黑=66 小绿=88
```

目标处理结果：

```
小红：99
小白：100
小黄：70
小黑：66
小绿：88
```

```javascript
// 导入fs模块
const fs = require('fs')

// 调用fs.readFile()方法读取文件的内容
fs.readFile('./成绩.txt', 'utf8', function(err, dataStr) {
    // 判断是否读取成功
    if(err) {
        return console.log('读取文件失败!' + err.message)
    }
    // console.log('读取文件成功! ' + dataStr)

    // 把成绩的数据，按照空格进行分割
    const arrOld = dataStr.split(' ')
    // 循环分割后的数组，对每一项数据，进行字符串的替换操作
    const arrNew = []
    arrOld.forEach(item => {
        arrNew.push(item.replace('=', '：'))
    })
    // 把新数组中的每一项，进行合并，得到一个新的字符串
    const newStr = arrNew.join('\r\n')

    // 调用fs.writeFile()方法，把处理好的数据，写入到新文件中
    fs.writeFile('./files/成绩-ok.txt', newStr, function (err) {
        if(err) {
            return console.log('写入文件失败!' + err.message)
        }
        console.log('写入成绩成功')
    })
})
```

### 路径动态拼接的问题__dirname

- 在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径时，很容易出现路径动态拼接错误的问题


- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径，不要提供 ./ 或 ../ 开头的相对路径，从而防止路径动态拼接的问题

```javascript
fs.readFile(__dirname + '/files/1.txt', 'utf8', function (err, dataStr) {
    if(err) {
        return console.log('读取文件失败！' + err.message)
    }
    console.log('读取文件成功' + dataStr)
})
```

## path 路径模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求

例如：

- path.join()方法，用来将多个路径片段拼接成一个完整的路径字符串
- path.basename()方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：

```javascript
const path = require('path')
```

### path.join() 路径拼接

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串

语法：

```javascript
path.join([...paths])
```

>...paths`<string>` 路径片段的序列
>
>返回值:`<string>`

示例：

```javascript
const path = require('path')
const fs = require('fs')

// 注意： ../会抵消前面的路径
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
console.log(pathStr)  // \a\d\e

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
    if(err) {
        return console.log(err.message)
    }
    console.log(dataStr)
})
```

>注意：
>
>今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。不要直接使用 + 进行字符串的拼接

### path.basename() 获取路径中的文件名

使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名

语法：

```javascript
path.basename(path[, ext])
```

>path：`<string>` 必选参数，表示文件路径
>
>ext：`<string>` 可选参数，表示文件扩展名
>
>返回：`<string>` 表示路径中的最后一部分

示例：

```javascript
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

 const fullName = path.basename(fpath)
 console.log(fullName) // index.html

 const nameWithoutExt = path.basename(fpath, '.html')
 console.log(nameWithoutExt)  // index
```

### path.extname() 获取路径中的文件扩展名

使用 path.extname() 方法，可以获取路径中的扩展名部分

语法：

```javascript
path.extname(path)
```

>path：`<string>`必选参数，表示一个路径的字符串
>
>返回：`<string>` 返回得到的扩展名字符串

示例：

```javascript
const path = require('path')

// 文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext) // .html
```

## http 模块

http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供的 http.createServer() 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务

如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```javascript
const http = require('http')
```

>服务器和普通电脑的区别在于，服务器上安装了 web 服务器软件，例如：IIS、Apache 等。通过安装这些服务器软件，就能把一台普通的电脑变成一台 web 服务器
>
>在 Node.js 中，我们不需要使用 IIS、Apache 等这些第三方 web 服务器软件。因为我们可以基于 Node.js 提供的 http 模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供 web 服务

### 创建基本的web服务器

①导入 http 模块

②创建 web 服务器实例

③为服务器实例绑定 request 事件，监听客户端的请求

④启动服务器

```javascript
// 导入http模块
const http = require('http')

// 创建web服务器实例
const server = http.createServer()

// 为服务器绑定request事件，监听客户端的请求
server.on('request', function (req, res) {
    console.log('Someone visit our web server.')
})

// 启动服务器
server.listen(8080, function () {
    console.log('server running at http://127.0.0.1:8080')
})
```

### req请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。
如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式：

```javascript
server.on('request', req => {
    // req.url是客户端请求的url地址
    const url = req.url
    // req.method是客户端请求的method类型
    const method = req.method
    const str = `Your request url is ${url}, and request method is ${method}`
    console.log(str)
})
```

### res响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下的方式：

```javascript
server.on('request', (req, res) => {
    // req.url是客户端请求的url地址
    const url = req.url
    // req.method是客户端请求的method类型
    const method = req.method
    const str = `Your request url is ${url}, and request method is ${method}`
    console.log(str)
    // 调用res.end()方法，向客户端响应一些内容
    res.end(str)
})
```

### 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```javascript
server.on('request', (req, res) => {
    // 定义一个字符串，包含中文的内容
    const str = `您请求的URL地址是${req.url}，请求的method类型为${req.method}`
    // 调用res.setHeader()方法，设置Content-Type响应头，解决中文乱码问题
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // res.end()将内容响应给客户端
    res.end(str)
})
```

### 根据不同的 url 响应不同的 html 内容

步骤：

①获取请求的 url 地址

②设置默认的响应内容为 404 Not found

③判断用户请求的是否为 / 或 /index.html首页

④判断用户请求的是否为 /about.html 关于页面

⑤设置 Content-Type 响应头，防止中文乱码

⑥使用 res.end()把内容响应给客户端

```javascript
server.on('request', (req, res) => {
    // 获取请求的 url 地址
    const url = req.url
    // 设置默认的响应内容为 404 Not found
    let content = '<h1>404 Not found</h1>'
    // 判断用户请求的是否为 / 或 /index.html 首页
    // 判断用户请求的是否为 /about.html 关于页面
    if(url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    }
    // 设置 Content-Type 响应头，防止中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // 使用 res.end() 把内容响应给客户端
    res.end(content)

})
```

