<template>
  <div>
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <h2>当前求和放大10倍为：{{$store.getters.bigSum}}</h2>
    <h2>我在{{$store.state.school}}，学习{{$store.state.subject}}</h2>
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
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'Count',
    data() {
      return {
        n: 1, // 用户选择的数字

      }
    },
    computed: {
      // 靠程序员自己亲自去写计算属性

      // 借助 mapState 生成计算属性，从 state 中读取数据（对象写法）
      // ...mapState({ sum: 'sum', school: 'school', subject: 'subject' }),

      // 借助 mapState 生成计算属性，从 state 中读取数据（数组写法）
      ...mapState(['sum', 'school', 'subject']),

      // 借助 mapGetters 生成计算属性，从 getters 中读取数据（对象写法）
      // ...mapGetters({bigSum:'bigSum'}),

      // 借助 mapGetters 生成计算属性，从 getters 中读取数据（数组写法）
      ...mapGetters(['bigSum']),
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
