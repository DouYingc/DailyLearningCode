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
