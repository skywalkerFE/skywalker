import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import router from './config/router.config.js'
import 'material-icons/iconfont/material-icons.css'

Vue.use(VueResource)
Vue.use(Router)
new Vue({ router }).$mount('#app')