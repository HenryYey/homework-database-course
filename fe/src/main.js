import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
// import store from './store'
import router from './router'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})