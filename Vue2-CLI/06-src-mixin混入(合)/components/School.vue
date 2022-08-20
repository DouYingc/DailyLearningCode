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
    name: 'School',
    data() {
      return {
        name: '金职院',
        address: '浙江金华'
      }
    },

    mixins: [mixin],
  }
</script>
