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