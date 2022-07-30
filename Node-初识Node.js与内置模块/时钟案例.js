

// 导入fs模块
const fs = require('fs')

// 导入path模块
const path = require('path')


// 定义正则表达式，分别匹配style标签和script标签
    // \s表示空白字符，\S表示非空白字符，*表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 读取需要被处理的HTML文件
fs.readFile(path.join(__dirname, './index.html'), 'utf8', function (err, dataStr) {
    // 读取HTML文件失败
    if(err) {
        return console.log('读取HTML文件失败' + err.message)
    }
    // 读取文件成功后，调用对应的三个方法，分别拆解出css，js，html文件
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
})


// 定义处理CSS样式的方法
function resolveCSS(htmlStr) {
    // 使用正则提取需要的内容
    const r1 = regStyle.exec(htmlStr)
    // 将提取出来的样式字符串，进行字符串的replace替换操作
    const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
    // 调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.css的文件里
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function (err) {
        if(err) {
            return console.log('写入CSS样式失败' + err.message)
        }
        console.log('写入样式成功！')
    })
}

// 定义处理JS脚本的方法
function resolveJS(htmlStr) {
    // 使用正则提取需要的内容
    const r2 = regScript.exec(htmlStr)
    // 将提取出来的样式字符串，进行字符串的replace替换操作
    const newJS = r2[0].replace('<script>', '').replace('</script>', '')
    // 调用fs.writeFile()方法，将提取的JS脚本，写入到clock目录中index.js的文件里
    fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function (err) {
        if(err) {
            return console.log('写入JS脚本失败' + err.message)
        }
        console.log('写入JS脚本成功！')
    })
}

// 定义处理html结构的方法
function resolveHTML(htmlStr) {
    // 将字符串调用replace方法，把内嵌style和script标签，替换为外联的link和script标签
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
    // 写入index.html文件
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function (err) {
        if(err) {
            return console.log('写入HTML文件失败' + err.message)
        }
        console.log('写入HTML页面成功')
    })
}