

// 导入fs文件系统模块
const fs = require('fs')

// 调用fs.writeFile()方法，写入文件内容
    // 参数1： 文件的存放路径
    // 参数2： 写入的内容
    // 参数3： 回调函数
fs.writeFile('./files/3.txt','ok123', function(err) {
    // 如果文件写入成功，则err = null
    // 如果文件写入失败，则err = 一个错误对象
    // console.log(err)

    if(err) {
        return console.log('文件写入失败!' + err.message)
    }
    console.log('文件写入成功!');
})