## 安装
```
npm install itheima-tools-douying
```

## 导入
```js
const itheima = require('itheima-tools-douying')
```

## 格式化时间
```js
// 调用 dateFormat 对时间进行格式化
const dtStr = tools.dateFormat(new Date())
// 结果 2022-07-31 20:00:35
console.log(dtStr)
```

## 转义HTML 中的特殊字符
```js
// 待转换的 HTML 字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
// 调用 htmlEscape 方法进行转换
const str = tools.htmlEscape(htmlStr)
// 转换的结果 &lt;h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
console.log(str)
```

## 还原 HTML 中的特殊字符
```js
// 待还原的 HTML 字符串
const str2 = tools.htmlUnEscape(str)
//输出的结果 <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1> 
console.log(str2)
```
## 开源协议
ISC