

## 模块化基本概念

**模块化**是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元

**模块化作用**：

- 提高了代码的复用性
- 提高了代码的可维护性
- 可以实现按需加载

**模块化规范**是对代码进行模块化拆分和组合时需要遵守的规则，如使用何种语法格式引用模块和向外暴露成员

## Node.js 中模块的分类

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：

- 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）

  ```javascript
  const fs = require('fs')
  ```

- 自定义模块（用户创建的每个 .js 文件，都是自定义模块）

  ```javascript
  const custon = require('./custom')
  ```

- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

  ```javascript
  const moment = require('monent')
  ```

>注意：
>
>使用 require()方法加载其它模块时，会执行被加载模块中的代码

## Node.js 中的模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做**模块作用域**

**模块作用域作用**：防止全局变量污染

## 向外共享模块作用域中的成员

### module 对象

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207311550103.png)

### module.exports 对象

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用

```javascript
// 自定义模块.js
const age = 20
// 向 module.exports 对象上挂载 username 属性
module.exports.username = '张三'
// 向 module.exports 对象上挂载 sayHello 方法
module.exports.sayHello = function () {
    console.log('Hello')
}
module.exports.age = age

//使用模块.js
const m = require('./06-自定义模块')
console.log(m)
```

>外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象

### 共享成员时的注意点

使用 require() 方法导入模块时，导入的结果，永远以 module.exports 指向的对象为准

- 默认情况下，exports 和 module.exports 指向同一个对象。
- 最终共享的结果，以 module.exports 指向的对象为准

```javascript
// 自定义模块.js
const age = 20
// 向 module.exports 对象上挂载 username 属性
module.exports.username = '张三'
// 向 module.exports 对象上挂载 sayHello 方法
module.exports.sayHello = function () {
    console.log('Hello')
}
module.exports.age = age

module.exports = {
    nickname: '小黑',
    sayHi () {
        console.log('Hi')
    }
}
//使用模块.js
const m = require('./06-自定义模块')
console.log(m)
```

### exports 和 module.exports 的使用误区

时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207311612484.png)

>注意：
>
>为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports

## Node.js 中的模块化规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖

- 每个模块内部，module 变量代表当前模块
- module 变量是一个对象，它的exports属性（即module.exports）是对外的接口
- 加载某个模块，其实是加载该模块的 module.exports属性。require() 方法用于加载模块

## npm与包

### 包

- Node.js 中的第三方模块又叫做包

- 不同于 Node.js 中的内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用

  >Node.js 中的包都是免费且开源的，不需要付费即可免费下载使用

- 由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低

- 包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率

- 包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系

**使用**：

- 包查找地址： https://www.npmjs.com/
- 包下载地址：https://registry.npmjs.org/
- 用npm下载包，下载node的同时也将npm下载了下来，可以在终端中用`npm -v`查看npm的版本
- 可在官网看对应包的使用说明

### 包的使用

**在项目中安装包**：

```npm
npm install 包的完整名称
// 简写
npm i 完整的包名称
```

示例：

```javascript
// 1. 导入需要的包
// 注意：导入的名称，就是安装包时的名称
const moment = require('moment')

const dt = moment().format('YYYY-MM-DD HH:mm:ss')
console.log(dt)
```

**初次装包后多了哪些文件**

初次装包完成后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件

- node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包

- package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等

  >注意：
  >
  >程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们

**安装指定版本的包**

默认情况下，使用 npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包名之后，通过 @ 符号指定具体的版本

```npm
npm i moment@2.22.2
```

### 包管理配置文件

npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置信息。例如：

- 项目的名称、版本号、描述等
- 项目中都用到了哪些包
- 哪些包只在开发期间会用到
- 那些包在开发和部署时都需要用到

**快速创建package.json**

npm 包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理

```npm
npm init -y
```

>注意：
>
>上述命令只能在英文的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格
>
>运行 `npm install` 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中

**denpendencies 节点**

package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包

**一次性安装所有的包**

可以运行 `npm install` 命令（或 `npm i`）一次性安装所有的依赖包

```npm
// 执行命令时，npm包管理工具会先读取 package.json 中的 dependencies 节点，然后会把这些包一次性下载到项目中
npm install 
```

**卸载包**

可以运行 `npm uninstall` 命令，来卸载指定的包

```npm
// 使用 npm uninstall 具体的包名，来卸载包
npm uninstall moment
```

>注意：
>
>npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉。

**devDependencies 节点**

- 如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中
- 与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中

可以使用如下的命令，将包记录到 devDependencies 节点中：

```npm
// 安装指定的包，并记录到 devDependencies 节点中
npm i 包名 -D
// 完整写法
npm install 包名 --save-dev
```

>可以到官网看install安装说明，有–save-dev的就可以用这个方法丢devDependencies 节点里

**解决下包速度慢的问题**

为了更方便的切换下包的镜像源，我们可以安装 nrm 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源

```npm
// 将nrm安装为全局可用的工具
npm i nrm -g
// 查看所有可用的镜像源
nrm ls
// 将下包的镜像源切换为taobao 镜像
nrm use taobao
```

### 包的分类

**项目包**

那些被安装到项目的 node_modules 目录中的包，都是项目包

项目包又分为两类，分别是：

- 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到）
- 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

```npm
npm i 包名 -D 	//开发依赖包（会被记录到devDependencies节点下）
npm i 包名	     //核心依赖包（会被记录到dependencies节点下）
```

**全局包**

- 在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包
- 全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下

```npm
npm i 包名 -g					//全局安装指定的包
npm uninstall 包名 -g			  //卸载全局安装的包

```

>注意：
>
>只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令
>
>判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可

**i5ting_toc**

i5ting_toc 是一个可以把 md 文档转为 html 页面的小工具，使用步骤如下：

```npm
// 将 i5ting_toc 安装为全局包
npm install -g i5ting_toc
// 调用 i5ting_toc 实现md转html的功能
i5ting_toc -f 要转换的md文件路径 -o
```

### 规范的包结构

一个规范的包，它的组成结构，必须符合以下3点要求：

- 包必须以单独的目录而存在
- 包的顶级目录下要必须包含 package.json 这个包管理配置文件
- package.json 中必须包含name，version，main这三个属性，分别代表包的名字、版本号、包的入口

>注意：
>
>以上 3 点要求是一个规范的包结构必须遵守的格式，关于更多的约束，可以参考如下网址：https://yarnpkg.com/zh-Hans/docs/package-json

### 开发属于自己的包

**需要实现的功能**

- 格式化日期
- 转义 HTML 中的特殊字符
- 还原 HTML 中的特殊字符

**初始化包的基本结构**

新建 itheima-tools 文件夹，作为包的根目录

在 itheima-tools 文件夹中，新建如下三个文件：

- package.json （包管理配置文件）


- index.js          （包的入口文件）


- README.md  （包的说明文档）

**初始化 package.json**

```json
{
    "name": "itheima-tools-douying",
    "version": "1.0.0",
    "main": "index.js",
    "description": "提供了格式化时间、HTMLEscape相关的功能",
    "keywords": ["itheima", "dataFormat", "escape"],
    "license": "ISC"
}
```

**在 index.js 中定义格式化时间的方法**

```javascript
// 格式化时间函数
function dateFormat(dateStr) {
    const dt = new Date(dateStr)

    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())

    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 补零函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}

// 向外暴露需要的成员
module.exports = {
    dateFormat
}
```

**在 index.js 中定义转义 HTML 的方法**

```javascript
// 定义转义 HTML 字符的函数
function htmlEscape(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '&':
                return '&amp;'
        }
    })
}
```

**在 index.js 中定义还原 HTML 的方法**

```javascript
// 定义还原 HTML 字符串的函数
function htmlUnEscape(str) {
    return str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case '&lt;':
                return '<'
            case '&gt;':
                return '>'
            case '&quot;':
                return '"'
            case '&amp;':
                return '&'
        }
    })
}
```

**将不同的功能进行模块化拆分**

- 将格式化时间的功能，拆分到 src -> dateFormat.js 中
- 将处理 HTML 字符串的功能，拆分到 src -> htmlEscape.js 中
- 在 index.js 中，导入两个模块，得到需要向外共享的方法
- 在 index.js 中，使用 module.exports把对应的方法共享出去

**编写包的说明文档**

包根目录中的 README.md 文件，是包的使用说明文档。通过它，我们可以事先把包的使用说明，以markdown 的格式写出来，方便用户参考

README 文件中具体写什么内容，没有强制性的要求；只要能够清晰地把包的作用、用法、注意事项等描述清楚即可

我们所创建的这个包的 README.md 文档中，会包含以下 6 项内容：安装方式、导入方式、格式化时间、转义HTML 中的特殊字符、还原 HTML 中的特殊字符、开源协议

### 发布包

**登录**：

```npm
npm login
```

>记得使用身份验证器，需要一次性的密码

**发布包**：

```npm
npm publish
```

>包名不能雷同

**删除已发布的包**：

```npm
npm unpublish 包名 --force
```

>注意：
>
>npmunpublish 命令只能删除72 小时以内发布的包
>
>npmunpublish 删除的包，在24 小时内不允许重复发布
>
>发布包的时候要慎重，尽量不要往 npm 上发布没有意义的包

## 模块的加载机制

模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次

>注意：
>
>不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率

### 内置模块的加载机制

内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高

### 自定义模块的加载机制

- 使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../ 这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载

- 在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：

  ①按照确切的文件名进行加载

  ②补全 .js 扩展名进行加载=

  ③补全 .json 扩展名进行加载

  ④补全 .node 扩展名进行加载

  ⑤加载失败，终端报错

### 第三方模块的加载机制

- 如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块

- 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录

- 例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：

  ① C:\Users\itheima\project\node_modules\tools

  ② C:\Users\itheima\node_modules\tools

  ③ C:\Users\node_modules\tools

  ④ C:\node_modules\tools

### 目录作为模块

当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：

①在被加载的目录下查找一个叫做package.json 的文件，并寻找 main 属性，作为 require() 加载的入口

②如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件

③如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'

例：

1.新建test文件夹，在文件夹中放 a.js，index.js 和 package.json

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207312045516.png)

```javascript
//a.js中
console.log('通过 package.json 加载了 a.js 文件')

//index.js中
console.log('加载了 index.js 文件')

//package.json中
{
    "main": "./a.js"
}
```

2.新建 test.js 并调用

```javascript
require('./17-test')
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207312049886.png)

3.删除 package.json 再次调用test.js

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207312049884.png)

4.删去index.js 再次调用test.js

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207312049885.png)

