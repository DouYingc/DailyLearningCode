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