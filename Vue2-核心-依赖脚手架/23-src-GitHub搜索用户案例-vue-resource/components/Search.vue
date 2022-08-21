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
        this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
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