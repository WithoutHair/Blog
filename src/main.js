// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import apiConfig from '../config/api.config.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'styles/reset.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.baseURL = apiConfig.baseURL
Vue.prototype.ip = 'http://129.204.186.24:8000'
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
          config.headers.token = token
    }
    return config
}, err => {
    return Promise.reject(err)
})
axios.interceptors.response.use(config => {
    return config
}, err => {
    if (err.response.status === 401) {
        router.replace({
            path: '/login'
        })
    }
    return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
