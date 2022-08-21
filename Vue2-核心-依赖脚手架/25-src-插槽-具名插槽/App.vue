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