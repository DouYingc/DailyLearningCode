<template>
  <div>
    <student name="李四" sex="女" :age="18" />
  </div>
</template>

<script>

  // 引入 Student 组件
  import Student from './components/Student.vue'
  console.log(this)
  export default {
    name: 'App',
    components: { Student },
  }
</script>
