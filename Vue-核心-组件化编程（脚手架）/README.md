## Vue组件化编程 components

### 传统方式编写应用的弊端

- 引用导致依赖关系混乱，难以维护
- html中的代码复用率不高

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208111848285.png)

### 组件式编写应用

- 组件的概念：实现应用中局部功能代码和资源的集合
- 组件不仅可以放css，html，js，还可以放mp4，mp3，文字格式等等
- 组件的作用：复用编码，简化项目编码，提高运行效率

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208111852002.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208111904053.png)

## 非单文件组件

### 使用组件的步骤

- **Vue中使用组件的三大步骤：**
  1. 定义组件(创建组件)
  2. 注册组件
  3. 使用组件(写组件标签)


- **如何定义一个组件？**

使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别

- **区别如下**

  - el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器

  - data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系

    备注：使用template可以配置组件结构

- **如何注册组件？**

  - 局部注册：new Vue的时候传入components选项
  - 全局注册：Vue.component(‘组件名’,组件)

- **编写组件标签：**

  `<school></school>`

**① 局部注册组件**

```vue
  <div id="root">

    <hr>
    <h1>{{msg}}</h1>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <school></school>
    <school></school>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <student></student>
  </div>


</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false
  // 第一步：创建 school 组件
  const school = Vue.extend({
    template: `
      <div>
        <h1>学校名称：{{schoolName}}</h1>
        <h1>学校地址：{{address}}</h1>
        <button @click="showName">点我提示学校名</button>
      </div>
    `,
    // el: '#root', // 组件定义时一定不要写 el 配置项，因为最终所有的组件都要被一个 vm 管理，由 vm 决定服务于哪个容器
    data() {
      return {
        schoolName: '金职院',
        address: '浙江金华',
      }
    },
    methods: {
      showName() {
        alert(this.schoolName)
      }
    },
  })

  // 第一步：创建 student 组件
  const student = Vue.extend({
    template: `
      <div>
        <h1>学生姓名：{{studentName}}</h1>
        <h1>学生年龄：{{age}}</h1>
      </div>
    `,
    data() {
      return {
        studentName: 'DouYing',
        age: 20,
      }
    }
  })

  // 创建 vm
  new Vue({
    el: '#root',
    data: {
      msg: '你好'
    },
    // 第二步：注册组件（局部注册）
    components: {
      school,
      student
    },

  })

</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208111955853.png)

**② 全局注册组件**

`Vue.component(‘hello’,hello)` // 组件的名字 组件的位置

```vue
  <div id="root">
    <hello></hello>
    <hr>
    <h1>{{msg}}</h1>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <school></school>
    <school></school>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <student></student>
  </div>
  <div id="root2">
    <hello></hello>
  </div>

</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false
  // 第一步：创建 school 组件
  const school = Vue.extend({
    template: `
      <div>
        <h1>学校名称：{{schoolName}}</h1>
        <h1>学校地址：{{address}}</h1>
        <button @click="showName">点我提示学校名</button>
      </div>
    `,
    // el: '#root', // 组件定义时一定不要写 el 配置项，因为最终所有的组件都要被一个 vm 管理，由 vm 决定服务于哪个容器
    data() {
      return {
        schoolName: '金职院',
        address: '浙江金华',
      }
    },
    methods: {
      showName() {
        alert(this.schoolName)
      }
    },
  })

  // 第一步：创建 student 组件
  const student = Vue.extend({
    template: `
      <div>
        <h1>学生姓名：{{studentName}}</h1>
        <h1>学生年龄：{{age}}</h1>
      </div>
    `,
    data() {
      return {
        studentName: 'DouYing',
        age: 20,
      }
    }
  })

  // 第一步：创建 hello 组件
  const hello = Vue.extend({
    template: `
      <div>
        <h2>你好啊！{{name}}</h2>
      </div>
    `,
    data() {
      return {
        name: 'DouYing'
      }
    }
  })

  // 第二步：全局注册组件
  Vue.component('hello', hello)
  // 创建 vm
  new Vue({
    el: '#root',
    data: {
      msg: '你好'
    },
    // 第二步：注册组件（局部注册）
    components: {
      school,
      student
    },

  })

  new Vue({
    el: '#root2',
  })
</script>
```

### 组件的注意事项

- **关于组件名:**

  （1）一个单词组成：

  ​	第一种写法(首字母小写)：school

  ​	第二种写法(首字母大写)：School

  （2）多个单词组成：

  ​	第一种写法(kebab-case命名)：my-school ‘my-school’

  ​	第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)

- **备注：**

  （1）组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行

  （2）可以使用name配置项指定组件在开发者工具中呈现的名字

- **关于组件标签:**

  第一种写法：`<school></school>`

  第二种写法：`<school/>`

  **备注：** 不用使用脚手架时，`<school/>`会导致后续组件不能渲染

- **一个简写方式：**

  `const school = Vue.extend(options)` 可简写为：`const school = options`

### 创建组件简写形式

```js
  const school = {
    name: 'JHC',
    template: `
      <div>
        <h1>学校名称：{{name}}</h1>
        <h1>学校地址：{{address}}</h1>
      </div>
    `,
    data() {
      return {
        name: '金职院',
        address: '浙江金华',
      }
    }
  }
```

### 组件的嵌套

- 子组件（student 组件）应该写在 父组件（school组件）的上面
- 父组件（school组件）中使用 子组件（student 组件）

**① school 父组件嵌套 student 子组件**

```vue
<body>
    <div id="root">
        //子组件不再页面引用，而在父组件中引用
        <school></school>
    </div>
    </body>

    <script type="text/javascript">
        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

       //创建 student 组件
		const student = Vue.extend({
			template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
				</div>
			`,
			data(){
				return {
					studentName:'DouYing',
					age:18
				}
			},
		})

       //创建 school组件
        const school = Vue.extend({ // 传入配置对象
        
            //使用子组件
            template:`
               <div>
                    <h2>学校名称：{{schoolName}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <student></student> 
                </div>
           `,
            data(){ 
                return {
                    schoolName:'金职院',
                    address:'浙江金华'
                }
            },
            components:{
				student,
			}
       })

        new Vue({
         el: "#root",
		  components:{
				school,
			}
        })
  </script>
</html>
```

**②定义hello 组件，其与school平级**

```vue
<div id="root">
	<school></school>
	<hello></hello>
</div>

<script type="text/javascript">
//定义hello组件
const hello = Vue.extend({
	template:`<h1>{{msg}}</h1>`,
	data(){
		return {
			msg:'欢迎来和DouYing一起学习！'
		}
	}
})

new Vue({
    el: "#root",
	components:{
		school,
        hello,
	}
})
  </script>
```

**开发中常用技巧 app组件**

**作用：** 用于管理应用里面所有的组件（vm之下，所有组件之上）

**补充：** 容器中也可什么都不写

```vue
<body>
  <div id="root">
  </div>

</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false

  // 定义 school 组件
  const student = Vue.extend({
    name: 'student',
    template: `
      <div>
        <h1>学生姓名：{{name}}</h1>
        <h1>学校年龄：{{age}}</h1>
      </div>
    `,
    data() {
      return {
        name: 'DouYing',
        age: 20
      }
    }
  })

  // 定义 school 组件
  const school = Vue.extend({
    name: 'school',
    template: `
      <div>
        <h1>学校名称：{{name}}</h1>
        <h1>学校地址：{{address}}</h1>
        <student></student>
      </div>
    `,
    data() {
      return {
        name: '金职院',
        address: '浙江金华',
      }
    },
    // 注册组件（局部）
    components: {
      student
    }
  })

  // 定义 hello 组件
  const hello = Vue.extend({
    template: `<h1>{{msg}}</h1>`,
    data() {
      return {
        msg: '欢迎学习Vue！'
      }
    }
  })

  // 定义 app 组件
  const app = Vue.extend({
    template: `
    <div>
      <hello></hello>
      <school></school>
    </div>
    `,
    components: {
      school,
      hello
    }
  })

  // 创建 vm
  new Vue({
    template: `<app></app>`,
    el: '#root',
    // 注册组件（局部）
    components: {
      app,
    }
  })
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112033221.png)

### VueComponent构造函数

**关于VueComponent**

- school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的

- 我们只需要写`<school/>`或`<school></school>`，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)

- 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent

- 关于 this 指向：

  (1) 组件配置中：

  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】

  (2) new Vue(options)配置中：

  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】

- VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）
  Vue的实例对象，以后简称vm

```vue
  <div id="root">
    <school></school>
    <hello></hello>
  </div>

</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false


  // 定义 school 组件
  const school = Vue.extend({
    name: 'school',
    template: `
      <div>
        <h1>学校名称：{{name}}</h1>
        <h1>学校地址：{{address}}</h1>
        <button @click="showName">点我提示学校名</button>
      </div>
    `,
    data() {
      return {
        name: '金职院',
        address: '浙江金华',
      }
    },
    methods: {
      showName() {
        console.log('showName', this)
      },
    },
  })

  const test = Vue.extend({
    template: `<span>DouYing</span>`
  })

  // 定义 hello 组件
  const hello = Vue.extend({
    template: `
      <div>
        <h2>{{msg}}</h2>
        <test></test>
      </div>
    `,
    data() {
      return {
        msg: '你好啊！'
      }
    },
    components: {
      test,
    }
  })

  console.log('@', school)// Vue 的 VueComponent的构造函数
  console.log('#', hello)  // 每次调用都会 创建一个新的 构造函数对象
  // 每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

  const vm = new Vue({
    el: '#root',
    components: {
      school,
      hello
    }
  })
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112059580.png)

**vm 管理 一个一个的vc**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112059581.png)

### Vue实例与组件实例

vc有的功能vm都有，vm有一个功能vc就没有，vm可以通过el决定来为哪个容器服务，vc不可以

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112107432.png)

### 重要的内置关系



**① 原型相关知识**

```html
<body>

  <div id="root">
  </div>

</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false

  function Demo() {
    this.a = 1
    this.b = 2
  }
  // 创建一个 Demo 的实例对象
  const d = new Demo()

  console.log(Demo.prototype) // 显示原型属性

  console.log(d.__proto__) // 隐式原型属性

  console.log(Demo.prototype === d.__proto__)

  // 程序员通过显示原型属性操作原型对象，追加一个 x 属性，值为 99
  Demo.prototype.x = 99
  console.log('@', d.__proto__.x)
  console.log('@', d)
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112116133.png)

**② 内置关系 prototype.proto === Vue.prototype**

**解释：** 按照原型链的指向，实例的隐式原型属性，应该指向其缔造者的原型对象。故VC的隐式原型属性指向VC的原型对象，且VC的隐式原型属性本应该指向Object的原型对象，但这里VC的隐式原型属性却指向Vue的原型对象
**目的：** 让组件实例对象（vc）可以访问到 Vue原型上的属性、方法
![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112207799.png)

**在Vue上的x能被组件school访问到**

```vue
  <div id="root">
    <school></school>
  </div>

</body>

<script>
  // 阻止 vue 在启动时生成生产提示
  Vue.config.productionTip = false
  Vue.prototype.x = 99

  const school = Vue.extend({
    name: 'school',
    template: `
      <div>
        <h1>学校名称：{{name}}</h1>
        <h1>学校地址：{{address}}</h1>
        <button @click="showX">点我输出x</button>
      </div>
    `,
    data() {
      return {
        name: '金职院',
        address: '浙江金华',
      }
    },
    methods: {
      showX() {
        console.log(this.x)
      }
    },
  })

  // 创建一个 vm
  const vm = new Vue({
    el: '#root',
    data: {
      msg: '你好'
    },
    components: {
      school
    },
  })
</script>
```

## 单文件组件

**安装提示插件：vetur**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112209908.png)

**① Vue文件的基本结构**

安装插件后快捷键：<v

```vue
<template>
	 // 组件的结构 
</template>

<script>
	// 组件交互相关的代码（数据、方法等等）
</script>

<style>
	// 组件的样式
</style>
```

**② 组件的定义 基本使用(简单使用)**

- school 组件

  ```vue
  <template>
    <div class="demo">
      <h1>学校名称：{{ name }}</h1>
      <h1>学校地址：{{ address }}</h1>
      <button @click="showName">点我提示学校名</button>
    </div>
  </template>

  <script>
    export default {
      name: 'School',
      data() {
        return {
          name: '金职院',
          address: '浙江金华',
        }
      },
      methods: {
        showName() {
          alert(this.schoolName)
        },
      },
    }
  </script>

  <style>
    .demo {
      background-color: orange;
    }
  </style> 
  ```

- student 组件

  ```vue
  <template>
    <div>
      <h1>学生姓名：{{ name }}</h1>
      <h1>学生年龄：{{ age }}</h1>
    </div>
  </template>

  <script>
    export default {
      name: 'Student',
      data() {
        return {
          name: 'DouYing',
          age: 20,
        }
      },
    }
  </script>

  ```

- App组件

  ```vue
  <template>
    <div>
      <school></school>
      <student></student>
    </div>
  </template>

  <script>
    // 引入组件
    import School from './School.vue'
    import Student from './Student.vue'

    export default {
      name: 'App',
      components: {
        School,
        Student,
      },
    }
  </script>
  ```

**③ 创建vm：main.js**

```js
import App from './App.vue'

new Vue({
  el: '#root',
  template:`<App></App>`,
  components: {
    App
  },
})
```

**④ 容器 index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>练习一下单文件组件的语法</title>
</head>

<body>
  <div id="root"></div>
  <script src="../js/vue.js"></script>
  <script src="./main.js"></script>
</body>

</html>
```

**逻辑：**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112317281.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112317284.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112317282.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112317283.png)

## Vue脚手架cli

[cli官网](https://cli.vuejs.org/zh/)

### 创建Vue脚手架

在cmd命令窗口下执行下列步骤

- **全局安装@vue/cli**

  `npm install -g @vue/cli`

  （过程中不用回车，容易报错，实在不动了再回车试试，等很久的建议配置淘宝镜像）

- **创建项目**

  切换到要创建项目的目录，使用命令创建项目

  `cd /d 目标目录`

  `vue create xxx`（xxx为自定义项目名）

- **选择运行环境（Vue2或3或自定义）**

  ![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112330427.png)

  出现这个表示创建成功

  ![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112330427.png)

- **启动项目**

  `cd vue_test`
  `npm run serve`

  ![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208112332900.png)

- **访问项目**

  可通过 `http://localhost:8080/` 访问项目

### Vue脚手架结构

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208121612667.png)

**分析index.html页面结构**

```html
<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <!-- 针对 IE 浏览器的一个特殊配置，含义是让 IE 浏览器以最高的的渲染级别渲染页面 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- 开启移动端的理想视口 -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <!-- 配置页签的图标 -->
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <!-- 配置网页的标题 -->
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <!-- 当浏览器不支持 JS 时，noscript 标签中的元素就会被渲染 -->
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>
  <!-- 容器 -->
  <div id="app"></div>
  <!-- built files will be auto injected -->
</body>

</html>
```

### render函数

**关于不同版本的Vue**

- vue.js与vue.runtime.xxx.js的区别

  (1) vue.js是完整版的Vue，包含：核心功能+模板解析器

  (2) vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器

- 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容

**① main.js如果直接这么写会报错**

```vue
//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false


//创建Vue实例对象---vm
new Vue({
	el:'#app',
	template:`<App></App>`,
	components:{App},
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208121641908.png)

**② 报错原因**

引入的vue是阉割版的vue，里面不包含模板解析器

**③ 解决方法**

**解决方法1：使用render(渲染)函数**

- render需要返回值
- 可以接收参数

```vue
//render写成最终简化方式的简化步骤如下
// ① 完整写法
new Vue({
	el:'#app',
	render(createElement) { 
		return createElement('h1','你好啊')
	}
})
// ② 没有使用到this可以写成箭头函数
new Vue({
	el:'#app',
	render:(createElement)=> { 
		return createElement('h1','你好啊')
	}
})
// ③ 箭头函数左面含有一个参数 可以省略小括号
new Vue({
	el:'#app',
	render:createElement=> { 
		return createElement('h1','你好啊')
	}
})
// ④ 箭头函数只有一句函数体，并且还return
new Vue({
	el:'#app',
	render:createElement=> createElement('h1','你好啊')
})
// ⑤ createElement 使用字母替代 render:q=> q('h1','你好啊')
new Vue({
	el:'#app',
	render:h=> h('h1','你好啊')
})

// 页面上成功返回
```

- 和创建的基础代码 参数 其实还不同
  h1是HTML中的内置元素，里面需要写具体的内容，需要传递第二个参数
  如果使用的是组件 就不用内容

```vue
// 两个参数
new Vue({
	el:'#app',
	render:h=> h('h1','你好啊') 
})
// 一个参数
import App from './App.vue'

new Vue({
	el:'#app',
   // render函数完成了这个功能：将App组件放入容器中
	render: h => h(App) // 不加入引号 读取变量
})
```

**解决方法2：引入完整版本的Vue**

```vue
//引入Vue
import Vue from 'vue/dist/vue'

Vue.config.productionTip = false

new Vue({
	el:'#app',
	template:`<h1>你好啊</h1>`,
})
```

**关于引入阉割版vue而不使用vue的原因**

**举例：**

- 引入完整版vue：买装修材料 + 买工人，装修完成后还得养着工人
- 引入阉割版vue：买装修材料 + 雇工人，装修完成后不用养工人

### 修改默认配置

#### 查看默认配置

**vue.config.js配置文件**

- 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
- 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

**查看Vue的配置文件**

vue把核心的配置文件隐藏了，怕用户修改错误，项目跑不起来程序，查看核心配置文件命令：`vue inspect > output.js`
运行这个命令后会出现 output.js 文件，默认进去报错，在开头加上const a = 就行

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208121719075.png)

但要注意这个文件只是给你看，修改它并不能真的修改到配置

#### 修改Vue的默认配置

- 官网左侧栏中的都可以进行修改：https://cli.vuejs.org/zh/config/
- 新建vue.config.js 文件 和 package.json同级，在vue.config.js中书写需要修改的配置，程序读取时，会把vue.config.js中程序员书写的相关内容，与vue的核心配置文件进行整合，最核心的配置修改不到，之后需要重新的启动npm run serve

```js
//vue.config.js
module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
  lintOnSave:false, //关闭语法检查
}
```

### ref属性

- 被用来个元素或子组件注册引用信息（id的替代者）

- 应用在html标签上获取真实DOM元素，应用在组件标签上获取组件实例对象（vc）

- 使用方式：

  打标识： `<h1 ref='xxx'>...</h1>` 或`<School ref="xxx"></School>`

  获取：`this.&refs.xxx`

```vue
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
    <school ref="sch" />
  </div>
</template>

<script>
  // 引入 School 组件
  import School from './components/School.vue'

  export default {
    name: 'App',
    components: { School },
    data() {
      return {
        msg: '欢迎学习Vue！',
      }
    },
    methods: {
      showDOM() {
        console.log(this.$refs.title) // 真实 DOM 元素
        console.log(this.$refs.btn) // 真实 DOM 元素
        console.log(this.$refs.sch) // School 组件的实例对象（vc）
      },
    },
  }
</script>
```

**输出h1元素**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122033942.png)

**school 用 ref 输出vc实例**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122033943.png)

**school 用 id 输出school组件**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122033944.png)

### props配置项(重要)

- 功能：让组件接受外部传过来的数据

- 传递数据：`<Demo name="xxx"/>`

- 接收数据：

  （1）简单声明接受：props:[‘name’]
  （2）限制类型：props:{name:String}
  （3）限制类型、限制必要性、指定默认值：

**备注：** props是只读的，Vue底层会监测你是否有对props所接受而来的数据进行了修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，则重新复制一份数据到data中，再修改data中的数据即可

#### 使用proprs

**在app.vue中引入student 组件并传递参数**

```vue
  <div>
    <student name="李四" sex="女" age="18" />
  </div>
```

**student 中的组件数据不能写死，方便不同学生复用**

```vue
<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{age+1}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      console.log(this)
      return {
        msg: '我是一个学习Vue的学生',
        myAge: this.age
      }
    },
    // 简单声明接收
    props: ['name', 'sex', 'age'],

    // 接收的同时对数据：进行类型限制 + 默认值的指令 + 必要性的限制
    props: {
        name: String,
        age: Number,
        sex: String,
      }, 

    props: {
      name: {
        type: String, // name 的类型
        required: true // name 是必要的
      },
      age: {
        type: Number,
        default: 99 // 默认值
      },
      sex: {
        type: String,
        require: true
      }
    }, 
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122122727.png)

**如果操作传入过来的数据**

如：给年龄加一岁,使用普通参数传参会出现问题

```vue
<div>
	<h1>{{msg}}</h1>
	<h2>学生姓名：{{name}}</h2>
	<h2>学生性别：{{sex}}</h2>
	<h2>学生年龄：{{age + 1}}</h2>
	//直接这么做学生年龄的结果是181，而不是19
</div>
```

**解决办法：**

app.vue中绑定age 的值

- age 表示的是字符串
- :age 的值是运行 “18” js表达式 里面执行的结果

```vue
  <div>
    <student name="李四" sex="女" :age="18" />
  </div>
```

#### 注意事项

**传入的参数不能随意声明**

```vue
<script>
	export default {
		name:'Student',
		data() {
			console.log(this)
			return {
				msg:'我是一名热爱学习的学生',
			}
		},
		props:['name','age','sex','phone'] 
	}
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122125256.png)

**外部传递的参数不能直接修改**

**案例：** 修改外部传递参数age的数值

```vue
<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{myAge+1}}</h2>
    <button @click="updateAge">点我年龄+1</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      console.log(this)
      return {
        msg: '我是一个学习Vue的学生',
        myAge: this.age
      }
    },
    methods: {
      updateAge() {
        this.myAge++
      }
    },
    // 简单声明接收
    props: ['name', 'sex', 'age', 'phone'],
  }
</script>

```

### mixin配置项(混入/混合)

- 功能：可以把多个组件共用的配置提取成一个混入对象

- 使用方式：

  - 定义混入

    ```js
    {
    	data(){...},
    	methods: {...}
    	...
    }
    ```

    使用混入

    1. 全局混入：Vue.mixin(xxx)


    2. 局部混入：minxins:[‘xxx’]

**基本使用**

**student.vue 和 school.vue中有相同的代码段**

```js
  methods: {
    showName() {
      alert(this.name)
    }
  }
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122145065.png)

**新建mixin.js（文件名可以自定义）**

```js
export const mixin = {
  methods: {
    showName() {
      alert(this.name)
    }
  },
  mounted() {
    console.log('你好啊')
  },
}
```

**向student.vue 和 school.vue 中分别引入并应用**

```vue
<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  // 引入混合
  import { mixin } from '../mixin'

  export default {
    name: 'Student',
    data() {
      return {
        name: '金职院',
        address: '浙江金华'
      }
    },

    mixins: [mixin],
  }
</script>
```

**混合原则**

- Vue里没有而mixin中有的，将mixin中的混合给Vue
- Vue和mixin都有的，以Vue中的优先
- mounted 两者都有的，会都用，且mixin的会先使用
  生命周期不以任何人为主,都要，混合的生命周期在前

**全局混合**

在`main.js`中引入，而Student.vue 和 School.vue都不进行引入
所有的vc 和 vm 都会得到

```js
// 引入 mixin
import { mixin } from './mixin'
Vue.mixin(mixin)
```

### 插件

- 功能：用于增强Vue
- 本质：包含install方法的一个对象，install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
- 定义插件：

```js
对象.install = function(Vue, options){
	//1. 添加全局过滤器
	Vue.filter(....)
	
	//2. 添加全局指令
	Vue.directive(...)
	
	//3.配置全局混入
	Vue.mixin(...)
	
	//4. 添加实例方法
	Vue.prototype.$myMethod = function(){...}
	Vue.prototype.$myProperty = xxx
}
```

- 使用插件：Vue.user()

**定义一个Vue插件**

```js
export default {
  install(Vue, x, y, z) {
    console.log(x, y, z)
    //全局过滤器
    Vue.filter('mySlice', function (value) {
      return value.slice(0, 4)
    })

    //定义全局指令
    Vue.directive('fbind', {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element, binding) {
        element.focus()
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value
      }
    })

    // 定义混入
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200
        }
      }
    })

    // 给 Vue 原型上添加一个方法（vm 和 vc 都能使用）
    Vue.prototype.hello = () => { alert('你好啊') }
  }
}
```

**main.js —> 引入、应用插件 在vm之前**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入插件
import plugins from './plugins'
// 关闭 Vue 的生产提示
Vue.config.productionTip = false

// 应用插件
Vue.use(plugins,1,2,3)
// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App)
})
```

### scoped样式

- 作用：让样式在局部生效，防止样式冲突
- 写法：`<style scoped>`

 **Student 和 School 组件书写了同类名样式，会发生冲突**

```vue
// School 组件
	<div class="demo">
		<h2 class="title">学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>

<style>
	.demo{
		background-color: skyblue;
	}
</style>

// Student 组件
<template>
	<div class="demo">
		<h2 class="title">学生姓名：{{name}}</h2>
		<h2 class="atguigu">学生性别：{{sex}}</h2>
	</div>
</template>

<style >
	.demo{
		background-color: orange;
	}
</style>

// 组件样式之间发生冲突
```

**由于app.vue中，Student后引入，所以Student的样式会覆盖掉School的**

```vue
<template>
  <div>
    <School />
    <Student />
  </div>
</template>

<script>
  import School from './components/School.vue'
  import Student from './components/Student.vue'

  export default {
    name: 'App',
    components: { School, Student },
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122228026.png)

**解决办法**：

增加scoped属性

```vue
// School 组件
<style scoped>
	.demo{
		background-color: skyblue;
	}
</style>

// Student 组件
<style lang="less" scoped>
	.demo{
		background-color: orange;
	}
</style>
```

**原理：**

自动增加类名选择器，且名字随机

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208122230297.png)

**注意**

App组件中一般不写scoped，因为会在App中书写的样式，就是想让很多组件使用，没必要加scoped

**补充：**

- style 标签中 lang属性可以写 less 或者是 css 样式
- 如果只写less vue 脚手架处理不了less
- 不写 lang 默认是css
- 需要安装 `npm i less-loader`，注意和webpack 的版本是否冲突，安装 7版本 `npm i less-loader@7`
- 查看版本 `npm view webpack versions`

```less
<style lang="less" scoped>
  .demo {
    background-color: orange;
    .qwe {
      font-size: 40px;
    }
  }
</style>
```

## Todo-list案例

### 静态页面

**app.vue**

**注：** MyItem.vue不直接在app.vue中引入，而在MyList.vue中引入

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader />
        <MyList />
        <MyFooter />
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader.vue'
  import MyList from './components/MyList.vue'
  import MyFooter from './components/MyFooter.vue'

  export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter }
  }
</script>

<style>
  /*base*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
```

**MyHeader.vue**

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" />
  </div>
</template>

<script>
  export default {
    name: 'MyHeader'
  }
</script>

<style scoped>
  /*header*/
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
```

**MyList.vue**

```vue
<template>
  <ul class="todo-main">
    <MyItem />
    <MyItem />
    <MyItem />
    <MyItem />
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem }
  }
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
```

**MyItem.vue**

```vue
<template>
  <li>
    <label>
      <input type="checkbox" />
      <span>xxxxx</span>
    </label>
    <button class="btn btn-danger" style="display:none">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'MyItem'
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
```

**MyFooter.vue**

```vue
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" />
    </label>
    <span>
      <span>已完成0</span> / 全部2
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter'
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208131635396.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208131635431.png)

### 展示动态的数据

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208131637210.png)

**数据的类型、名称是什么**

一堆要做的事情是一个数组，一个个要做的事情是对象，对象里面的内容=={id，name，done(标识，完成)}

**数据保存在哪个组件**

List组件展示就将数据保存在List中

**MyList.vue**

- 根据数据决定使用多少次 MyItem
- 把每一条的具体信息对象传递给 MyItem

```vue
<template>
  <ul class="todo-main">
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem },
    data() {
      return {
        todos: [
          { id: '001', title: '唱', done: true },
          { id: '002', title: '跳', done: false },
          { id: '003', title: 'Rap', done: true }
        ]
      }
    }
  }
</script>
```

**MyItem.vue**

- 接收
- 动态决定是否勾选

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo']
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208131649145.png)

### 交互

组件之间的通信（兄弟、子传父、爷传孙），后面有更好的方式实现

#### 添加

**MyHeader.vue**

- 绑定个键盘事件

- 把用户的输入打印

- 获取用户的输入

  - 方式一：event 事件对象

    ```js
    add(event){
       consloe.log(event.target.value) // 获得发生事件对象的元素
    }
    ```

  - 方式二：v-model

    ```js
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model='title' @keyup.enter="add"/>

    	data() {
            return {
                title:''
            }
        }
    	menthod: {
            add(event){
        		consloe.log(this.target) // 获得发生事件对象的元素
            }
        }
    ```

- 把获取到的数据包装成一个todo对象 id使用uuid 的压缩版本 nanoid （单机版本） `npm i nanoid`

- 把对象放到数组的前民（unshift），在List组件中保存数据的todos ，在Header组件输出

- 两个兄弟组件之间直接进行数据传递——暂时实现不了

- 原始间接传递

  - 把List中的todos[] 给 App，让App通过 props 方式传递给list
  - 让Header 把todoObj 给App

  ![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208131723254.png)

**具体案例实现：**

- 在App里定义一个addTodo方法，通过父传子的形式传给MyHeader
- MyHeader调用了addTodo方法，并对App.vue在data.todos中添加一个todo
- App.vue向MyList中传todos，即可达到插入新的事件的效果

**App.vue**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter />
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader.vue'
  import MyList from './components/MyList.vue'
  import MyFooter from './components/MyFooter.vue'

  export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter },
    data() {
      return {
        todos: [
          { id: '001', title: '唱', done: true },
          { id: '002', title: '跳', done: false },
          { id: '003', title: 'Rap', done: true }
        ]
      }
    },
    methods: {
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      }
    }
  }
</script>
```

**MyHeader.vue**

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add" />
  </div>
</template>

<script>
  // 引入 nanoid，因为 noanoid 是分别暴露，所以这样引入
  import { nanoid } from 'nanoid'
  export default {
    name: 'MyHeader',
    props: ['addTodo'],
    data() {
      return {
        title: ''
      }
    },
    methods: {
      add() {
        // 校验数据
        if (!this.title.trim()) return alert('输入不能为空')
        // 将用户的输入包装成为一个 todo 对象
        const todoObj = { id: nanoid(), title: this.title, done: false }
        // 通知 App 组件去添加一个 todo 对象
        this.addTodo(todoObj)
        // 清空输入
        this.title = ''
      }
    }
  }
</script>
```

**MyList.vue**

```vue
<template>
  <ul class="todo-main">
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem },
    props: ['todos']
  }
</script>
```

#### 勾选

**MyItem.vue**

- 拿到勾选的id，去todos中找到具体的某个人的 done 属性取反
- todos数据在App (数据在哪里操作数据的方法就在哪里)

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props ，v-model 绑定的是传递过来的数据 props 不建议 -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none">删除</button>
  </li>
</template> 

<script>
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo', 'checkTodo'],
    methods: {
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        this.checkTodo(id)
      }
    }
  }
</script>
```

**App.vue**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo" />
        <MyList :todos="todos" :checkTodo="checkTodo" />
        <MyFooter />
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader.vue'
  import MyList from './components/MyList.vue'
  import MyFooter from './components/MyFooter.vue'

  export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter },
    data() {
      return {
        todos: [
          { id: '001', title: '唱', done: true },
          { id: '002', title: '跳', done: false },
          { id: '003', title: 'Rap', done: true }
        ]
      }
    },
    methods: {
      // 添加一个 todo
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      },
      // 勾选 or 取消勾选一个 todo
      checkTodo(id) {
        this.todos.forEach((todo) => {
          if (todo.id === id) todo.done = !todo.done
        })
      }
    }
  }
</script>
```

**MyList.vue**

```vue
<template>
  <ul class="todo-main">
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" :checkTodo="checkTodo" />
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem },
    props: ['todos', 'checkTodo']
  }
</script>
```

#### 删除

- 鼠标悬浮有高亮效果，并出现删除按钮
- 获取id，根据id删除

**MyItem.vue** 

通知app删除对应项 同样是 爷 传 孙

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props ，v-model 绑定的是传递过来的数据 props 不建议 -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template> 

<script>
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo', 'checkTodo', 'deleteTodo'],
    methods: {
      // 勾选 or  取消勾选
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        this.checkTodo(id)
      },
      //删除
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          // 通知 App 组件
          this.deleteTodo(id)
        }
      }
    }
  }
</script>
```

**App.vue 传 list**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo" />
        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo" />
        <MyFooter />
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader.vue'
  import MyList from './components/MyList.vue'
  import MyFooter from './components/MyFooter.vue'

  export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter },
    data() {
      return {
        todos: [
          { id: '001', title: '唱', done: true },
          { id: '002', title: '跳', done: false },
          { id: '003', title: 'Rap', done: true }
        ]
      }
    },
    methods: {
      // 添加一个 todo
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      },
      // 勾选 or 取消勾选一个 todo
      checkTodo(id) {
        this.todos.forEach((todo) => {
          if (todo.id === id) todo.done = !todo.done
        })
      },
      // 删除一个 todo
      deleteTodo(id) {
        // filter 不改变原数组
        this.todos = this.todos.filter(todo => todo.id !== id)
      }
    }
  }
</script>
```

**list 接收**

```vue
<template>
  <ul class="todo-main">
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :checkTodo="checkTodo"
      :deleteTodo="deleteTodo"
    />
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem },
    props: ['todos', 'checkTodo', 'deleteTodo']
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132023146.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132023577.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132023578.png)

#### 底部统计

- 统计全部和已完成 MyFooter –> todos 数组的长度 done 为真的数量

**App.vue 给 footer 传递todos数组**

```vue
<MyFooter :todos="todos" />
```

**MyFooter.vue 声明接收**

```vue
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" />
    </label>
    <span>
      <span>已完成{{doneTotal}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos'],
    computed: {
      doneTotal() {
        /* const x = this.todos.reduce((pre, current) => {
          console.log('@', pre, current)
          return pre + (current.done ? 1 : 0)
        }, 0) */
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      }
    }
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132036634.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132036635.png)

#### 底部交互

- 全选 / 全不选，取决于 已完成 和 全部 是否相等
- 如果没有数据时，不应该勾选，且不应该展示下面整个框

**MyFooter.vue 已完成 / 完成数量的动态变化**

**MyFooter.vue**

```vue
//1.复杂写法
//<input type="checkbox" :checked="doneTotal === tatal"/>

//2.vue简便写法
//total = 0即没有添加事件时，该模块不显示
<div v-show="total">
	<input type="checkbox" :checked="isAll" @change="checkAll"/>
</div>
<script>
export default {
		name:'MyFooter',
		props:['todos','checkAllTodo','clearAllTodo'],
		computed: {
			//总数
			total(){
				return this.todos.length
			},
			//已完成数
			doneTotal(){
				return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
			},
			
			// 简写方式，没有setter 方法  只能被读取不能被修改才可以  后面需要修改
			//控制全选框
			// 一个计算属性可以通过其他的计算属性 在进行计算 
			isAll(){ 
				//已完成事件等于全部事件 且 全部事件大于0  才返回真
				return this.doneTotal === this.total && this.total > 0
			}
		},
	}
</script>

```

**MyFooter.vue 全选 和 局部选 的动态绑定**

- this.checkAllTodo(e.target.checked) // true false 全选 或者 全不选
- 告诉存储 todos 的人全选全不选

**MyFooter.vue**

```vue
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{doneTotal}}</span>
      / 全部{{total}}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos', 'checkAllTodo'],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotal() {
        /* const x = this.todos.reduce((pre, current) => {
          console.log('@', pre, current)
          return pre + (current.done ? 1 : 0)
        }, 0) */
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      },
      // 简写方式，没有setter 方法  只能被读取不能被修改才可以  后面需要修改
      //控制全选框
      // 一个计算属性可以通过其他的计算属性 在进行计算 
      /* isAll() {
        //已完成事件等于全部事件 且 全部事件大于0  才返回真
        return this.doneTotal === this.total && this.total > 0
      } */
      isAll: {
        get() {
          return this.doneTotal === this.total && this.total > 0
        },
        set(value) {
          this.checkAllTodo(value)
        }
      }
    },
    methods: {
      /* checkAll(e) {
        this.checkAllTodo(e.target.checked)
      } */
    }
  }
</script>
```

**App.vue**

```js
<MyFooter :todos="todos" :checkAllTodo="checkAllTodo" />
methods: {
	//全选or取消全选
	//这个done就是全选框的true或false
	checkAllTodo(done){
		//遍历每一个小框，将小框的true或false和全选框的选择状态同步
		this.todos.forEach((todo)=>{
			todo.done = done
		})
	},
}
```

#### 批量删除已完成事件

**MyFooter.vue**

```vue
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{doneTotal}}</span>
      / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos', 'checkAllTodo', 'clearAllTodo'],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotal() {
        /* const x = this.todos.reduce((pre, current) => {
          console.log('@', pre, current)
          return pre + (current.done ? 1 : 0)
        }, 0) */
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      },
      // 简写方式，没有setter 方法  只能被读取不能被修改才可以  后面需要修改
      //控制全选框
      // 一个计算属性可以通过其他的计算属性 在进行计算 
      /* isAll() {
        //已完成事件等于全部事件 且 全部事件大于0  才返回真
        return this.doneTotal === this.total && this.total > 0
      } */
      isAll: {
        get() {
          return this.doneTotal === this.total && this.total > 0
        },
        set(value) {
          this.checkAllTodo(value)
        }
      }
    },
    methods: {
      /* checkAll(e) {
        this.checkAllTodo(e.target.checked)
      } */
      clearAll() {
        this.clearAllTodo()
      }
    }
  }
</script>
```

**App.vue**

```js
// 清除所有已经完成的 todo
      clearAllTodo() {
        this.todos = this.todos.filter(todo => !todo.done)
      }
```

### todoList案例总结

- 组件化编码流程：

  (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突

  (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

  -  一个组件在用：放在组件自身即可


  -  一些组件在用：放在他们共同的父组件上（状态提升）

​	(3).实现交互：从绑定事件开始

- props适用于：

​	(1).父组件 ==> 子组件 通信

​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

- 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
- props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

### TodoList本地监视

**使用监视switch，监视数据todos的变化，变化后拿最新的数据存储**

- 第一次使用时,没有数据，JSON.parse 读取为空会报错，应该给一个空数组

- 有勾选，监视的是todos下的done属性，所以应该是深度监视

  完整版 deep:true

**app.vue**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo" />
        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo" />
        <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllTodo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader.vue'
  import MyList from './components/MyList.vue'
  import MyFooter from './components/MyFooter.vue'

  export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter },
    data() {
      return {
        todos: JSON.parse(localStorage.getItem('todos')) || []
      }
    },
    methods: {
      // 添加一个 todo
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      },
      // 勾选 or 取消勾选一个 todo
      checkTodo(id) {
        this.todos.forEach((todo) => {
          if (todo.id === id) todo.done = !todo.done
        })
      },
      // 删除一个 todo
      deleteTodo(id) {
        // filter 不改变原数组
        this.todos = this.todos.filter(todo => todo.id !== id)
      },
      // 全选 or 取消全选
      checkAllTodo(done) {
        this.todos.forEach(todo => todo.done = done)
      },
      // 清除所有已经完成的 todo
      clearAllTodo() {
        this.todos = this.todos.filter(todo => !todo.done)
      }
    },
    watch: {
      todos: {
        deep: true,
        handler(value) {
          localStorage.setItem('todos', JSON.stringify(value))
        }
      }
    }
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132307554.png)

## 浏览器本地存储

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208132251134.png)

### localStorage

- 读的结果不存在时是 null
- 浏览器关闭，数据不会消失
- 数据什么时候会消失
  - 引导了用户点击了删除按钮
  - 用户主动地清空缓存

**LocalStorage的常用API**

```js
// 保存数据到 localStorage
localStorage.setItem('key', 'value');
//只能保存字符串形式，json对象需先转成json字符串
let p = {name:'张三',age:18}
localStorage.setItem('person',JSON.stringify(p))

// 从 localStorage 获取数据
let data = localStorage.getItem('key');

// 从 localStorage 删除保存的数据
localStorage.removeItem('key');

// 从 localStorage 删除所有保存的数据
localStorage.clear();

// 获取某个索引的Key
localStorage.key(index)
```

**具体使用**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>localStorage</title>
</head>

<body>
  <h2>localStorage</h2>
  <button onclick="saveData()">点我保存一个数据</button>
  <button onclick="readData()">点我读取一个数据</button>
  <button onclick="deleteData()">点我删除一个数据</button>
  <button onclick="deleteAllData()">点我清空数据</button>
</body>
<script>
  let p = { name: '张三', age: 18 }

  function saveData() {
    localStorage.setItem('msg', 'hello!')
    localStorage.setItem('msg2', 666)
    localStorage.setItem('person', JSON.stringify(p))
  }
  function readData() {
    console.log(localStorage.getItem('msg2'))
    console.log(localStorage.getItem('msg'))

    const result = localStorage.getItem('person')
    console.log(JSON.parse(result))

    // console.log(localStorage.getItem('msg3'))
  }
  function deleteData() {
    localStorage.removeItem('msg2')
  }
  function deleteAllData() {
    localStorage.clear()
  }
</script>

</html>
```

### SessionStorage

**SessionStorage** 主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据
**SessionStorage的常用API：**

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');
//只能保存字符串形式，json对象需先转成json字符串
let p = {name:'张三',age:18}
sessionStorage.setItem('person',JSON.stringify(p))

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

// 获取某个索引的Key
sessionStorage.key(index)
```

**具体使用**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>sessionStorage</title>
</head>

<body>
  <h2>sessionStorage</h2>
  <button onclick="saveData()">点我保存一个数据</button>
  <button onclick="readData()">点我读取一个数据</button>
  <button onclick="deleteData()">点我删除一个数据</button>
  <button onclick="deleteAllData()">点我清空数据</button>
</body>
<script>
  let p = { name: '张三', age: 18 }

  function saveData() {
    sessionStorage.setItem('msg', 'hello!')
    sessionStorage.setItem('msg2', 666)
    sessionStorage.setItem('person', JSON.stringify(p))
  }
  function readData() {
    console.log(sessionStorage.getItem('msg2'))
    console.log(sessionStorage.getItem('msg'))

    const result = sessionStorage.getItem('person')
    console.log(JSON.parse(result))

    // console.log(sessionStorage.getItem('msg3'))
  }
  function deleteData() {
    sessionStorage.removeItem('msg2')
  }
  function deleteAllData() {
    sessionStorage.clear()
  }
</script>

</html>
```

