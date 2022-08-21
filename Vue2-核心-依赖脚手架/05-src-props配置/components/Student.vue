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

    // 接收的同时对数据：进行类型限制 + 默认值的指令 + 必要性的限制
    /* props: {
        name: String,
        age: Number,
        sex: String,
      }, */

    /* props: {
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
    }, */
  }
</script>
