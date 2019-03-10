import Router from 'vue-router'
import layout from '../containers/layout/index.vue'
import icon from '../containers/icon/index.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: 'icon',
          name: 'icon',
          component: icon
        }
      ]
    }
  ]
})
