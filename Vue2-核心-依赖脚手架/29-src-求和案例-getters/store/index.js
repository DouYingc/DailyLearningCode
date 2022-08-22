// 该文件用于创建 Vuex 中最为核心的 store

// 引入 Vue 核心库
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

// 准备actions————用于响应组建中的动作
const actions = {
  /* jia(context, value) {
    context.commit('JIA', value)
  },
  jian(context, value) {
    context.commit('JIAN', value)
  }, */
  jiaOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit('JIA', value)
    }
  },
  jiaWait(context, value) {
    setTimeout(() => {
      context.commit('JIA', value)
    }, 500)
  },
}
// 准备mutations————用于操作数据（state）
const mutations = {
  JIA(state, value) {
    state.sum += value
  },
  JIAN(state, value) {
    state.sum -= value
  }
}
// 准备state————用于存储数据
const state = {
  sum: 0, // 当前的和
}

// 准备getters————用于将 state 中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}

// 创建并暴露（导出） store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

