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

