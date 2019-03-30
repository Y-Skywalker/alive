// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import VueLazyLoad from 'vue-lazyload'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : 'http://127.0.0.1:3001';
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  error:require("./assets/img/error.png"),
  loading:require("./assets/img/loading.png")
})

Vue.prototype.axios = axios
// Vue.prototype.api = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
