<template>
  <div class="container">
    <Category title="美食">
      <img src="../../../网页/web/images/banner.png" alt />
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(g,index) in games" :key="index">{{g}}</li>​
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