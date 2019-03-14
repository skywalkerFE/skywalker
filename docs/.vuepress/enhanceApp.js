/**
 * 扩展 VuePress 应用
 */
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/atom-one-dark.css'
import 'material-icons/iconfont/material-icons.css'
import '../../packages/css/index.styl'
import skywalker from '../../packages/index'

export default ({
  Vue
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(VueHighlightJS)
  Vue.use(skywalker)
}