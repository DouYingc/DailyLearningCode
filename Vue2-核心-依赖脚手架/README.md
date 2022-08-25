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

## TodoList案例

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

		(3).实现交互：从绑定事件开始

- props适用于：

		(1).父组件 ==> 子组件 通信

		(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

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

### TodoList自定义事件

**app.vue对MyHeader.vue**

```vue
<MyHeader @addTodo="addTodo"/>
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
    data() {
      return {
        // 收集用户输入的 title
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
        this.$emit('addTodo', todoObj)
        // 清空输入
        this.title = ''
      }
    }
  }
</script>
```

**app.vue对MyFooter.vue**

```vue
// :todos="todos" 是传的数据，不用改
<MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo"/>  
```

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
    props: ['todos',],
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
          // this.checkAllTodo(value)
          this.$emit('checkAllTodo', value)
        }
      }
    },
    methods: {
      /* checkAll(e) {
        this.checkAllTodo(e.target.checked)
      } */
      clearAll() {
        // this.clearAllTodo()
        this.$emit('clearAllTodo')
      }
    }
  }
</script>
```

### TodoList事件总线

原本是App –> MyList –>MyItem 逐层传递

```js
// 安装全局事件总线
//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})
```

**App.vue**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo" />
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
    },
    mounted() {
      this.$bus.$on('checkTodo', this.checkTodo)
      this.$bus.$on('deleteTodo', this.deleteTodo)
    },
    beforeDestroy(){
      this.$bus.$off('checkTodo')
      this.$bus.$off('deleteTodo')
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
    // 声明接收 App 传递过来的数据
    props: ['todos',]
  }
</script>
```

**MyItem.vue**

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
    props: ['todo',],
    methods: {
      // 勾选 or  取消勾选
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo', id)
      },
      //删除
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          // 通知 App 组件
          // this.deleteTodo(id)
          this.$bus.$emit('deleteTodo', id)
        }
      }
    }
  }
</script>
```

### TodoList消息订阅与发布

#### 删除功能

**App.vue 订阅 Item 发布**

**App.vue**

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
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
      deleteTodo(_, id) {
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
    },
    mounted() {
      this.$bus.$on('checkTodo', this.checkTodo)
      this.pubuId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    },
    beforeDestroy() {
      this.$bus.$off('checkTodo')
      pubsub.unsubscribe(this.pubuId)
    }
  }
</script>
```

**MyItem.vue**

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
  import pubsub from 'pubsub-js'
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo',],
    methods: {
      // 勾选 or  取消勾选
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo', id)
      },
      //删除
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          // 通知 App 组件
          // this.deleteTodo(id)
          // this.$bus.$emit('deleteTodo', id)
          pubsub.publish('deleteTodo', id)
        }
      }
    }
  }
</script>
```

#### TodoList编辑功能

- 新增编辑按钮，点击编辑按钮，变成input框
- 需要修改完后input变回文字，但由于在浏览器中存储了数据，所以刷新还是input，所以需要使用失去焦点事件
- 数据校验输入不能为空
- 点击编辑按钮时，新出现的输入框自动获取焦点

**MyItem.vue**

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props ，v-model 绑定的是传递过来的数据 props 不建议 -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span v-show="!todo.isEdit">{{todo.title}}</span>
      <input
        type="text"
        v-show="todo.isEdit"
        :value="todo.title"
        @blur="handleBlur(todo,$event)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button class="btn btn-edit" v-show="!todo.isEdit" @click="handleEdit(todo)">编辑</button>
  </li>
</template> 

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo',],
    methods: {
      // 勾选 or  取消勾选
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo', id)
      },
      //删除
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          // 通知 App 组件
          // this.deleteTodo(id)
          // this.$bus.$emit('deleteTodo', id)
          pubsub.publish('deleteTodo', id)
        }
      },
      // 编辑
      handleEdit(todo) {
        if (todo.hasOwnProperty('isEdit')) {
          todo.isEdit = true
        } else {
          this.$set(todo, 'isEdit', true)
        }
        this.$nextTick(function () {
          this.$refs.inputTitle.focus()
        })
      },
      // 失去焦点回调（真正执行修改逻辑）
      handleBlur(todo, e) {
        todo.isEdit = false
        if (!e.target.value.trim()) return alert('输入不能为空！')
        this.$bus.$emit('updateTodo', todo.id, e.target.value)
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
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
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
      deleteTodo(_, id) {
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
      },
      // 更新一个 todo
      updateTodo(id, title) {
        this.todos.forEach((todo) => {
          if (todo.id === id) todo.title = title
        })
      }
    },
    watch: {
      todos: {
        deep: true,
        handler(value) {
          localStorage.setItem('todos', JSON.stringify(value))
        }
      }
    },
    mounted() {
      this.$bus.$on('checkTodo', this.checkTodo)
      this.$bus.$on('updateTodo', this.updateTodo)
      this.pubuId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    },
    beforeDestroy() {
      this.$bus.$off('checkTodo')
      this.$bus.$off('updateTodo')
      pubsub.unsubscribe(this.pubuId)
    }
  }
</script>
```

### TodoList过渡与动画

给每件todoThing添加和删除添加动画效果

- 方式一：给todo —>Item
- 方式二：List

**方式一：**

```vue
<template>
  <transition name="todo" appear>
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props ，v-model 绑定的是传递过来的数据 props 不建议 -->
        <!-- <input type="checkbox" v-model="todo.done" /> -->
        <span v-show="!todo.isEdit">{{todo.title}}</span>
        <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo,$event)"
          ref="inputTitle"
        />
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      <button class="btn btn-edit" v-show="!todo.isEdit" @click="handleEdit(todo)">编辑</button>
    </li>
  </transition>
</template> 

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'MyItem',
    // 声明接收 todo 对象
    props: ['todo',],
    methods: {
      // 勾选 or  取消勾选
      handleCheck(id) {
        // 通知 App 组件将对应的 todo 对象的 done 值取反
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo', id)
      },
      //删除
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          // 通知 App 组件
          // this.deleteTodo(id)
          // this.$bus.$emit('deleteTodo', id)
          pubsub.publish('deleteTodo', id)
        }
      },
      // 编辑
      handleEdit(todo) {
        if (todo.hasOwnProperty('isEdit')) {
          todo.isEdit = true
        } else {
          this.$set(todo, 'isEdit', true)
        }
        this.$nextTick(function () {
          this.$refs.inputTitle.focus()
        })
      },
      // 失去焦点回调（真正执行修改逻辑）
      handleBlur(todo, e) {
        todo.isEdit = false
        if (!e.target.value.trim()) return alert('输入不能为空！')
        this.$bus.$emit('updateTodo', todo.id, e.target.value)
      }
    }
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

  li:hover {
    background-color: #ddd;
  }

  li:hover button {
    display: block;
  }

  .todo-enter-active {
    animation: atguigu 0.5s linear;
  }

  .todo-leave-active {
    animation: atguigu 0.5s linear reverse;
  }

  @keyframes atguigu {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>
```

**方式二：List**

```vue
<template>
  <ul class="todo-main">
    <transition-group name="todo" appear>
      <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
    </transition-group>
  </ul>
</template>

<script>
  import MyItem from '../components/MyItem.vue'
  export default {
    name: 'MyList',
    components: { MyItem },
    // 声明接收 App 传递过来的数据
    props: ['todos',]
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

  .todo-enter-active {
    animation: atguigu 0.5s linear;
  }

  .todo-leave-active {
    animation: atguigu 0.5s linear reverse;
  }

  @keyframes atguigu {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>
```

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

## 组件的自定义事件

- 一种组件间通信的方式，适用于：子组件 ===> 父组件

- 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）

- 绑定自定义事件：

  1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

  2. 第二种方式，在父组件中：

     ```js
     <Demo ref="demo"/>
     ......
     mounted(){
        this.$refs.xxx.$on('atguigu',this.test)
     }
     ```

  3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

     触发自定义事件：```this.$emit('atguigu',数据)```		

- 解绑自定义事件```this.$off('atguigu')```

- 组件上也可以绑定原生DOM事件，需要使用```native```修饰符

- 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

### 自定义事件–绑定

**① 基本代码**

**School.vue**

```vue
<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>
</template>

<script>
	export default {
		name:'School',
		props:['getSchoolName'],
		data() {
			return {
				name:'金职院',
				address:'浙江金华',
			}
		},
	}
</script>

<style scoped>
	.school{
		background-color: skyblue;
		padding: 5px;
	}
</style>
```

**Student.vue**

```vue
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'DouYing',
				sex:'男',
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>
```

**App.vue**

```VUE
<template>
	<div class="app">
		<h1>{{msg}}</h1>

		<School/>
		<Student/>
	</div>
</template>

<script>
	import Student from './components/Student'
	import School from './components/School'

	export default {
		name:'App',
		components:{School,Student},
		data() {
			return {
				msg:'你好啊！',
			}
		},
	}
</script>

<style scoped>
	.app{
		background-color: gray;
		padding: 5px;
	}
</style>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208152009095.png)

**② School 组件有个按钮，点击按钮把学校名交给App，即子组件传递给父组件**

**App.vue**

```VUE
<template>
	<div class="app">
       <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName"/>
		<Student/>
	</div>
</template>

<script>

	export default {
		name:'App',
		components:{School,Student},
		methods: {
			getSchoolName(name){
				console.log('App收到了学校名：',name)
			},
		},
	}
</script>
```

**School.vue**

```VUE
<template>
	<div class="school">
		<button @click="sendSchoolName">把学校名给App</button>
	</div>
</template>

<script>
	export default {
		props:['getSchoolName'],
		methods: {
			sendSchoolName(){
				this.getSchoolName(this.name)
			}
		},
	}
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208152011757.png)

**③ 把学生名给App 换一种方式：使用自定义事件**

**自定义绑定事件方式一：v-on / @**

**App.vue**

```vue
<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
    <Student v-on:atguigu="getStudentName" />
  </div>
</template>

<script>
  import School from './components/School.vue'
  import Student from './components/Student.vue'

  export default {
    name: 'App',
    components: { School, Student },
    data() {
      return {
        msg: '你好啊！'
      }
    },
    methods: {
      getSchoolName(name) {
        console.log('App收到了学校名：', name)
      },
      getStudentName(name) {
        console.log('App收到了学生名：', name)
      }
    }
  }
</script>
```

**Student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给App</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        name: 'DouYing',
        sex: '男'
      }
    },
    methods: {
      sendStudentName() {
        // 触发 Student 组件实例上的 atguigu 事件
        this.$emit('atguigu', this.name)
      }
    }
  }
</script>
```

**二者之间的异同点**

- props 和 自定义事件 都需要两个回调
- props给了 School组件一个方法，School组件调用了这个方法
- 自定义事件并没有给 Student 组件什么方法，只是绑定了一个自定义事件，做为自定义事件的回调在使用
- Student 组件触发自定义事件会传参

**自定义绑定事件方式二：$ref**

- 麻烦但灵活性强
- 如：定时器，等五秒后在绑定自定义事件

**app.vue**

在app组件里面，通过app的vc(this.$refs.student)，就可以获取到Student组件的实例对象

```vue
	<div class="app">

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
		<!-- <Student @atguigu="getStudentName" @demo="m1"/> -->

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
		<Student ref="student"/>
	</div>

<script>
	export default {
		// app 挂载完毕时触发mounted
		mounted() { 
          	// this.$refs.student 是 Student组件的实例对象  
          	
          	//这里相当于同时在student上绑定事件，并等待事件触发
          	//$on 当atguigu 被触发的时候 触发回调
			this.$refs.student.$on('atguigu',this.getStudentName) //绑定自定义事件
           	// this.$refs.student.$once('atguigu',this.getStudentName) //绑定自定义事件（一次性） 触发一次后就不能再触发了

			//定时器	触发事件后3秒后再启用getStudentName函数
			setTimeout(()=>{
				this.$refs.student.$on('atguigu',this.getStudentName)},3000)
		
		},
		methods: {
			getSchoolName(name){
				console.log('App收到了学校名：', name)
			}
		},
	}
</script>
```

**触发事件时传递多个参数**

```vue
// 方式一

school.vue
<script>
		methods: {
			sendStudentlName(){
				this.$emit('atguigu',this.name,666,888,900)
			},
		},
</script>

app.vue
<script>
		methods: {
			getStudentName(name,x,y,z){
				console.log('App收到了学生名：',name,x,y,z)
			},
		},
	}
</script>
开发中的方式
// 方式一 :
	把数据包装成一个对象传递过去
school.vue
<script>
		methods: {
			sendStudentlName(){
				this.$emit('atguigu',{})
			},
		},
</script>

// 方式二:
	es6 写法  正常传递，接收
school.vue
<script>
		methods: {
			sendStudentlName(){
				this.$emit('atguigu',this.name,666,888,900)
			},
		},
</script>

app.vue
<script>
		methods: {
           // name 正常结构，其他的参数不管传递多少，整理到params数组上
			getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
			},
		},
	}
</script>
```

### 解绑事件

**Student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给App</button>
    <button @click="unbind">解绑atguigu事件</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        name: 'DouYing',
        sex: '男'
      }
    },
    methods: {
      sendStudentName() {
        // 触发 Student 组件实例上的 atguigu 事件
        this.$emit('atguigu', this.name, 666, 888, 999)
        this.$emit('demo')
      },
      unbind() {
        // this.$off('atguigu') // 解绑一个自定义事件
        // this.$off(['atguigu', 'demo']) // 解绑多个自定义事件
        this.$off() // 解绑所有的自定义事件
      }
    }
  }
</script>
```

**案例：** app在收到Student传入的姓名后，将姓名呈现在页面上

方法一：使用@或v-on

 ```vue
<template>
	<div class="app">
		<h1>{{msg}}，学生姓名是:{{studentName}}</h1>

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
		<Student @atguigu="getStudentName" @demo="m1"/>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		methods: {
			getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			}
		},
	}
</script>
 ```

方法二：使用$ref

```vue
<template>
	<div class="app">
		<h1>{{msg}}，学生姓名是:{{studentName}}</h1>

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
		<Student ref="student"/>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		methods: {
           getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			}
		},
		mounted() {
			this.$refs.student.$on('atguigu',this.getStudentName) //绑定自定义事件
		},
	}
</script>
```

**注意:**

- 不能将 getStudentName 以普通函数的方法写在$on的回调函数中

  因为谁触发了 atguigu 事件，事件当中会掉的this就是谁，所以此时是Student组件的vc


- 可以getStudentName 以箭头函数的方法写在$on的回调函数中，但一般不这么写

  箭头函数没有实例对象，向上查找，找到 mounted 钩子，此时是App

```vue
<script>

	export default {
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		/* methods: {
           getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			}
		},*/ 
		//以下这么写不行
		/*
		mounted() {
			this.$refs.student.$on('atguigu',function(name,...params){
				...
			}) //绑定自定义事件
           	console.log(this) // 此时是this 是Student组件的vc
		},
		*/ 
		//以下这么写可以，但一般没必要
		mounted() {
			this.$refs.student.$on('atguigu',(name,...params)=>) //绑定自定义事件
           	console.log(this) // 此时是this 是Student组件的vc
		},
	}
```

### 组件绑定事件默认不使用内置事件

```vue
// 这么写会被默认当做自定义事件
<Student ref="student" @click="show"/> 

//加上native 原生的，本来的，才会使用到内置事件
<Student ref="student" @click.native="show"/> 
```

## 全局事件总线（GlobalEventBus）

- 一种组件间通信的方式，适用于任意组件间通信
- 安装全局事件总线：

```js
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
}) 
```

- 使用事件总线：

  1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

  ```js
  methods(){
    demo(data){......}
  }
  ......
  mounted() {
    this.$bus.$on('xxxx',this.demo)
  }
  ```

  2. 提供数据：```this.$bus.$emit('xxxx',数据)```


- 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

**理解：**

- 在x这个组件上绑定事件，通过其进行数据中转
- 想获取事件的就向X上绑定事件，想传递数据的就$emit这个事件并携带参数
- 如图中A组件向x绑定demo事件，D通过demo事件向A传递数据666

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208152225399.png)

**实现让所有组件都能看到 组件$bus（即总线）**

放在main.js中的 beforeCreate

**main.js**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    //绑定在Vue的实例对象上才可以让所有组件“看到”
    //$bus = this则是想为$bus绑定一个Vue实例对象，使得$bus可以使用$on，$off，$emit
    Vue.prototype.$bus = this //全局事件总线
  },
})
```

**Student.vue 传给 School 数据**

**School.vue**

```vue
<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'School',
    data() {
      return {
        name: '金职院',
        address: '浙江金华'
      }
    },
    mounted() {
      this.$bus.$on('hello', (data) => {
        console.log('我是School组件，收到了数据', data)
      })
    },
    beforeDestroy() {
      this.$bus.$off('hello')
    }
  }
</script>
```

**Student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给School组件</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        name: 'DouYing',
        sex: '男',
      }
    },
    methods: {
      sendStudentName() {
        this.$bus.$emit('hello', this.name)
      }
    }
  }
</script>
```

## 消息订阅与发布（pubsub）

- 一种组件间通信的方式，适用于任意组件间通信

- 使用步骤：

  1. 安装pubsub：```npm i pubsub-js```
  2. 引入: ```import pubsub from 'pubsub-js'```
  3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

  ```js
  methods(){
    demo(data){......}
  }
  ......
  mounted() {
    this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
  }
  ```

  4. 提供数据：```pubsub.publish('xxx',数据)```
  5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去取消订阅

### 理解

- 谁需要数据谁订阅，谁提供数据谁发布

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208152225400.png)

### 消息订阅与发布的第三方库PubSubJS

使用 PubSubJS

- 在线文档: https://github.com/mroderick/PubSubJS
- 安装插件: `npm i pubsub-js`
- 相关语法
  1. `import PubSub from ‘pubsub-js’` // 引入
  2. `PubSub.subscribe(‘msgName’, functon(msgName, data){ })`
  3. `PubSub.publish(‘msgName’, data)`: 发布消息, 触发订阅的回调函数调用
  4. `PubSub.unsubscribe(token)`: 取消消息的订阅

**具体案例**

- School 组件订阅消息
- Student 发布消息

**School.vue**

```vue
<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'School',
    data() {
      return {
        name: '金职院',
        address: '浙江金华'
      }
    },
    mounted() {
      /* this.$bus.$on('hello', (data) => {
        console.log('我是School组件，收到了数据', data)
      }) */
      this.pubId = pubsub.subscribe('hello', (msgName, data) => {
        console.log(this)
        console.log('有人发布了hello消息，hello消息的回调执行了', msgName, data)
      })
    },
    beforeDestroy() {
      // this.$bus.$off('hello')
      pubsub.unsubscribe(this.pubId)
    }
  }
</script>
```

**Student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给School组件</button>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'Student',
    data() {
      return {
        name: 'DouYing',
        sex: '男',
      }
    },
    methods: {
      sendStudentName() {
        // this.$bus.$emit('hello', this.name)
        pubsub.publish('hello', 666)
      }
    }
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208152239959.png)

## nextTick

- 语法：```this.$nextTick(回调函数)```
- 作用：在下一次 DOM 更新结束后执行其指定的回调
- 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## 过渡与动画

- 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。
- 图示：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201454049.png)



- 写法：
  - 准备好样式：
  - 元素进入的样式：
    1. v-enter：进入的起点
    2. v-enter-active：进入过程中
    3. v-enter-to：进入的终点
  - 元素离开的样式：
    1. v-leave：离开的起点
    2. v-leave-active：离开过程中
    3. v-leave-to：离开的终点
- 使用```<transition>```包裹要过度的元素，并配置name属性：

```vue
<transition name="hello">
	<h1 v-show="isShow">你好啊！</h1>
</transition>
```

- 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值

### 动画

- 让谁有动画的效果就用transition标签给包裹起来
- template 中所实现的名字是固定
  - 三个样式的类名
  - v-enter 进入的起点 反之对应 v-leave 离开的起点
  - v-enter-active 进入过程中 反之对应 v-leave-active 离开过程中
    - enter进入时的动画 active激活 进入时要激活的样式
    - leave离开 离开时要激活的样式
- v-enter -to 进入的终点 反之对应 v-leave-to 离开的终点
- v 可以替换成过度时的名字
- template 加上appear属性可以使得页面在渲染时就直接呈现动画效果

**app.vue**

```vue
<template>
  <div>
    <Test />
  </div>
</template>

<script>
  import Test from './components/Test.vue'


  export default {
    name: 'App',
    components: { Test },

  }
</script>
```

**test.vue**

动画效果页面左边缘向右出现出现，向左离开

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好啊！</h1>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        isShow: true
      }
    }
  }
</script>

<style scoped>
  h1 {
    background-color: orange;
  }
  /* css3知识 */
  /* 使用动画 两个样式的类名  linear 匀速 reverse 反转*/
  .hello-enter-active {
    animation: atguigu 1s;
  }

  .hello-leave-active {
    animation: atguigu 1s reverse;
  }
  /* 动画定义一个关键帧  名字可以随意 */
  @keyframes atguigu {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>
```

### 过渡

实现效果类同动画（0到100%）

**test2.vue —> test.vue 的效果**

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好啊！</h1>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        isShow: true
      }
    }
  }
</script>

<style scoped>
  h1 {
    background-color: orange;
  }

  /* 进入的起点、离开的终点*/
  .hello-enter,
  .hello-leave-to {
    transform: translateX(-100%);
  }

  .hello-enter-active,
  .hello-leave-active {
    transition: 0.5s linear;
  }

  /* 进入的终点、离开的起点 */
  .hello-enter-to,
  .hello-leave {
    transform: translateX(0);
  }
</style>
```

### 多个元素同样的过度效果

**错误写法一：**

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好啊！</h1>
      <h1 v-show="isShow">我很好！谢谢！</h1>
    </transition>
  </div>
</template>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201440759.png)

**错误写法二：**

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="hello" appear>
      <h1 v-show="isShow">你好啊！</h1>
      <h1 v-show="isShow">我很好！谢谢！</h1>
    </transition-group>
  </div>
</template>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201441625.png)

**正确方式一：**

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="hello" appear>
      <h1 v-show="isShow" key="1">你好啊！</h1>
      <h1 v-show="isShow" key="2">我很好！谢谢！</h1>
    </transition-group>
  </div>
</template>
```

**正确方式二：**

使用transition标签，使用div标签把两个h1标签包裹起来 但是两个展示效果不能互斥，互斥无法实现，互斥只能使用 transition-group 显示取反

```vue
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition 过度 appear 呈现  hello 过度时起的名字-->
		<!-- 真是列表中使用 v-for 生成 key 值--> 
		<transition-group name="hello" appear>
           <div>
               <h1 v-show="isShow" key="1">你好啊！</h1>
				<h1 v-show="isShow" key="2">我很好谢谢！</h1>
   		</div>
		</transition-group >
	</div>
</template>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201443415.png)

### 集成第三方动画

[npm-animate库链接](https://www.npmjs.com/package/animate.css)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201445329.png)

**使用**

- 安装 npm install animate.css
- 引入 import ‘animate.css’ 样式

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- transition 过度 appear 呈现  hello 过度时起的名字-->
    <!-- 真是列表中使用 v-for 生成 key 值-->
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="!isShow" key="1">你好啊！</h1>
      <h1 v-show="isShow" key="2">我很好！谢谢！</h1>
    </transition-group>
  </div>
</template>
```

## vue脚手架配置代理

可以用来解决跨域的问题

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208201555034.png)

>ajax 是前端技术，你得有浏览器，才有window对象，才有xhr，才能发ajax请求，服务器之间通信就用传统的http请求就行了

**方法一**

- 优点：配置简单，请求资源时直接发给前端（8080）即可
- 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
- 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

在vue.config.js中添加如下配置：

```js
// 开启代理服务器
  devServer: {
    proxy: "http://localhost:5000"
  }
```

**方法二**

- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
- 缺点：配置略微繁琐，请求资源时必须加前缀。

 编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}//代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

## GitHub用户搜索案例

可以使用axios，也可以使用vue-resource（推荐axios，因为vue-resource维护更新的不是那么频繁了）

**main.js**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入插件
import vueResource from 'vue-resource'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
```

**App.vue**

```vue
<template>
  <div class="container">
    <Search />
    <List />
  </div>
</template>

<script>
  import Search from './components/Search.vue'
  import List from './components/List.vue'
  export default {
    name: 'App',
    components: { Search, List }
  }
</script>

```

**Search.vue**

```vue
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">搜索Github用户</h3>
    <div>
      <input type="text" placeholder="输入您搜索的名称" v-model="keyWord" />&nbsp;
      <button @click="searchUsers">搜索</button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Search',
    data() {
      return {
        keyWord: ''
      }
    },
    methods: {
      searchUsers() {
        // 请求前更新 List 的数据
        this.$bus.$emit('updateListData', { isFirst: false, isLoading: true, errMsg: '', users: [] })
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            console.log('请求成功了')
            // 请求成功后更新 List 的数据
            this.$bus.$emit('updateListData', { isLoading: false, errMsg: '', users: response.data.items })
          },
          error => {
            console.log('请求失败了')
            // 请求失败后更新 List 的数据
            this.$bus.$emit('updateListData', { isLoading: false, errMsg: error.message, users: [] })
          }
        )
      }
    }
  }
</script>
```

**List.vue**

```vue

```

## slot插槽

- 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。
- 分类：默认插槽、具名插槽、作用域插槽

### 默认插槽

**App.vue**

```vue
<template>
  <div class="container">
    <Category title="美食">
      <img src="../../../网页/web/images/banner.png" alt />
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(g,index) in games" :key="index">{{g}}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video src="../../../网页/web/video/Barcelona-video.mp4" controls></video>
    </Category>
  </div>
</template>

<script>
  import Category from './components/Category.vue'

  export default {
    name: 'App',
    components: { Category },
    data() {
      return {
        foods: ['火锅', '烧烤', '小龙虾', '牛排'],
        games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
        films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
```

**Category.vue**

```vue
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title']
  }
</script>

<style scoped>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }

  h3 {
    text-align: center;
    background-color: orange;
  }

  video {
    width: 100%;
  }

  img {
    width: 100%;
  }
</style>
```

### 具名插槽

**App.vue**

```vue
<template>
  <div class="container">
    <Category title="美食">
      <img slot="center" src="../../../网页/web/images/banner.png" alt />

      <div class="foot" slot="footer">
        <a slot="footer" href="http://www.douyingc.cn">更多美食</a>
      </div>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(g,index) in games" :key="index">{{g}}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="http://www.douyingc.cn">单机游戏</a>
        <a href="http://www.douyingc.cn">网络游戏</a>
      </div>
    </Category>
    <Category title="电影">
      <video slot="center" src="../../../网页/web/video/Barcelona-video.mp4" controls></video>
      <template v-slot:footer>
        <!-- <template slot="footer"> -->
        <div class="foot">
          <a href="http://www.douyingc.cn">经典</a>
          <a href="http://www.douyingc.cn">热门</a>
          <a href="http://www.douyingc.cn">推荐</a>
        </div>
        <h4>欢迎前来观看！</h4>
      </template>
    </Category>
  </div>
</template>

<script>
  import Category from './components/Category.vue'

  export default {
    name: 'App',
    components: { Category },
    data() {
      return {
        foods: ['火锅', '烧烤', '小龙虾', '牛排'],
        games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
        films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
      }
    }
  }
</script>

<style scoped>
  .container,
  .foot {
    display: flex;
    justify-content: space-around;
  }

  h4 {
    text-align: center;
  }
</style>
```

**Category.vue**

```vue
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot name="center">我是默认值，当没有具体结构 传递时，我会出现</slot>
    <slot name="footer">我是默认值，当没有具体结构 传递时，我会出现</slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title']
  }
</script>

<style scoped>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }

  h3 {
    text-align: center;
    background-color: orange;
  }

  video {
    width: 100%;
  }

  img {
    width: 100%;
  }
</style>
```

### 作用域插槽

- 理解：数据在组件的自身（子组件），但根据数据生成的结构需要组件的使用者（父组件）来决定。（games数据在Category（子）组件中，但使用数据所遍历出来的结构由App（父）组件决定）

**App.vue**

```vue
<template>
  <div class="container">
    <Category title="游戏">
      <template scope="atguigu">
        <ul>
          <li v-for="(g,index) in atguigu.games" :key="index">{{g}}</li>
        </ul>
      </template>
    </Category>

    <Category title="游戏">
      <!-- {games} ES6的解构赋值 -->
      <template scope="{games}">
        <ol>
          <li style="color: red" v-for="(g,index) in games" :key="index">{{g}}</li>
        </ol>
      </template>
    </Category>

    <Category title="游戏">
      <!-- ES6的解构赋值 -->
      <template slot-scope="{games}">
        <h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
      </template>
    </Category>
  </div>
</template>

<script>
  import Category from './components/Category.vue'

  export default {
    name: 'App',
    components: { Category },
  }
</script>

<style scoped>
  .container,
  .foot {
    display: flex;
    justify-content: space-around;
  }

  h4 {
    text-align: center;
  }
</style>
```

**Category.vue**

```vue
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot :games="games">我是默认值，当没有具体结构传递时，我会出现</slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title'],
    data() {
      return {
        games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
      }
    }
  }
</script>

<style scoped>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }

  h3 {
    text-align: center;
    background-color: orange;
  }

  video {
    width: 100%;
  }

  img {
    width: 100%;
  }
</style>
```

## Vuex

### 理解Vuex

**概念**

 在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

[Vuex GitHub地址](https://github.com/vuejs/vuex)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208212031825.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208212036648.png)

**何时使用Vuex**

- 多个组件依赖于同一状态
- 来自不同组件的行为需要变更同一状态

**Vuex工作原理图**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208212018414.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208222100965.png)

### 求和案例-纯Vue编写

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208212049768.png)

**App.vue**

```vue
<template>
  <div>
    <Count />
  </div>
</template>

<script>
  import Count from './components/Count.vue'

  export default {
    name: 'App',
    components: { Count },
  }
</script>
```

**Count.vue**

```vue
<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        n: 1, // 用户悬着的数字
        sum: 0, // 当前的和
      }
    },
    methods: {
      increment() {
        this.sum += this.n
      },
      decrement() {
        this.sum -= this.n
      },
      incrementOdd() {
        if (this.sum % 2) {
          this.sum += this.n
        }
      },
      incrementWait() {
        setTimeout(() => {
          this.sum += this.n
        }, 500)
      }
    }
  }
</script>

<style lang="css">
  button {
    margin-left: 5px;
  }
</style>
```

### 搭建Vuex环境

**安装**

`npm i vuex@3` vue2如果需要使用Vuex的话，需要安装Vuex 3版本

而默认`npm i vuex`是安装Vuex 4版本

**引入**

创建 `src/store/index.js`(**推荐**)也可以 `src/Vuex/store.js`

```js
// 该文件用于创建 Vuex 中最为核心的 store

// 引入 Vue 核心库
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

// 准备actions————用于响应组建中的动作
const actions = {}
// 准备mutations————用于操作数据（state）
const mutations = {}
// 准备state————用于存储数据
const state = {}

// 创建并暴露（导出） store
export default new Vuex.Store({
  actions,
  mutations,
  state,
})
```

在 `main.js` 中创建vm时传入 `store` 配置项

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入插件
import vueResource from 'vue-resource'
// 引入 store
import store from './store/index'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  store, // 对象的简写形式
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
```

### 基本使用

- 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

  ```js
  //引入Vue核心库
  import Vue from 'vue'
  //引入Vuex
  import Vuex from 'vuex'
  //引用Vuex
  Vue.use(Vuex)

  const actions = {
      //响应组件中加的动作
  	jia(context,value){
  		// console.log('actions中的jia被调用了',miniStore,value)
  		context.commit('JIA',value)
  	},
  }

  const mutations = {
      //执行加
  	JIA(state,value){
  		// console.log('mutations中的JIA被调用了',state,value)
  		state.sum += value
  	}
  }

  //初始化数据
  const state = {
     sum:0
  }

  //创建并暴露store
  export default new Vuex.Store({
  	actions,
  	mutations,
  	state,
  })
  ```

- 组件中读取vuex中的数据：`$store.state.sum`

- 组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)`或 `$store.commit('mutations中的方法名',数据)`

> 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编写`commit`



### 求和案例-Vuex版

**index.js**

```js
// 该文件用于创建 Vuex 中最为核心的 store

// 引入 Vue 核心库
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

// 准备actions————用于响应组建中的动作
const actions = {
  /* jia(context, value) {
    context.commit('JIA', value)
  },
  jian(context, value) {
    context.commit('JIAN', value)
  }, */
  jiaOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit('JIA', value)
    }
  },
  jiaWait(context, value) {
    setTimeout(() => {
      context.commit('JIA', value)
    }, 500)
  },
}
// 准备mutations————用于操作数据（state）
const mutations = {
  JIA(state, value) {
    state.sum += value
  },
  JIAN(state, value) {
    state.sum -= value
  }
}
// 准备state————用于存储数据
const state = {
  sum: 0, // 当前的和
}

// 创建并暴露（导出） store
export default new Vuex.Store({
  actions,
  mutations,
  state,
})
```

**Count.vue**

```vue
<template>
  <div>
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        n: 1, // 用户悬着的数字

      }
    },
    methods: {
      increment() {
        this.$store.commit('JIA', this.n)
      },
      decrement() {
        this.$store.commit('JIAN', this.n)
      },
      incrementOdd() {
        this.$store.dispatch('jiaOdd', this.n)
      },
      incrementWait() {
        this.$store.dispatch('jiaWait', this.n)
      }
    }
  }
</script>

<style lang="css">
  button {
    margin-left: 5px;
  }
</style>
```

### getters的使用

- 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

- 在```store.js```中追加```getters```配置

  ```js
  ......

  const getters = {
  	bigSum(state){
  		return state.sum * 10
  	}
  }

  //创建并暴露store
  export default new Vuex.Store({
  	......
  	getters
  })
  ```


- 组件中读取数据：```$store.getters.bigSum```

**案例**

**index.js**

```js
......
// 准备getters————用于将 state 中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}
.....
```

**Count.vue**

```vue
......
<h2>当前求和放大10倍为：{{$store.getters.bigSum}}</h2>
......
```

### 四个map方法的使用

**导入**

```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' 
```

- **mapState方法：**用于帮助我们映射```state```中的数据为计算属性

  ```js
  computed: {
      //借助mapState生成计算属性：sum、school、subject（对象写法）
       ...mapState({sum:'sum',school:'school',subject:'subject'}),
           
      //借助mapState生成计算属性：sum、school、subject（数组写法）
      ...mapState(['sum','school','subject']),
  },
  ```

- **mapGetters方法：**用于帮助我们映射```getters```中的数据为计算属性

  ```js
  computed: {
      //借助mapGetters生成计算属性：bigSum（对象写法）
      ...mapGetters({bigSum:'bigSum'}),

      //借助mapGetters生成计算属性：bigSum（数组写法）
      ...mapGetters(['bigSum'])
  },
  ```

- **mapActions方法：**用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

  ```js
  methods:{
      //靠mapActions生成：incrementOdd、incrementWait（对象形式）
      ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

      //靠mapActions生成：incrementOdd、incrementWait（数组形式）
      ...mapActions(['jiaOdd','jiaWait'])
  }
  ```

- **mapMutations方法：**用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

  ```js
  methods:{
      //靠mapActions生成：increment、decrement（对象形式）
      ...mapMutations({increment:'JIA',decrement:'JIAN'}),
      
      //靠mapMutations生成：JIA、JIAN（对象形式）
      ...mapMutations(['JIA','JIAN']),
  }
  ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象

### 模块化+命名空间

- 目的：让代码更好维护，让多种数据分类更加明确
- 修改```store.js```

```javascript
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

- 开启命名空间后，组件中读取state数据：

```js
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

- 开启命名空间后，组件中读取getters数据：

```js
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

- 开启命名空间后，组件中调用dispatch

```js
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

- 开启命名空间后，组件中调用commit

```js
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

## 路由

### 相关理解

**vue-router 的理解**

- vue的一个插件库，专门用来实现SPA应用

**对SPA应用的理解**

- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面
- 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
- 数据需要通过ajax请求获取

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208242035496.png)

**路由的理解**

- 理解：一个路由（route）就是一组映射关系（key－value），多个路由需要路由器（router）进行管理
- 前端路由：key是路径，value可能是 function 或 component

**路由分类**

- 后端路由
  1. 理解：value是function，用于处理客户端提交的请求
  2. 工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据


- 前端路由
  1. 理解：value是component，用于展示页面内容
  2. 工作过程：当浏览器的路径改变时，对应的组件就会显示

### 基本使用

**安装vue-router**

```npm
npm i vue-router@3
```

>Vue2对应router3，Vue3对应router4
>
>例-vue2安装vue-router：`npm i vue-router@3`

**应用插件**

- **main.js**

```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

**编写router配置项**

- **src/router/index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About.vue'
import Home from '../components/Home.vue'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
  ]
})
```

- **main.js**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入 VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 应用插件
Vue.use(VueRouter)


// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
```

**实现切换（active-class可配置高亮样式）**

```vue
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
```

**指定展示位置**

```vue
<!-- 指定组件的呈现位置 -->
<router-view></router-view>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208242113988.png)

**App.vue**

```vue
<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Vue Router Demo</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 原始 html 中我们使用 a 标签实现页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a> -->
          <!-- <a class="list-group-item" href="./home.html">Home</a> -->

          <!-- Vue 中借助 router-link 标签实现路由的切换 -->
          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>
```

**Home.vue**

```vue
<template>
  <h2>我是Home的内容</h2>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
```

**About.vue**

```vue
<template>
  <h2>我是About的内容</h2>
</template>

<script>
  export default {
    name: 'About'
  }
</script>
```

### 几个注意点

- 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹
- 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载
- 每个组件都有自己的`$route`属性，里面存储着自己的路由信息
- 整个应用只有一个`router`，可以通过组件的`$router`属性获取到

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
  ]
})
```

**Banner.vue**

```vue
<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router Demo</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner'
  }
</script>
```

**App.vue**

```vue
<template>
  <div>
    <div class="row">
      <Banner />
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 原始 html 中我们使用 a 标签实现页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a> -->
          <!-- <a class="list-group-item" href="./home.html">Home</a> -->

          <!-- Vue 中借助 router-link 标签实现路由的切换 -->
          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from './components/Banner.vue'
  export default {
    name: 'App',
    components: { Banner }
  }
</script>
```

### 嵌套路由（多级路由）

**配置路由规则，使用`children`配置项**

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
        },
      ]
    },
  ]
})
```

**跳转（要写完整路径）**

```vue
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
```

**指定展示位置**

```vue
<!-- 指定组件的呈现位置 -->
<router-view></router-view>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208242145818.png)

**Home.vue**

```vue
<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
```

**News.vue**

```vue
<template>
  <ul>
    <li>news001</li>
    <li>news002</li>
    <li>news003</li>
  </ul>
</template>

<script>
  export default {
    name: 'News'
  }
</script>
```

**Message.vue**

```vue
<template>
  <ul>
    <li>
      <a href="/message1">message001</a>&nbsp;&nbsp;
    </li>
    <li>
      <a href="/message2">message002</a>&nbsp;&nbsp;
    </li>
    <li>
      <a href="/message/3">message003</a>&nbsp;&nbsp;
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Message'
  }
</script>
```

### 路由的query参数

**传递参数**

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
				
<!-- 跳转并携带query参数，to的对象写法 -->
<router-link 
	:to="{
		path:'/home/message/detail',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```

**接收参数**

```js
$route.query.id
$route.query.title
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208242218394.png)

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              path: 'detail',
              component: Detail,
            }
          ]
        },
      ]
    },
  ]
})
```

**Message.vue**

```vue
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 query 参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

        <!-- 跳转路由并携带 query 参数，to的对象写法 -->
        <router-link
          :to="{
          path:'/home/message/detail',
          query:{
            id:m.id,
            title:m.title
          }
        }"
        >{{m.title}}</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageList: [
          { id: '001', title: '消息001' },
          { id: '002', title: '消息002' },
          { id: '003', title: '消息003' }
        ]
      }
    },
  }
</script>
```

**Detail.vue**

```vue
<template>
  <ul>
    <li>消息编号：{{$route.query.id}}</li>
    <li>消息标题：{{$route.query.title}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Detail',
    mounted() {
      console.log(this.$route)
    }
  }
</script>
```

### 命名路由

- 作用：可以简化路由的跳转

- 如何使用

  1. 给路由命名 

     ```js
     {
     	path:'/demo',
     	component:Demo,
     	children:[
     		{
     			path:'test',
     			component:Test,
     			children:[
     				{
               name:'hello' // 给路由命名
     					path:'welcome',
     					component:Hello,
     				}
     			]
     		}
     	]
     }
     ```

  2. 简化跳转

     ```vue
     <!--简化前，需要写完整的路径 -->
     <router-link to="/demo/test/welcome">跳转</router-link>

     <!--简化后，直接通过名字跳转 -->
     <router-link :to="{name:'hello'}">跳转</router-link>

     <!--简化写法配合传递参数 -->
     <router-link 
     	:to="{
     		name:'hello',
     		query:{
     		    id:666,
             title:'你好'
     		}
     	}"
     >跳转</router-link>
     ```

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: Detail,
            }
          ]
        },
      ]
    },
  ]
})
```

**Message.vue**

```vue
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 query 参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

        <!-- 跳转路由并携带 query 参数，to的对象写法 -->
        <router-link
          :to="{
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
          }
        }"
        >{{m.title}}</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageList: [
          { id: '001', title: '消息001' },
          { id: '002', title: '消息002' },
          { id: '003', title: '消息003' }
        ]
      }
    },
  }
</script>
```

### 路由的params参数

**配置路由，声明接收`params`参数**

```js
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', // 🔴使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

**传递参数**

```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
				
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```

>特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置

**接收参数**

```js
$route.params.id
$route.params.title
```

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'xiangqing',
              path: 'detail/:id/:title',
              component: Detail,
            }
          ]
        },
      ]
    },
  ]
})
```

**Message.vue**

```vue
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 params 参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带 params 参数，to的对象写法 -->
        <router-link
          :to="{
          name:'xiangqing',
          params:{
            id:m.id,
            title:m.title
          }
        }"
        >{{m.title}}</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageList: [
          { id: '001', title: '消息001' },
          { id: '002', title: '消息002' },
          { id: '003', title: '消息003' }
        ]
      }
    },
  }
</script>
```

**Detail.vue**

```vue
<template>
  <ul>
    <li>消息编号：{{$route.params.id}}</li>
    <li>消息标题：{{$route.params.title}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Detail',
    mounted() {
      console.log(this.$route)
    }
  }
</script>
```

### 路由的props配置

- 作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route) {
		return {
		  id: $route.query.id,
		  title:$route.query.title,
		  a: 1,
		  b: 'hello'
		}
	}
}
```

>方便在要跳转去的组件里更简便的写法

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: Detail,

              // props 的第一种写法，值为对象，该对象中的所有 key-value 都会以 props 的形式传给 Detail 组件
              // props: { a: 1, b: 'hello' }

              // props 的第一种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有 params 参数，以 props 的形式传给 Detail 组件
              // props: true

              // props 的第一种写法，值为函数，
              props({ $route }) {
                return { id: $route.query.id, title: $route.query.title }
              }
            }
          ]
        },
      ]
    },
  ]
})
```

**Message.vue**

```vue
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 params 参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带 params 参数，to的对象写法 -->
        <router-link
          :to="{
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
          }
        }"
        >{{m.title}}</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageList: [
          { id: '001', title: '消息001' },
          { id: '002', title: '消息002' },
          { id: '003', title: '消息003' }
        ]
      }
    },
  }
</script>
```

**Detail.vue**

```vue
<template>
  <ul>
    <li>消息编号：{{id}}</li>
    <li>消息标题：{{title}}</li>
    <!-- <li>a:{{a}}</li> -->
    <!-- <li>b:{{b}}</li> -->
  </ul>
</template>

<script>
  export default {
    name: 'Detail',
    props: ['id', 'title',],
    /* computed: {
      id() {
        return this.$route.query.id
      },
      title() {
        return this.$route.query.title
      },
    } */
  }
</script>
```

### router-link的replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式
- 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录，路由跳转时候默认为```push```
- 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

**Home.vue**

```vue
<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link replace class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link
            replace
            class="list-group-item"
            active-class="active"
            to="/home/message"
          >Message</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
```

### 编程式路由导航

- 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活
  1. `this.$router.push({})`内传的对象与   `<router-link>`中的to相同
  2. `this.$router.replace({})`
  3. `this.$router.forward()`前进
  4. `this.$router.back()`后退
  5. `this.$router.go(n)`可前进也可后退，n为正数前进n，为负数后退

```js
this.$router.push({
	name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})

this.$router.replace({
	name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208242335710.png)

**Banner.vue**

```vue
<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router Demo</h2>
      <button @click="back">后退</button>
      <button @click="forward">前进</button>
      <button @click="test">测试一下go</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    methods: {
      back() {
        this.$router.back()
      },
      forward() {
        this.$router.forward()
      },
      test() {
        this.$router.go(3)
      }
    }
  }
</script>
```

**Message.vue**

```vue
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 params 参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带 params 参数，to的对象写法 -->
        <router-link
          :to="{
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
          }
        }"
        >{{m.title}}</router-link>
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageList: [
          { id: '001', title: '消息001' },
          { id: '002', title: '消息002' },
          { id: '003', title: '消息003' }
        ]
      }
    },
    methods: {
      pushShow(m) {
        this.$router.push({
          name: 'xiangqing',
          query: {
            id: m.id,
            title: m.title
          }
        })
      },
      replaceShow(m) {
        this.$router.replace({
          name: 'xiangqing',
          query: {
            id: m.id,
            title: m.title
          }
        })
      }
    }
  }
</script>
```

### 缓存路由组件

- 作用：让不展示的路由组件保持挂载，不被销毁
- include 指的是组件名

```vue
<keep-alive include="News"> 
    <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子

作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
具体名字：

- `activated`路由组件被激活时触发
- `deactivated`路由组件失活时触发

> 这两个生命周期钩子需要配合前面的缓存路由组件使用（没有缓存路由组件不起效果）

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208252026541.png)

**News.vue**

```vue
<template>
  <ul>
    <li :style="{opacity}">欢迎学习Vue</li>
    <li>
      news001
      <input type="text" />
    </li>
    <li>
      news002
      <input type="text" />
    </li>
    <li>
      news003
      <input type="text" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        opacity: 1
      }
    },
    /* beforeDestroy() {
      console.log('New组件将被销毁')
      clearInterval(this.timer)
    }, */
    /* mounted() {
      this.timer = setInterval(() => {
        this.opacity -= 0.01
        if (this.opacity <= 0) this.opacity = 1
      }, 16)
    }, */
    activated() {
      console.log('News组件被激活了')
      this.timer = setInterval(() => {
        this.opacity -= 0.01
        if (this.opacity <= 0) this.opacity = 1
      }, 16)
    },
    deactivated() {
      console.log('News组件失活了')
      clearInterval(this.timer)
    }
  }
</script>
```

### 路由守卫

- 作用：对路由进行权限控制
- 分类：全局守卫、独享守卫、组件内守卫

**全局守卫**

```js
// 全局前置守卫：初始化时、每次路由切换前执行
router.beforeEach((to,from,next) => {
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ // 判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){ // 权限控制的具体规则
			next()	// 放行
		}else{
			alert('暂无权限查看')
		}
	}else{
		next()	// 放行
	}
})

// 全局后置守卫：初始化时、每次路由切换后执行
router.afterEach((to,from) => {
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

**独享守卫**

```js
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
    if(localStorage.getItem('school') === 'atguigu'){
        next()
    }else{
        alert('暂无权限查看')
    }
}
```

**组件内守卫**

````vue
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {... next()},

//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {... next()},
````

#### 全局路由守卫

**index.js**

````js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      meta: { title: '关于' }
    },
    {
      name: 'zhuye',
      path: '/home',
      component: Home,
      meta: { title: '主页' },
      children: [
        {
          name: 'xinwen',
          path: 'news',
          component: News,
          meta: { isAuth: true, title: '新闻' }
        },
        {
          name: 'xiaoxi',
          path: 'message',
          component: Message,
          meta: { isAuth: true, title: '消息' },
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: Detail,
              meta: { isAuth: true, title: '详情' },

              // props 的第一种写法，值为对象，该对象中的所有 key-value 都会以 props 的形式传给 Detail 组件
              // props: { a: 1, b: 'hello' }

              // props 的第一种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有 params 参数，以 props 的形式传给 Detail 组件
              // props: true

              // props 的第一种写法，值为函数，
              props($route) {
                return { id: $route.query.id, title: $route.query.title }
              }
            }
          ]
        },
      ]
    },
  ]
})

// 全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  console.log('前置路由守卫', to, from)
  if (to.meta.isAuth) { // 判断是否需要鉴权
    if (localStorage.getItem('school') === 'atguigu') {
      next()
    } else {
      alert('学校名不对，无权限查看！')
    }
  } else {
    next()
  }
})

// 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log('后置路由守卫', to, from)
  document.title = to.meta.title || '硅谷系统'
})

export default router
````

#### 独享路由守卫

**index.js**

```js
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      meta: { title: '关于' }
    },
    {
      name: 'zhuye',
      path: '/home',
      component: Home,
      meta: { title: '主页' },
      children: [
        {
          name: 'xinwen',
          path: 'news',
          component: News,
          meta: { isAuth: true, title: '新闻' },
          beforeEnter: (to, from, next) => {
            console.log('前置路由守卫', to, from)
            if (to.meta.isAuth) { // 判断是否需要鉴权
              if (localStorage.getItem('school') === 'atguigu') {
                next()
              } else {
                alert('学校名不对，无权限查看！')
              }
            } else {
              next()
            }
          },
        },
        {
          name: 'xiaoxi',
          path: 'message',
          component: Message,
          meta: { isAuth: true, title: '消息' },
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: Detail,
              meta: { isAuth: true, title: '详情' },

              // props 的第一种写法，值为对象，该对象中的所有 key-value 都会以 props 的形式传给 Detail 组件
              // props: { a: 1, b: 'hello' }

              // props 的第一种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有 params 参数，以 props 的形式传给 Detail 组件
              // props: true

              // props 的第一种写法，值为函数，
              props($route) {
                return { id: $route.query.id, title: $route.query.title }
              }
            }
          ]
        },
      ]
    },
  ]
})

// 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log('后置路由守卫', to, from)
  document.title = to.meta.title || '硅谷系统'
})

export default router
```

#### 组件内路由守卫

**About.vue**

```vue
<template>
  <h2>我是About的内容</h2>
</template>

<script>
  export default {
    name: 'About',
    /* mounted() {
      console.log(this.$route)
    } */

    // 通过路由规则，进入该组件时会被调用
    beforeRouteEnter(to, from, next) {
      console.log('About---beforeRouteEnter', to, from)
      if (to.meta.isAuth) { // 判断是否需要鉴权
        if (localStorage.getItem('school') === 'atguigu') {
          next()
        } else {
          alert('学校名不对，无权限查看！')
        }
      } else {
        next()
      }
    },

    // 通过路由规则，离开该组件时会被调用
    beforeRouteLeave(to, from, next) {
      console.log('About---beforeRouteLeave', to, from)
      next()
    }
  }
</script>
```

### 路由器的两种工作模式

- 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值
- hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器
- hash模式：
  1. 地址中永远带着#号，不美观 
  2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
  3. 兼容性较好
- history模式：
  1. 地址干净，美观 
  2. 兼容性和hash模式相比略差
  3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题

```js
const router =  new VueRouter({
	mode:'history',
	routes:[...]
})

export default router
```

## Vue UI 组件库

### 常用UI组件库

**移动端常用UI组件库**

- [Vant](https://youzan.github.io/vant)
- [Cube UI](https://didi.github.io/cube-ui)
- [Mint UI](http://mint-ui.github.io/)
- [NutUI](https://nutui.jd.com/#/)

**PC端常用UI组件库**

- [Element UI](https://element.eleme.cn/)
- [IView UI](https://www.iviewui.com/)

### element-ui基本使用

安装 element-ui：`npm i element-ui -S`

**main.js**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入 ElementUI 组件库
import ElementUI from 'element-ui'
// 引入 ElementUI 全部样式
import 'element-ui/lib/theme-chalk/index.css'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 应用 EementUI
Vue.use(ElementUI)

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
})
```

**App.vue**

```vue
<template>
  <div>
    <button>原生按钮</button>
    <input type="text" />
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
  </div>
</template> 

<script>
  export default {
    name: 'App',
  }
</script>
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208252234563.png)

### element-ui按需引入

- 安装 babel-plugin-component `npm i babel-plugin-component -D` 
- 修改 babel-config-js

**修改`babel-config-js`**

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

**main.js**

```js
// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'

// 完整引入
// 引入 ElementUI 组件库
// import ElementUI from 'element-ui'
// 引入 ElementUI 全部样式
// import 'element-ui/lib/theme-chalk/index.css'

// 按需引用
import { Button, Row, DatePicker } from 'element-ui'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 应用 EementUI
// Vue.use(ElementUI)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(DatePicker.name, DatePicker)

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
})
```

