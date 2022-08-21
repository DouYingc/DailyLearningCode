// 引入 Vue
import Vue from 'vue'
// 引入 App
import App from './App.vue'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false

// 创建 vm
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    // 绑定在Vue的实例对象上才可以让所有组件“看到”
    // $bus = this则是想为$bus绑定一个Vue实例对象，使得$bus可以使用$on，$off，$emit
    Vue.prototype.$bus = this // 全局事件总线
  },
})