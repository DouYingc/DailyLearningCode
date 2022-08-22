// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'
// 引入插件
import vueResource from 'vue-resource'
// 引入 store
import store from './store/index'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  store, // 对象的简写形式
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
