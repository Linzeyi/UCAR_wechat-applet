import Vue from 'vue'
import App from './App'
import store from './store'
import 'mpvue-weui/src/style/weui.css'
import '../static/iconfont.css'

import fly from './api/http.js'
Vue.prototype.$http = fly
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
