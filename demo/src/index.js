import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import router from './config/router.config.js'
import 'material-icons/iconfont/material-icons.css'

// import skywalker from '../../lib/skywalker.esm'

Vue.use(VueResource)
Vue.use(Router)

// Vue.use(skywalker)

new Vue({ router }).$mount('#app')