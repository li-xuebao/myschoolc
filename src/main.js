import Vue from 'vue'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router"
import App from './App.vue'
Vue.use(ElementUI);


Vue.config.productionTip = false
//设置反向代理，前端请求默认发送到 http://localhost:9901/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:9901/api'
//axios.defaults.baseURL = 'http://123.7.63.41:9901/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios//定义全局上传变量
Vue.prototype.$uploadpath="http://localhost:9901/images/"
//Vue.prototype.$uploadpath="http://123.7.63.41:9901/images/"


new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')
