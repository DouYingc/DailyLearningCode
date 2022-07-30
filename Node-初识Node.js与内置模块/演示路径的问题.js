const fs = require('fs')

// fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
//     if(err) {
//         return console.log('读取文件失败！' + err.message)
//     }
//     console.log('读取文件成功' + dataStr)
// })

// __dirname 表示当前文件所处的目录
// console.log(__dirname)

fs.readFile(__dirname + '/files/1.txt', 'utf8', function (err, dataStr) {
    if(err) {
        return console.log('读取文件失败！' + err.message)
    }
    console.log('读取文件成功' + dataStr)
})